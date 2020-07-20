import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';
import {EntityContext} from "../../../contexts/entity-context";
import {AddressLink} from "../../../components/AddressLink";

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'inline-flex'
  },
  avatar: {
    marginRight: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const EntityProfile = props => {
  const classes = useStyles();

  const { className, ...rest } = props;
  const [entity, setEntity] = useContext(EntityContext);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <Avatar
            className={classes.avatar}
            src={entity.avatar}
          />
          <div>
            <Typography
              // gutterBottom
              variant="h4"
            >
              {entity.name}
            </Typography>
            <AddressLink address={entity.address}/>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {entity.description}
            </Typography>
          </div>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">
          Remove picture
        </Button>
      </CardActions>
    </Card>
  );
};

EntityProfile.propTypes = {
  className: PropTypes.string
};

export default EntityProfile;
