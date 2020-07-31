import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  logo: {
    color: theme.palette.white
  }
}));

export function Brand() {
  const classes = useStyles();

  return <Typography
    variant="h3"
    className={classes.logo}
  >
    Plataforma de Voluntariado
  </Typography>
}

Brand.propTypes = {classes: PropTypes.any}
