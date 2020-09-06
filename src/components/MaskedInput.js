import React from "react";
import {IMaskInput} from "react-imask";

export function MaskedInput(props) {
  const { inputRef, onChange, ...other } = props;
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
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
    />
  );
}
