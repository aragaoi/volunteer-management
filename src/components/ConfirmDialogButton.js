import {Button} from "@material-ui/core";
import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {ConfirmDialog} from "./ConfirmDialog";
import PropTypes from "prop-types";

export function ConfirmDialogButton(props) {
  const {actionText, actionIcon, onConfirm, ...rest} = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleResult = (confirm) => {
    confirm && onConfirm();
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
    <ConfirmDialog
      {...rest}
      onClose={handleResult}
    />
    }
  </>
}

ConfirmDialogButton.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  actionText: PropTypes.node,
  actionIcon: PropTypes.node,
  onConfirm: PropTypes.func.isRequired,
}
