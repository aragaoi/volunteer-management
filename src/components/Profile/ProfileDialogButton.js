import React, {Fragment, useState} from "react";
import InfoIcon from "@material-ui/icons/Info";
import {EntityDialog} from "../../views/Entities/components/EntityCard/EntityDialog";
import PropTypes from "prop-types";
import {colors} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export function ProfileDialogButton(props) {

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
