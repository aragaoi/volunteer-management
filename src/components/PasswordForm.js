import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Card, CardContent, CardHeader, Divider, Grid, TextField} from '@material-ui/core';
import {useFormContext} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

const useStyles = makeStyles(() => ({
  root: {}
}));

const PasswordForm = props => {
  const {className, onChange, ...rest} = props;

  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const {register, errors, setError, clearErrors} = useFormContext();

  const handleChangePassword = event => {
    const value = event.target.value;
    setPassword(value);
    validate(value, confirm);

    onChange(value);
  };

  const handleChangeConfirm = event => {
    const value = event.target.value;
    setConfirm(value);
    validate(password, value);
  };

  const validate = (password, confirm) => {
    const fieldName = "confirm";
    if(password === confirm) {
      clearErrors(fieldName);
    } else {
      setError(fieldName, {
        type: "manual",
        message: "As senhas devem ser iguais"
      });
    }
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Senha"
      />
      <Divider/>
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Senha"
              name="password"
              inputRef={register}
              required
              margin="dense"
              onChange={handleChangePassword}
              type="password"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="password"/>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Confirme a senha"
              name="confirm"
              inputRef={register}
              required
              margin="dense"
              onChange={handleChangeConfirm}
              type="password"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="confirm"/>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

PasswordForm.propTypes = {
  className: PropTypes.string
};

export default PasswordForm;
