import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

import {TextSearchInput} from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  spacer: {
    flexGrow: 1
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const VisitsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.actions}>
        <span className={classes.spacer} />
      </div>
      <div className={classes.row}>
        <TextSearchInput
          className={classes.searchInput}
          placeholder="Buscar visitas"
        />
      </div>
    </div>
  );
};

VisitsToolbar.propTypes = {
  className: PropTypes.string
};

export default VisitsToolbar;
