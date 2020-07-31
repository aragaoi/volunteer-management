import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import * as _ from "lodash";
import PasswordForm from "../../components/PasswordForm";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = (props) => {
  const classes = useStyles();

  const {profile, children, onChangePassword} = props;

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          {profile}
        </Grid>
        <Grid
          lg={8}
          md={6}
          xl={8}
          xs={12}
          item
          container
          spacing={4}
        >
          {(_.isArray(children) ? children : [children]).map((child, index) =>
            <Grid
              key={index}
              item
              xs={12}
            >
              {child}
            </Grid>)
          }
          <Grid
            item
            xs={12}
          >
            <PasswordForm onChange={onChangePassword}/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
