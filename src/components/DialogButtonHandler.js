import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {Button} from "@material-ui/core";
import PropTypes from "prop-types";

export function DialogButtonHandler(props) {
  const {dialog, actionText, actionIcon, ...rest} = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (...params) => {
    dialog.props.onClose && dialog.props.onClose(...params);
    setOpen(false);
  };

  return <>
    {actionText ?
      <Button
        {...rest}
        onClick={handleClickOpen}
      >
        {actionIcon}
        {actionText}
      </Button>
      :
      <IconButton
        {...rest}
        onClick={handleClickOpen}
      >
        {actionIcon}
      </IconButton>
    }
    {open &&
      React.cloneElement(dialog, {onClose: handleClose, open: open})
    }
  </>;
}

DialogButtonHandler.propTypes = {
  dialog: PropTypes.node.isRequired,
  actionText: PropTypes.node,
  actionIcon: PropTypes.node,
}
