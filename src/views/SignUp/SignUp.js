import React from 'react';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Button, Grid, Link, Typography} from '@material-ui/core';
import {SignUpForm} from "./SignUpForm";

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

const SignUp = props => {
  const {history} = props;

  const classes = useStyles();

  const handleSignUp = event => {
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
        justify={"center"}
        alignContent={"center"}
        alignItems={"center"}
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
            Cadastro
          </Typography>
          <SignUpForm onSubmit={handleSignUp}/>
          <Button
            className={classes.signUpButton}
            color="primary"
            fullWidth
            size="large"
            type="submit"
            form="signup-form"
            variant="contained"
          >
            Cadastrar
          </Button>
          <Typography
            color="textSecondary"
            variant="body1"
            align={"right"}
          >
            Já é cadastrado?{' '}
            <Link
              component={RouterLink}
              to="/sign-in"
              variant="h6"
            >
              Acesse
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
