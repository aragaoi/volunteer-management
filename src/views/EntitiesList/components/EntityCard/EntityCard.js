import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Card, CardActions, CardContent, colors, Divider, Grid, Typography} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from "@material-ui/core/Button";
import {EntityDialog} from "./EntityDialog";

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

  const { className, entity, ...rest } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt="Entidade"
            className={classes.image}
            src={entity.avatarUrl}
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {entity.name}
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          <a target="_blank"
             href={`https://www.google.com/maps/search/?api=1&query=${entity.address.street},${entity.address.city},${entity.address.state}`}>
            {`${entity.address.street} - ${entity.address.city} / ${entity.address.state}`}
          </a>
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {entity.description}
        </Typography>
      </CardContent>
      <Divider/>
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              display="inline"
              variant="body2"
            >
              {entity.rating && entity.rating.average > 0 &&
              <>
                {entity.rating.average > 0 ? <StarIcon/> : <StarBorderIcon/>}
                {entity.rating.average > 1 ? <StarIcon/> : <StarBorderIcon/>}
                {entity.rating.average > 2 ? <StarIcon/> : <StarBorderIcon/>}
                {entity.rating.average > 3 ? <StarIcon/> : <StarBorderIcon/>}
                {entity.rating.average > 4 ? <StarIcon/> : <StarBorderIcon/>}
              </>
              }
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Button
              className={classes.button}
              onClick={handleClickOpen}
            >
              <div className={classes.icon}><InfoIcon/></div>
              Mais detalhes
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      <EntityDialog
        entity={entity}
        onClose={handleClose}
        open={open}
      />
    </Card>
  );
};

EntityCard.propTypes = {
  className: PropTypes.string,
  entity: PropTypes.object.isRequired
};

export default EntityCard;
