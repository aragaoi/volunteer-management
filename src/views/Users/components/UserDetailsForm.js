import React, {useContext} from 'react';
import clsx from 'clsx';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Card, CardContent, CardHeader, Divider, Grid, TextField} from '@material-ui/core';
import {UserContext} from "../../../contexts/user.context";
import {StatesContext} from "../../../contexts/states.context";
import {useFormContext} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import {MaskedTextField} from "../../../components/MaskedTextField";

const useStyles = makeStyles(() => ({
  root: {},
}));

const UserDetailsForm = props => {
  const classes = useStyles();

  const {className, ...rest} = props;
  const [user, setUser] = useContext(UserContext);
  const [states] = useContext(StatesContext);

  const {register, errors} = useFormContext();

  const handleChange = event => {
    const newState = {...user};

    let value;
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }

    _.set(newState, event.target.name, value);
    setUser(newState);
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
              label="Nome"
              margin="dense"
              name="name"
              inputRef={register}
              onChange={handleChange}
              required
              value={user?.name ?? ""}
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
              label="Email"
              margin="dense"
              name="email"
              inputRef={register}
              onChange={handleChange}
              required
              value={user?.email ?? ""}
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
              value={user?.description ?? ""}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <MaskedTextField
              mask={[{mask: "(00) 0000-0000"}, {mask: "(00) 0 0000-0000"}]}
              fullWidth
              label="Telefone"
              margin="dense"
              name="phone"
              onChange={handleChange}
              variant="outlined"
              value={user?.phone ?? ""}
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
              value={user?.address?.street ?? ""}
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
              value={user?.address?.city ?? ""}
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
              value={user?.address?.state ?? ""}
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
              <Tooltip title={"Aceito que as entidades entrem em contato comigo"}>
                <FormControlLabel
                  style={{justifyContent: "center"}}
                  control={
                    <Checkbox
                      checked={user?.acceptsContact}
                      name={`acceptsContact`}
                      onChange={handleChange}
                      margin="dense"
                    />
                  }
                  label="Aceito contato"
                />
              </Tooltip>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

UserDetailsForm.propTypes = {
  className: PropTypes.string
};

export default UserDetailsForm;
