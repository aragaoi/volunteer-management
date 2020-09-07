import React, {useContext, useEffect, useState} from 'react';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Button, Grid, Link, TextField, Typography} from '@material-ui/core';
import {LoginContext} from "../../contexts/login.context";
import {ErrorMessage} from "@hookform/error-message";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {buildLoginSchema} from "../../common/validators";
import * as _ from "lodash";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4)
  },
  title: {
    marginTop: theme.spacing(3)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const {history} = props;

  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const [credentials, setCredentials] = useState({});
  const {login, signIn} = useContext(LoginContext);
  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(buildLoginSchema())
  });

  useEffect(() => {
    login && history.push("/")
  }, []);

  const handleSignIn = async event => {
    try {
      await signIn(credentials);
    } catch (e) {
      if (e?.response?.status === 401) {
        enqueueSnackbar("Usuário e/ou senha incorretos.", {variant: "error"});
      } else {
        enqueueSnackbar("Ocorreu um erro, não foi possível acessar.", {variant: "error"});
      }
      return;
    }
    history.push('/');
  };

  const handleChange = event => {
    const newState = {...credentials};
    _.set(newState, event.target.name, event.target.value);
    setCredentials(newState);
  };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
        justify={"center"}
        alignItems={"center"}
        alignContent={"center"}
      >
        <Grid
          className={classes.content}
          item
          lg={4}
          md={6}
          xs={12}
        >
          <Typography
            className={classes.title}
            variant="h2"
          >
            Entrar
          </Typography>
          <FormProvider {...methods}>
            <form
              id="signin-form"
              autoComplete="off"
              noValidate
              onSubmit={methods.handleSubmit(handleSignIn)}
            >
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                name="email"
                inputRef={methods.register}
                onChange={handleChange}
                required
                variant="outlined"
              />
              <ErrorMessage errors={methods.errors} name="email"/>
              <TextField
                fullWidth
                label="Senha"
                name="password"
                inputRef={methods.register}
                required
                margin="dense"
                onChange={handleChange}
                type="password"
                variant="outlined"
              />
              <ErrorMessage errors={methods.errors} name="password"/>
            </form>
          </FormProvider>
          <Button
            className={classes.signInButton}
            color="primary"
            fullWidth
            size="large"
            type="submit"
            form="signin-form"
            variant="contained"
          >
            Entrar
          </Button>
          <Typography
            color="textSecondary"
            variant="body1"
            align={"right"}
          >
            <Link
              component={RouterLink}
              to="/sign-up"
              variant="h6"
            >
              Criar um cadastro
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
