import React from "react";
import {TextField} from "@material-ui/core";
import {MaskedInput} from "./MaskedInput";

export function MaskedTextField(props) {
  const { mask, value, ...other } = props;
  return (
    <TextField
      {...other}
      InputLabelProps={{ shrink: Boolean(value) }}
      InputProps={{
        inputComponent: MaskedInput,
        inputProps: {
          mask
        },
        value
      }}
    />
  );
}
