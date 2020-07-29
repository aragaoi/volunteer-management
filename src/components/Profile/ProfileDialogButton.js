import React, {Fragment, useState} from "react";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";
import {EntityDialog} from "../../views/Entities/components/EntityCard/EntityDialog";
import PropTypes from "prop-types";
import {colors} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
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
}))

export function ProfileDialogButton(props) {
  const classes = useStyles();

  const {entity} = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <Fragment>
    <Tooltip title="Mais detalhes">
      <IconButton
        onClick={handleClickOpen}
      >
        <InfoIcon color={"action"}/>
      </IconButton>
    </Tooltip>
    <EntityDialog
      entity={entity}
      onClose={handleClose}
      open={open}
    />
  </Fragment>
}

ProfileDialogButton.propTypes = {
  entity: PropTypes.any,
}
