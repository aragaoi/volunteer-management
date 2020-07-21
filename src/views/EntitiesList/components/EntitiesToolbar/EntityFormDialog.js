import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useContext} from "react";
import {makeStyles} from "@material-ui/styles";
import Account from "../../../Account";
import {EntityContext} from "../../../../contexts/entity.context";
import {AccountProfile} from "../../../Account/components";
import AccountDetails from "../../../Account/components/AccountDetails";
import EntityProfile from "../EntityProfile";
import EntityDetails from "../EntityDetails";
import {StatesContextProvider} from "../../../../contexts/states.context";
import {TypesContextProvider} from "../../../../contexts/types.context";
import {EntityCard} from "../index";
import {CardActions} from "@material-ui/core";
import EntityHours from "../EntityHours";

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  }
}));

export function EntityFormDialog(props) {
  const classes = useStyles();

  const {open, onClose} = props;

  return <Dialog
    onClose={onClose}
    open={open}
    maxWidth={"lg"}
    fullWidth={true}
  >
    <DialogTitle>
      Nova Entidade
    </DialogTitle>
    <DialogContent dividers>
      <Account
        profile={<EntityCard actions={
          <>
            <Button
              className={classes.uploadButton}
              color="primary"
              variant="text"
            >
              Upload picture
            </Button>
            <Button variant="text">
              Remove picture
            </Button>
          </>
        }/>}>
          <StatesContextProvider>
            <TypesContextProvider>
              <EntityDetails/>
            </TypesContextProvider>
          </StatesContextProvider>
          <EntityHours/>
      </Account>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">
        Cancelar
      </Button>
      <Button onClick={onClose} color="primary" variant={"contained"}>
        Salvar
      </Button>
    </DialogActions>
  </Dialog>
}

EntityFormDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
}
