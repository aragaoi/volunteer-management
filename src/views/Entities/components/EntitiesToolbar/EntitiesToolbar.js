import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

import {SearchInput} from 'components';
import {EntityFormDialogButton} from "./EntityFormDialogButton";

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const EntitiesToolbar = props => {
  const {className, ...rest} = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer}/>
        <EntityFormDialogButton/>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Buscar entidades"
        />
      </div>
    </div>
  );
};

EntitiesToolbar.propTypes = {
  className: PropTypes.string
};

export default EntitiesToolbar;
