import {makeStyles} from "@material-ui/styles";
import {Avatar, Typography} from "@material-ui/core";
import {AddressLink} from "./AddressLink";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto 16px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export function BasicInfo(props) {
  const classes = useStyles();

  const {avatarUrl, name, address, description} = props;

  return <>
    <Avatar
      src={avatarUrl}
      className={classes.imageContainer}>
      {props.defaultAvatar}
    </Avatar>
    <Typography
      align="center"
      gutterBottom
      variant="h4"
    >
      {name}
    </Typography>
    <AddressLink address={address}/>
    <Typography
      align="center"
      variant="body1"
    >
      {description}
    </Typography>
  </>
}

BasicInfo.propTypes = {
  entity: PropTypes.any,
  defaultAvatar: PropTypes.node,
  classes: PropTypes.any
}
