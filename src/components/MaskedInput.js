import React from "react";
import {IMaskInput} from "react-imask";

export function MaskedInput(props) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      unmask={true}
      onAccept={(unmaskedValue) => onChange({
        target: {
          name: props.name,
          value: unmaskedValue,
        },
      })}
    />
  );
}
