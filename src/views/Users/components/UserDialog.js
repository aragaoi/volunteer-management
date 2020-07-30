import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Divider} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useContext} from "react";
import {makeStyles} from "@material-ui/styles";
import {UserContext} from "../../../contexts/user.context";
import {BasicInfo} from "../../../components/BasicInfo";
import {Ratings} from "../../../components/Rating/Ratings";

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
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
}));

export function UserDialog(props) {
  const classes = useStyles();

  const {open, onClose} = props;
  const [user] = useContext(UserContext);

  return <Dialog
    onClose={onClose}
    open={open}
    maxWidth={"sm"}
    fullWidth={true}
  >
    <DialogTitle>
      {user.name}
    </DialogTitle>
    <DialogContent dividers>
      <BasicInfo {...user}/>
      <Divider variant={"middle"} className={classes.divider}/>
      <Ratings rating={user.rating} evaluations={user.evaluations}/>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">
        Fechar
      </Button>
      <Button onClick={onClose} color="primary" variant={"contained"}>
        Agendar visita
      </Button>
    </DialogActions>
  </Dialog>
}

UserDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
}
