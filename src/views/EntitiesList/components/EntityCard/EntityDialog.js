import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {colors, Divider, Typography} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {EntityContext} from "../../../../contexts/entity.context";
import {Ratings} from "../../../../components/Rating/Ratings";

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

export function EntityDialog(props) {
  const classes = useStyles();

  const {open, onClose} = props;
  const [entity] = useContext(EntityContext);

  return <Dialog
    onClose={onClose}
    open={open}
    maxWidth={"sm"}
    fullWidth={true}
  >
    <DialogTitle>
      {entity.name}
    </DialogTitle>
    <DialogContent dividers>
      <div className={classes.imageContainer}>
        <img
          alt="Entidade"
          className={classes.image}
          src={entity.avatarUrl}
        />
      </div>
      <Typography
        align="center"
        gutterBottom
        variant="h4"
      >
        {entity.name}
      </Typography>
      <Typography
        align="center"
        variant="body2"
      >
        <a target="_blank"
           href={`https://www.google.com/maps/search/?api=1&query=${entity.address.street},${entity.address.city},${entity.address.state}`}>
          {`${entity.address.street} - ${entity.address.city} / ${entity.address.state}`}
        </a>
      </Typography>
      <Typography
        align="center"
        variant="body1"
      >
        {entity.description}
      </Typography>
      <Divider variant={"middle"}/>
      <Ratings rating={entity.rating}/>
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
