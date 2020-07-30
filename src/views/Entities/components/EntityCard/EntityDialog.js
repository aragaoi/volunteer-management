import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Divider, useMediaQuery, useTheme} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useContext} from "react";
import {makeStyles} from "@material-ui/styles";
import {EntityContext} from "../../../../contexts/entity.context";
import {Ratings} from "../../../../components/Rating/Ratings";
import {BasicInfo} from "../../../../components/BasicInfo";
import ApartmentIcon from "@material-ui/icons/Apartment";

const useStyles = makeStyles(theme => ({
  root: {},
  divider: {
    margin: theme.spacing(2, 0)
  },
}));

export function EntityDialog(props) {
  const theme = useTheme();
  const classes = useStyles();

  const {open, onClose} = props;
  const [entity] = useContext(EntityContext);

  return <Dialog
    onClose={onClose}
    open={open}
    maxWidth={"sm"}
    fullWidth={true}
    fullScreen={useMediaQuery(theme.breakpoints.down('xs'))}
  >
    <DialogTitle>
      {entity.name}
    </DialogTitle>
    <DialogContent dividers>
      <BasicInfo
        {...entity}
        defaultAvatar={
          <ApartmentIcon fontSize={"large"}/>
        }
      />
      <Divider variant={"middle"} className={classes.divider}/>
      <Ratings rating={entity.rating} evaluations={entity.evaluations}/>
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

EntityDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
}
