import React from "react";
import MaskedInput from "react-input-mask";
import PropTypes from "prop-types";

export function TextMaskCustom(props) {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  mask: PropTypes.any.isRequired
};
