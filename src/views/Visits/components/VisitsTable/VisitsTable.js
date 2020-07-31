import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import {VisitsContext} from "../../../../contexts/visits.context";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ClearIcon from '@material-ui/icons/Clear';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Hidden from "@material-ui/core/Hidden";
import Tooltip from "@material-ui/core/Tooltip";
import {ConfirmDialogButton} from "../../../../components/ConfirmDialogButton";
import {cancel, confirm, list, VISIT_STATUS} from "../../../../services/visit.service";
import {useSnackbar} from "notistack";
import * as _ from "lodash";
import moment from "moment";
import {VisitStore} from "../../../../contexts/visit.context";
import {FinishVisitFormDialogButton} from "../FinishVisitForm/FinishVisitFormDialogButton";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  nameContainer: {
    display: 'block'
  },
  actions: {
    justifyContent: 'flex-end'
  },
}));

const VisitsTable = props => {
  const classes = useStyles();

  const {enqueueSnackbar} = useSnackbar();
  const [visits, setVisits] = useContext(VisitsContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);

  useEffect(() => updateOffset(page, rowsPerPage), [page, rowsPerPage]);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  function updateOffset(page, rowsPerPage) {
    const newOffset = page * rowsPerPage;
    setOffset(newOffset > 0 ? newOffset : 0);
  }

  async function handleCancel(visit) {
    await cancel(visit);
    setVisits(await list());
    enqueueSnackbar("Visita cancelada com sucesso!", {variant: "success"});
  }

  async function handleConfirm(visit) {
    await confirm(visit);
    setVisits(await list());
    enqueueSnackbar("Visita confirmada com sucesso!", {variant: "success"});
  }

  function resolveStatus(status) {
    switch (status) {
      case VISIT_STATUS.SCHEDULED:
        return "Agendada";
      case VISIT_STATUS.CANCELED:
        return "Cancelada";
      case VISIT_STATUS.CONFIRMED:
        return "Confirmada";
      case VISIT_STATUS.DONE:
        return "Realizada";
      default:
        return "";
    }
  }

  function formatDate(date) {
    return date ? moment(date).format("DD/MM/YY") : "";
  }

  return (
    <Card>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table style={{tableLayout: 'auto'}}>
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <Hidden xsDown>
                    <TableCell>Voluntário</TableCell>
                    <TableCell>Entidade</TableCell>
                  </Hidden>
                  <TableCell>Status</TableCell>
                  <TableCell align={"center"}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visits.slice(offset, (page + 1) * rowsPerPage).map(visit => (
                  <VisitStore visit={visit}>
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={visit.id}
                    >
                      <TableCell>
                        <div className={classes.avatarContainer}>
                          <div className={classes.nameContainer}>
                            <Typography variant="body1">{formatDate(visit.date)}</Typography>
                            <Hidden smUp>
                              {_.get(visit, 'user.name')}
                              {_.get(visit, 'entity.name')}
                            </Hidden>
                          </div>
                        </div>
                      </TableCell>
                      <Hidden xsDown>
                        <TableCell>{_.get(visit, 'user.name')}</TableCell>
                        <TableCell>{_.get(visit, 'entity.name')}</TableCell>
                      </Hidden>
                      <TableCell>{resolveStatus(visit.status)}</TableCell>
                      <TableCell align={"center"}>
                        <div className={classes.rowActions}>
                          {[VISIT_STATUS.SCHEDULED, VISIT_STATUS.CONFIRMED].includes(visit.status) &&
                          <ConfirmDialogButton
                            title={"Cancelar visita"}
                            message={`Essa ação não poderá ser desfeita. Deseja realmente cancelar a visita?`}
                            onConfirm={() => handleCancel(visit)}
                            actionIcon={
                              <Tooltip title="Cancelar">
                                <ClearIcon/>
                              </Tooltip>
                            }
                          />
                          }
                          {visit.status === VISIT_STATUS.SCHEDULED &&
                          <ConfirmDialogButton
                            color="primary"
                            title={"Aceitar visita"}
                            message={`Deseja realmente confirmar a visita agendada?`}
                            onConfirm={() => handleConfirm(visit)}
                            actionIcon={
                              <Tooltip title="Aceitar">
                                <DoneOutlineIcon/>
                              </Tooltip>
                            }
                          />
                          }
                          {visit.status === VISIT_STATUS.SCHEDULED &&
                          <FinishVisitFormDialogButton
                            color={"primary"}
                            actionIcon={
                              <Tooltip title="Finalizar visita">
                                <EventAvailableIcon/>
                              </Tooltip>
                            }
                          />
                          }
                        </div>
                      </TableCell>
                    </TableRow>
                  </VisitStore>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={visits.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

VisitsTable.propTypes = {
  className: PropTypes.string,
  visits: PropTypes.array
};

export default VisitsTable;
