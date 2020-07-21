import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

import {SearchInput} from 'components';
import {EntityFormDialogButton} from "./EntityFormDialogButton";
import {EntityStore} from "../../../../contexts/entity.context";
import {emptyEntity} from "../../../../services/entity.service";

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
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
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
        <EntityStore entity={emptyEntity()}>
          <EntityFormDialogButton/>
        </EntityStore>
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
