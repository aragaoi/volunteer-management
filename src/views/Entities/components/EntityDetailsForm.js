import React, {useContext} from 'react';
import clsx from 'clsx';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Card, CardContent, CardHeader, Divider, Grid, TextField} from '@material-ui/core';
import {EntityContext} from "../../../contexts/entity.context";
import {StatesContext} from "../../../contexts/states.context";
import {EntityTypesContext} from "../../../contexts/entitytypes.context";
import {useFormContext} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(() => ({
  root: {},
}));

const EntityDetailsForm = props => {
  const classes = useStyles();

  const {className, ...rest} = props;
  const [entity, setEntity] = useContext(EntityContext);
  const [states] = useContext(StatesContext);
  const [types] = useContext(EntityTypesContext);

  const {register, errors} = useFormContext();

  const handleChange = event => {
    const newState = {...entity};

    let value;
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }

    _.set(newState, event.target.name, value);
    setEntity(newState);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Informações"/>
      <Divider/>
      <CardContent>
        <Grid
          container
          spacing={3}
          alignItems={"center"}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Tipo de entidade"
              margin="dense"
              name="institutionTypeId"
              inputRef={register}
              onChange={handleChange}
              required
              select
              SelectProps={{native: true}}
              value={entity.institutionTypeId}
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
            <ErrorMessage errors={errors} name="institutionTypeId"/>
          </Grid>
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
              inputRef={register}
              onChange={handleChange}
              required
              value={entity.name}
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="name"/>
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
              inputRef={register}
              onChange={handleChange}
              required
              value={entity.document}
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="document"/>
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
              inputRef={register}
              onChange={handleChange}
              required
              value={entity.email}
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="email"/>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <TextField
              multiline
              rows={2}
              rowsMax={8}
              fullWidth
              label="Descrição"
              margin="dense"
              name="description"
              onChange={handleChange}
              value={entity.description}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Telefone"
              margin="dense"
              name="phone"
              inputRef={register}
              onChange={handleChange}
              value={entity.phone}
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="phone"/>
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
          >
            <TextField
              fullWidth
              label="Endereço"
              margin="dense"
              name="address.street"
              onChange={handleChange}
              value={entity.address.street}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Cidade"
              margin="dense"
              name="address.city"
              onChange={handleChange}
              value={entity.address.city}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Estado"
              margin="dense"
              name="address.state"
              onChange={handleChange}
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
          <Grid
            item
            md={4}
            xs={6}
          >
            <FormControl fullWidth>
              <FormControlLabel
                style={{justifyContent: "center"}}
                control={
                  <Checkbox
                    checked={entity.acceptsDonations}
                    name={`acceptsDonations`}
                    onChange={handleChange}
                    margin="dense"
                  />
                }
                label="Aceita doações"
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

EntityDetailsForm.propTypes = {
  className: PropTypes.string
};

export default EntityDetailsForm;
