import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Avatar, Card, CardActions, CardContent, colors, Divider, Typography} from '@material-ui/core';
import {EntityContext} from "../../../../contexts/entity.context";
import {AddressLink} from "../../../../components/AddressLink";
import {handleImageUrl} from "../../../../helpers/file";

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const EntityCard = props => {
  const classes = useStyles();

  const {className, ...rest} = props;
  const [entity] = useContext(EntityContext);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    return () => URL.revokeObjectURL(avatarPreview)
  }, []);

  useEffect(() => {
    setAvatarPreview(entity.avatarUrl);
  }, [entity.avatarUrl]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Avatar
          src={avatarPreview}
          alt="Entidade"
          className={classes.imageContainer}
        />
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {entity.name}
        </Typography>
        <AddressLink address={entity.address}/>
        <Typography
          align="center"
          variant="body1"
        >
          {entity.description}
        </Typography>
      </CardContent>
      <Divider/>
      <CardActions>
        {props.actions}
      </CardActions>
    </Card>
  );
};

EntityCard.propTypes = {
  actions: PropTypes.any,
  className: PropTypes.string,
};

export default EntityCard;
