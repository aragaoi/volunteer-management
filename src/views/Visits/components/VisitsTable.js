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
import {cancel, confirm, list, reject, VISIT_STATUSES} from "../../../services/visit.service";
import {useSnackbar} from "notistack";
import * as _ from "lodash";
import {VisitStore} from "../../../contexts/visit.context";
import {formatDateAndPeriod} from "../../../helpers/date";
import {LoginContext} from "../../../contexts/login.context";
import Chip from "@material-ui/core/Chip";
import {DialogButtonHandler} from "../../../components/DialogButtonHandler";
import {ConfirmDialog} from "../../../components/ConfirmDialog";
import {FinishVisitFormDialog} from "./FinishVisitFormDialog";
import {EntityDialog} from "../../Entities/components/EntityDialog";
import {UserDialog} from "../../Users/components/UserDialog";
import {UserStore} from "../../../contexts/user.context";
import {EntityStore} from "../../../contexts/entity.context";
import {UsersContext} from "../../../contexts/users.context";
import {EntitiesContext} from "../../../contexts/entities.context";
import {FilterContext} from "../../../contexts/filter.context";
import {ROLES} from "../../../services/auth.service";
import {ShowByRole} from "../../../components/ShowByRole";

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
  avatarButtonLabel: {
    fontWeight: "400",
    lineHeight: "21px",
    textTransform: "none",
  },
  nameContainer: {
    display: 'block',
    textAlign: "center",
  },
  nameItems: {
    margin: "3px"
  },
  actions: {
    justifyContent: 'flex-end'
  },
}));

const VisitsTable = props => {
  const classes = useStyles();

  const {enqueueSnackbar} = useSnackbar();
  const {login} = useContext(LoginContext);
  const [visits, setVisits] = useContext(VisitsContext);
  const {users} = useContext(UsersContext);
  const [entities] = useContext(EntitiesContext);
  const {localFilter} = useContext(FilterContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchResults, setSearchResults] = useState(visits);

  useEffect(() => {
    const results = visits.filter(visit => {
      const term = localFilter?.searchTerm?.toLowerCase();
      return visit?.user?.name?.toLowerCase()?.includes(term) ||
        visit?.entity?.name?.toLowerCase()?.includes(term);
    });
    setSearchResults(results);
  }, [localFilter, visits]);

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
    if (login.role === ROLES.USER) {
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

  function resolveStatus(visit, size) {
    switch (visit.status) {
      case VISIT_STATUSES.SCHEDULED:
        return <Chip variant="outlined" label="Aguardando confirmação" size={size}/>;
      case VISIT_STATUSES.CANCELED:
        return <Chip color="secondary" label="Cancelada" size={size}/>;
      case VISIT_STATUSES.REJECTED:
        return <Chip color="secondary" label="Rejeitada" size={size}/>;
      case VISIT_STATUSES.CONFIRMED:
        return <Chip color="primary" label="Agendada" size={size}/>;
      case VISIT_STATUSES.EVALUATION:
        if (visit.evaluatedByUser && visit.evaluatedByEntity) {
          return <Chip label="Realizada" size={size}/>;
        } else {
          return <Chip variant="outlined" color="secondary" label="Aguardando avaliações" size={size}/>;
        }
      case VISIT_STATUSES.DONE:
        return <Chip label="Realizada" size={size}/>;
      default:
        return "";
    }
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
                    <ShowByRole roles={[ROLES.ADMIN, ROLES.ENTITY]}>
                      <TableCell>Voluntário</TableCell>
                    </ShowByRole>
                    <ShowByRole roles={[ROLES.ADMIN, ROLES.USER]}>
                      <TableCell>Entidade</TableCell>
                    </ShowByRole>
                  </Hidden>
                  <TableCell>Status</TableCell>
                  <TableCell align={"center"}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.slice(offset, (page + 1) * rowsPerPage).map(visit => (
                  <Fragment key={visit.id}>
                    <VisitStore visit={visit}>
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={visit.id}
                      >
                        <EntityStore entity={visit.entity}>
                          <UserStore user={visit.user}>
                            <TableCell>
                              <div className={classes.nameContainer}>
                                <Typography variant="body1" className={classes.nameItems}>
                                  {formatDateAndPeriod(visit.date, visit.period)}
                                </Typography>
                                <Hidden smUp>
                                  <ShowByRole roles={[ROLES.ADMIN, ROLES.ENTITY]}>
                                    <DialogButtonHandler
                                      variant="outlined"
                                      size="small"
                                      classes={{
                                        root: classes.nameItems,
                                        label: classes.avatarButtonLabel
                                      }}
                                      actionText={
                                        _.get(visit, 'user.name')
                                      }
                                      dialog={<UserDialog/>}
                                    />
                                  </ShowByRole>
                                  <ShowByRole roles={[ROLES.ADMIN, ROLES.USER]}>
                                    <DialogButtonHandler
                                      variant="outlined"
                                      size="small"
                                      classes={{
                                        root: classes.nameItems,
                                        label: classes.avatarButtonLabel
                                      }}
                                      actionText={
                                        _.get(visit, 'entity.name')
                                      }
                                      dialog={<EntityDialog/>}
                                    />
                                  </ShowByRole>
                                </Hidden>
                              </div>
                            </TableCell>
                            <Hidden xsDown>
                              <ShowByRole roles={[ROLES.ADMIN, ROLES.ENTITY]}>
                                <TableCell>
                                  <div className={classes.avatarContainer}>
                                    <DialogButtonHandler
                                      variant="outlined"
                                      classes={{
                                        label: classes.avatarButtonLabel
                                      }}
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
                                  </div>
                                </TableCell>
                              </ShowByRole>
                              <ShowByRole roles={[ROLES.ADMIN, ROLES.USER]}>
                                <TableCell>
                                  <div className={classes.avatarContainer}>
                                    <DialogButtonHandler
                                      variant="outlined"
                                      classes={{
                                        label: classes.avatarButtonLabel
                                      }}
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
                                  </div>
                                </TableCell>
                              </ShowByRole>
                            </Hidden>
                          </UserStore>
                        </EntityStore>
                        <TableCell>
                          <Hidden mdUp>
                            {resolveStatus(visit, "small")}
                          </Hidden>
                          <Hidden xsDown>
                            {resolveStatus(visit)}
                          </Hidden>
                        </TableCell>
                        <TableCell align={"center"}>
                          <div className={classes.rowActions}>
                            {[VISIT_STATUSES.SCHEDULED, VISIT_STATUSES.CONFIRMED].includes(visit.status) &&
                            <DialogButtonHandler
                              actionIcon={
                                <Tooltip title={login.role === ROLES.ENTITY ? "Rejeitar" : "Cancelar"}>
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
                            <ShowByRole roles={[ROLES.ENTITY]}>
                              {visit.status === VISIT_STATUSES.SCHEDULED &&
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
                            </ShowByRole>
                            {[VISIT_STATUSES.CONFIRMED, VISIT_STATUSES.EVALUATION].includes(visit.status) &&
                            <ShowByRole roles={[visit.evaluatedByUser ? ROLES.ENTITY : ROLES.USER]}>
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
                            </ShowByRole>
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
          count={searchResults.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Itens por página"
          labelDisplayedRows={({count, page }) => `Pág. ${page+1} de ${Number(count) === 0 ? 1 : Math.ceil(count/rowsPerPage)}`}
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
