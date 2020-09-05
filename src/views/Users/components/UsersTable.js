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
import {UsersContext} from "../../../contexts/users.context";
import {AddressLink} from "../../../components/AddressLink";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Hidden from "@material-ui/core/Hidden";
import Tooltip from "@material-ui/core/Tooltip";
import {list, remove} from "../../../services/user.service";
import {useSnackbar} from "notistack";
import {ConfirmDialog} from "../../../components/ConfirmDialog";
import {DialogButtonHandler} from "../../../components/DialogButtonHandler";
import {UserFormDialog} from "./UserFormDialog";
import {UserStore} from "../../../contexts/user.context";
import {FilterContext} from "../../../contexts/filter.context";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  nameContainer: {
    display: 'block'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  rowActions: {
    display: 'flex'
  }
}));

const UsersTable = props => {
  const classes = useStyles();

  const {enqueueSnackbar} = useSnackbar();
  const {users, setUsers} = useContext(UsersContext);
  const {localFilter} = useContext(FilterContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchResults, setSearchResults] = useState(users);

  useEffect(() => {
    const results = users.filter(user => user.name.toLowerCase().includes(localFilter.searchTerm.toLowerCase()));
    setSearchResults(results);
  }, [localFilter, users]);

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

  async function handleDelete(user) {
    await remove(user);
    setUsers(await list());
    enqueueSnackbar("Usuário removido com sucesso!", {variant: "success"});
  }

  return (
    <Card>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table style={{tableLayout: 'auto'}}>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <Hidden xsDown>
                    <TableCell>Email</TableCell>
                  </Hidden>
                  <Hidden smDown>
                    <TableCell>Endereço</TableCell>
                    <TableCell>Telefone</TableCell>
                    <TableCell align={"center"}>Aceita contato</TableCell>
                  </Hidden>
                  <TableCell align={"center"}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.slice(offset, (page + 1) * rowsPerPage).map(user => (
                  <Fragment key={user.id}>
                    <UserStore user={user}>
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={user.id}
                      >
                        <TableCell>
                          <div className={classes.avatarContainer}>
                            <Hidden xsDown>
                              <Avatar
                                className={classes.avatar}
                                src={user.avatarUrl}
                              />
                            </Hidden>
                            <div className={classes.nameContainer}>
                              <Typography variant="body1">{user.name}</Typography>
                              <Hidden smUp>
                                {user.email}
                              </Hidden>
                            </div>
                          </div>
                        </TableCell>
                        <Hidden xsDown>
                          <TableCell>{user.email}</TableCell>
                        </Hidden>
                        <Hidden smDown>
                          <TableCell>
                            <AddressLink address={user.address} align="left"/>
                          </TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell align={"center"}>
                            {user.acceptsContact ? <CheckIcon/> : <ClearIcon/>}
                          </TableCell>
                        </Hidden>
                        <TableCell align={"center"}>
                          <div className={classes.rowActions}>
                            <DialogButtonHandler
                              actionIcon={
                                <Tooltip title="Editar">
                                  <EditIcon/>
                                </Tooltip>
                              }
                              dialog={
                                <UserFormDialog
                                  isEdit={true}
                                />
                              }
                            />
                            <DialogButtonHandler
                              actionIcon={
                                <Tooltip title="Excluir">
                                  <DeleteIcon/>
                                </Tooltip>
                              }
                              dialog={
                                <ConfirmDialog
                                  title={"Excluir usuário"}
                                  message={`Essa ação não poderá ser desfeita. Deseja realmente excluir o usuário ${user.name}?`}
                                  onClose={(confirmed) => confirmed && handleDelete(user)}
                                />
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    </UserStore>
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
          labelDisplayedRows={({count, page }) => `Pág. ${page+1} de ${Math.ceil(count/rowsPerPage)+1}`}
        />
      </CardActions>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array
};

export default UsersTable;
