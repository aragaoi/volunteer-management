import React from "react";
import Button from "@material-ui/core/Button";
import {PhotoCamera} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
}));

export function UploadButtons(props) {
  const classes = useStyles();

  const {onChange} = props;

  const handleSelect = e => {
    if (!e.target.files || e.target.files.length === 0) {
      handleRemove();
      return;
    }

    const file = e.target.files[0];
    onChange(file);
  }

  function handleRemove() {
    onChange(undefined);
  }

  return <>
    <input
      accept="image/*"
      className={classes.input}
      id="upload-button"
      name="avatar"
      type="file"
      onChange={handleSelect}
    />
    <label htmlFor="upload-button">
      <Button
        startIcon={<PhotoCamera/>}
        variant="text"
        color="primary"
        component="span"
      >
        Selecionar imagem
      </Button>
    </label>
    <Button variant="text" onClick={handleRemove}>
      Remover imagem
    </Button>
  </>
}

UploadButtons.propTypes = {
  onChange: PropTypes.func
}
