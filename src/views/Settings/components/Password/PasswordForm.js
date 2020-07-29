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
  const {className, ...rest} = props;

  const classes = useStyles();

  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();

  const {register, errors} = useFormContext();

  const handleChangePassword = event => {
    event.stopPropagation();

    const value = event.target.value;
    setPassword(value);
    props.onChange(value);
  };

  const handleChangeConfirm = event => {
    event.stopPropagation();

    const value = event.target.value;
    setConfirm(value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
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
                value={password}
                variant="outlined"
              />
              <ErrorMessage errors={errors} name="password" />
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
                // style={{ marginTop: '1rem' }}
                type="password"
                value={confirm}
                variant="outlined"
              />
              <ErrorMessage errors={errors} name="confirm" />
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

PasswordForm.propTypes = {
  className: PropTypes.string
};

export default PasswordForm;
