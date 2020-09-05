import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {Divider, useMediaQuery, useTheme} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useContext} from "react";
import {makeStyles} from "@material-ui/styles";
import {UserContext} from "../../../contexts/user.context";
import {BasicInfo} from "../../../components/BasicInfo";
import {Ratings} from "../../../components/Ratings";

const useStyles = makeStyles(theme => ({
  root: {},
  divider: {
    margin: theme.spacing(2, 0)
  },
}));

export function UserDialog(props) {
  const theme = useTheme();
  const classes = useStyles();

  const {open, onClose} = props;
  const [user] = useContext(UserContext);

  return <Dialog
    onClose={onClose}
    open={open}
    maxWidth={"sm"}
    fullWidth={true}
    fullScreen={useMediaQuery(theme.breakpoints.down('xs'))}
  >
    <DialogContent dividers>
      <BasicInfo {...user}/>
      <Divider variant={"middle"} className={classes.divider}/>
      <Ratings rating={user.rating} evaluations={user.evaluations}/>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">
        Fechar
      </Button>
    </DialogActions>
  </Dialog>
}

UserDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
}
