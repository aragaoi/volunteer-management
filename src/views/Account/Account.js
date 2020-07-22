import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import {Password} from "../Settings/components";
import {EntityContext} from "../../contexts/entity.context";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = (props) => {
  const classes = useStyles();

  const [entity, setEntity] = useContext(EntityContext);

  function handlePasswordChange(password) {
    setEntity({...entity, password});
  }

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
          {props.profile}
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
          {props.children && props.children.map((child, index) =>
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
            <Password onChange={handlePasswordChange}/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
