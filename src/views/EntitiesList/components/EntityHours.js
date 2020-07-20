import React, {Fragment, useContext} from 'react';
import clsx from 'clsx';
import * as _ from 'lodash';
import PropTypes, {number} from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Card, CardContent, CardHeader, Divider, Grid, TextField, Typography} from '@material-ui/core';
import {EntityContext} from "../../../contexts/entity-context";
import {TimePicker} from "@material-ui/pickers";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(() => ({
  root: {}
}));

const weekDays = [
  {label: 'Segunda-feira', key: 'monday'},
  {label: 'Terça-feira', key: 'tuesday'},
  {label: 'Quarta-feira', key: 'wednesday'},
  {label: 'Quinta-feira', key: 'thursday'},
  {label: 'Sexta-feira', key: 'friday'},
  {label: 'Sábado', key: 'saturday'},
  {label: 'Domingo', key: 'sunday'},
];

const EntityHours = props => {
  const classes = useStyles();

  const {className, ...rest} = props;
  const [entity, setEntity] = useContext(EntityContext);

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
        <CardHeader
          title="Horários"
          subheader="Horários disponíveis para receber voluntários"
        />
        <Divider/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid item md={3} xs={12}>
              <Typography variant="h6">Dia da semana</Typography>
            </Grid>
            <Grid item md={2} xs={3}>
              <Typography variant="h6">Manhã</Typography>
            </Grid>
            <Grid item md={2} xs={3}>
              <Typography variant="h6">Tarde</Typography>
            </Grid>
            <Grid item md={2} xs={3}>
              <Typography variant="h6">Noite</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography variant="h6">Máximo de voluntários</Typography>
            </Grid>
          </Grid>

          {weekDays.map(weekDay =>
            <Fragment>
              <Divider variant={"inset"}/>
              <Grid
                container
                spacing={3}
                alignItems={"center"}
              >
                <Grid
                  item
                  md={3}
                  xs={12}
                >
                  <Typography>{weekDay.label}</Typography>
                </Grid>
                <Grid
                  item
                  md={2}
                  xs={6}
                >
                  <Checkbox
                    value={entity.calendar[weekDay.key].morning.available}
                    name={`calendar.${weekDay.key}.morning.available`}
                    onChange={handleChange}
                    margin="dense"
                  />
                </Grid>
                <Grid
                  item
                  md={2}
                  xs={6}
                >
                  <Checkbox
                    value={entity.calendar[weekDay.key].afternoon.available}
                    name={`calendar.${weekDay.key}.afternoon.available`}
                    onChange={handleChange}
                    margin="dense"
                  />
                </Grid>
                <Grid
                  item
                  md={2}
                  xs={6}
                >
                  <Checkbox
                    value={entity.calendar[weekDay.key].night.available}
                    name={`calendar.${weekDay.key}.night.available`}
                    onChange={handleChange}
                    margin="dense"
                  />
                </Grid>
                <Grid
                  item
                  md={3}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    margin="dense"
                    value={entity.calendar[weekDay.key].maxVolunteers}
                    name={`calendar.${weekDay.key}.maxVolunteers`}
                    type="number"
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </Fragment>
          )}
        </CardContent>
      </form>
    </Card>
  );
};

EntityHours.propTypes = {
  className: PropTypes.string
};

export default EntityHours;
