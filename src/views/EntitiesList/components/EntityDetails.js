import React, {useContext, useState} from 'react';
import clsx from 'clsx';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import {EntityContext} from "../../../contexts/entity-context";
import {StatesContext} from "../../../contexts/states-context";
import {TypesContext} from "../../../contexts/types-context";

const useStyles = makeStyles(() => ({
  root: {}
}));

const EntityDetails = props => {
  const classes = useStyles();

  const {className, ...rest} = props;
  const [entity, setEntity] = useContext(EntityContext);
  const [states] = useContext(StatesContext);
  const [types] = useContext(TypesContext);

  const handleChange = event => {
    const newState = {...entity};
    _.set(newState, event.target.name, event.target.value)
    setEntity(newState);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader title="Informações"/>
        <Divider/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nome"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={entity.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Tipo"
                margin="dense"
                name="type"
                onChange={handleChange}
                required
                select
                SelectProps={{native: true}}
                value={entity.type}
                variant="outlined"
              >
                <option
                  key=""
                  value=""
                >
                </option>
                {types.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                multiline
                rows={2}
                fullWidth
                label="Descrição"
                margin="dense"
                name="description"
                onChange={handleChange}
                required
                value={entity.description}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="CNPJ"
                margin="dense"
                name="document"
                onChange={handleChange}
                required
                value={entity.document}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={entity.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Telefone"
                margin="dense"
                name="phone"
                onChange={handleChange}
                value={entity.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Endereço"
                margin="dense"
                name="address.street"
                onChange={handleChange}
                required
                value={entity.address.street}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Cidade"
                margin="dense"
                name="address.city"
                onChange={handleChange}
                required
                value={entity.address.city}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Estado"
                margin="dense"
                name="address.state"
                onChange={handleChange}
                required
                select
                SelectProps={{native: true}}
                value={entity.address.state}
                variant="outlined"
              >
                <option
                  key=""
                  value=""
                >
                </option>
                {states.map(option => (
                  <option
                    key={option.sigla}
                    value={option.sigla}
                  >
                    {option.nome}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

EntityDetails.propTypes = {
  className: PropTypes.string
};

export default EntityDetails;
