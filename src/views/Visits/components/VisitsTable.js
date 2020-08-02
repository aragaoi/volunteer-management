import React, {Fragment, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  Avatar,
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
import {VisitsContext} from "../../../contexts/visits.context";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ClearIcon from '@material-ui/icons/Clear';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Hidden from "@material-ui/core/Hidden";
import Tooltip from "@material-ui/core/Tooltip";
import {cancel, confirm, list, reject, VISIT_STATUS} from "../../../services/visit.service";
import {useSnackbar} from "notistack";
import * as _ from "lodash";
import {VisitStore} from "../../../contexts/visit.context";
import {formatDateAndPeriod} from "../../../helpers/date";
import {LoginContext} from "../../../contexts/login.context";
import Chip from "@material-ui/core/Chip";
import {DialogButtonHandler} from "../../../components/DialogButtonHandler";
import {ConfirmDialog} from "../../../components/ConfirmDialog";
import {FinishVisitFormDialog} from "./FinishVisitFormDialog";
import InfoIcon from "@material-ui/icons/Info";
import {EntityDialog} from "../../Entities/components/EntityDialog";
import {UserDialog} from "../../Users/components/UserDialog";
import {UserStore} from "../../../contexts/user.context";
import {EntityStore} from "../../../contexts/entity.context";
import {UsersContext} from "../../../contexts/users.context";
import {EntitiesContext, EntitiesStore} from "../../../contexts/entities.context";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(3),
    height: theme.spacing(3),
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
  const [login] = useContext(LoginContext);
  const [visits, setVisits] = useContext(VisitsContext);
  const [users] = useContext(UsersContext);
  const [entities] = useContext(EntitiesContext);
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
    let message = "Visita cancelada com sucesso!";
    if (login.userId) {
      await cancel(visit);
    } else {
      await reject(visit);
      message = "Visita rejeitada com sucesso!";
    }
    setVisits(await list());
    enqueueSnackbar(message, {variant: "success"});
  }

  async function handleConfirm(visit) {
    await confirm(visit);
    setVisits(await list());
    enqueueSnackbar("Visita confirmada com sucesso!", {variant: "success"});
  }

  function resolveStatus(visit) {
    switch (visit.status) {
      case VISIT_STATUS.SCHEDULED:
        return <Chip variant="outlined" label="Aguardando confirmação"/>;
      case VISIT_STATUS.CANCELED:
        return <Chip color="secondary" label="Cancelada"/>;
      case VISIT_STATUS.REJECTED:
        return <Chip color="secondary" label="Rejeitada"/>;
      case VISIT_STATUS.CONFIRMED:
        return <Chip color="primary" label="Agendada"/>;
      case VISIT_STATUS.EVALUATION:
        if (visit.evaluatedByUser && visit.evaluatedByEntity) {
          return <Chip label="Realizada"/>;
        } else {
          return <Chip variant="outlined" color="secondary" label="Aguardando avaliações"/>;
        }
      case VISIT_STATUS.DONE:
        return <Chip label="Realizada"/>;
      default:
        return "";
    }
  }

  function getFullEntity(entity) {
    return entity ? _.find(entities, {id: entity.id}) : null;
  }

  function getFullUser(user) {
    return user ? _.find(users, {id: user.id}) : null;
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
                  <Fragment key={visit.id}>
                    <VisitStore visit={visit}>
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={visit.id}
                      >
                        <TableCell>
                          <div className={classes.nameContainer}>
                            <Typography variant="body1">{formatDateAndPeriod(visit.date, visit.period)}</Typography>
                            <Hidden smUp>
                              {_.get(visit, 'user.name')}
                              {_.get(visit, 'entity.name')}
                            </Hidden>
                          </div>
                        </TableCell>
                        <Hidden xsDown>
                          <TableCell>
                            <div className={classes.avatarContainer}>
                              <UserStore user={getFullUser(visit.user)}>
                                <DialogButtonHandler
                                  variant="outlined"
                                  actionText={
                                    <Fragment>
                                      <Hidden xsDown>
                                        <Avatar
                                          className={classes.avatar}
                                          src={_.get(visit, 'user.avatarUrl')}
                                        />
                                      </Hidden>
                                      {_.get(visit, 'user.name')}
                                    </Fragment>
                                  }
                                  dialog={<UserDialog/>}
                                />
                              </UserStore>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={classes.avatarContainer}>
                              <EntityStore entity={getFullEntity(visit.entity)}>
                                <DialogButtonHandler
                                  variant="outlined"
                                  actionText={
                                    <Fragment>
                                      <Hidden xsDown>
                                        <Avatar
                                          className={classes.avatar}
                                          src={_.get(visit, 'entity.avatarUrl')}
                                        />
                                      </Hidden>
                                      {_.get(visit, 'entity.name')}
                                    </Fragment>
                                  }
                                  dialog={<EntityDialog/>}
                                />
                              </EntityStore>
                            </div>
                          </TableCell>
                        </Hidden>
                        <TableCell>{resolveStatus(visit)}</TableCell>
                        <TableCell align={"center"}>
                          <div className={classes.rowActions}>
                            {[VISIT_STATUS.SCHEDULED, VISIT_STATUS.CONFIRMED].includes(visit.status) &&
                            <DialogButtonHandler
                              actionIcon={
                                <Tooltip title={login.userId ? "Cancelar" : "Rejeitar"}>
                                  <ClearIcon/>
                                </Tooltip>
                              }
                              dialog={
                                <ConfirmDialog
                                  title={"Cancelar visita"}
                                  message={`Essa ação não poderá ser desfeita. Deseja realmente cancelar a visita?`}
                                  onClose={(confirmed) => confirmed && handleCancel(visit)}
                                />
                              }
                            />
                            }
                            {visit.status === VISIT_STATUS.SCHEDULED &&
                            <DialogButtonHandler
                              actionIcon={
                                <Tooltip title="Aceitar">
                                  <DoneOutlineIcon/>
                                </Tooltip>
                              }
                              dialog={
                                <ConfirmDialog
                                  color="primary"
                                  title={"Aceitar visita"}
                                  message={`Deseja realmente confirmar a visita agendada?`}
                                  onClose={(confirmed) => confirmed && handleConfirm(visit)}
                                />
                              }
                            />
                            }
                            {[VISIT_STATUS.CONFIRMED, VISIT_STATUS.EVALUATION].includes(visit.status) &&
                            <DialogButtonHandler
                              color={"primary"}
                              actionIcon={
                                <Tooltip title="Finalizar visita">
                                  <EventAvailableIcon/>
                                </Tooltip>
                              }
                              dialog={
                                <FinishVisitFormDialog/>
                              }
                            />
                            }
                          </div>
                        </TableCell>
                      </TableRow>
                    </VisitStore>
                  </Fragment>
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
