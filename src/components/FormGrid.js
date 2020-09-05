import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import * as _ from "lodash";
import PasswordForm from "./PasswordForm";

const FormGrid = (props) => {

  const {profile, children, onChangePassword} = props;

  return (
    <div>
      <Grid
        container
        spacing={2}
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
        >
          <Grid
            container
            spacing={2}
            alignItems={"center"}
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
      </Grid>
    </div>
  );
};

export default FormGrid;
