import React, {useContext, useEffect, useState} from 'react';
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
import {UsersContext} from "../../../../contexts/users.context";
import {AddressLink} from "../../../../components/AddressLink";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Hidden from "@material-ui/core/Hidden";
import Tooltip from "@material-ui/core/Tooltip";
import {UserFormDialogButton} from "../VisitsToolbar/UserFormDialogButton";
import {ConfirmDialogButton} from "../../../../components/ConfirmDialogButton";
import {list, remove} from "../../../../services/user.service";
import {useSnackbar} from "notistack";

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

const VisitsTable = props => {
  const classes = useStyles();

  const {enqueueSnackbar} = useSnackbar();
  const [users, setUsers] = useContext(UsersContext);
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
                {users.slice(offset, (page + 1) * rowsPerPage).map(user => (
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
                        <UserFormDialogButton
                          user={user}
                          actionIcon={
                            <Tooltip title="Editar">
                              <EditIcon/>
                            </Tooltip>
                          }
                        />
                        <ConfirmDialogButton
                          title={"Excluir usuário"}
                          message={`Essa ação não poderá ser desfeita. Deseja realmente excluir o usuário ${user.name}?`}
                          onConfirm={() => handleDelete(user)}
                          actionIcon={
                            <Tooltip title="Excluir">
                              <DeleteIcon/>
                            </Tooltip>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
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
  users: PropTypes.array
};

export default VisitsTable;
