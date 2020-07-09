import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {CardContent, colors, Typography} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React from "react";
import {makeStyles} from "@material-ui/styles";

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
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
}));

export function EntityDialog(props) {
  const classes = useStyles();

  const {entity, open, onClose} = props;

  return <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
    <DialogTitle id="customized-dialog-title">
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
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={onClose} color="secondary">
        Fechar
      </Button>
      <Button onClick={onClose} color="primary" variant={"contained"}>
        Agendar visita
      </Button>
    </DialogActions>
  </Dialog>
}

EntityDialog.propTypes = {
  entity: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool
}
