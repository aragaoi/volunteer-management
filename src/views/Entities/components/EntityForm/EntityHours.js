import React, {Fragment, useContext} from 'react';
import clsx from 'clsx';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Card, CardContent, CardHeader, Divider, Grid, Hidden, TextField, Typography} from '@material-ui/core';
import {EntityContext} from "../../../../contexts/entity.context";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import {getPeriods, getWeekDays} from "../../../../services/visit.service";

const useStyles = makeStyles(() => ({
  root: {}
}));

const weekDays = getWeekDays();
const periods = getPeriods();

const EntityHours = props => {
  const classes = useStyles();

  const {className, ...rest} = props;
  const [entity, setEntity] = useContext(EntityContext);

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
      <CardHeader
        title="Horários"
        subheader="Horários disponíveis para receber voluntários"
      />
      <Divider/>
      <CardContent>
        <Hidden xsDown>
          <Grid
            container
            spacing={1}
          >
            <Grid item xs={3}>
              <Typography variant="h6">Dia da semana</Typography>
            </Grid>
            {periods.map(period =>
              <Grid item xs={3} key={period.key}>
                <Typography variant="h6">{period.label}</Typography>
              </Grid>
            )}
          </Grid>
        </Hidden>

        {weekDays.map((weekDay, index) =>
          <Fragment key={index}>
            <Divider variant={"inset"}/>
            <Grid
              container
              spacing={1}
              alignItems={"center"}
            >
              <Grid
                item
                sm={3}
                xs={12}
              >
                <Hidden xsDown>
                  <Typography>{weekDay.label}</Typography>
                </Hidden>
                <Hidden smUp>
                  <Typography variant="h6">{weekDay.label}</Typography>
                </Hidden>
              </Grid>
              {periods.map(period =>
                <Grid
                  key={period.key}
                  item
                  container
                  sm={3}
                  xs={12}
                  alignItems={"center"}
                >
                  <Grid
                    item
                    sm={3}
                    xs={6}
                  >
                    <FormControl fullWidth>
                      <FormControlLabel
                        style={{justifyContent: "center"}}
                        control={
                          <Checkbox
                            checked={entity.calendar[weekDay.key][period.key].available}
                            name={`calendar.${weekDay.key}.${period.key}.available`}
                            onChange={handleChange}
                            margin="dense"
                          />
                        }
                        label={
                          <Hidden smUp>
                            <Typography>{period.label}</Typography>
                          </Hidden>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    sm={9}
                    xs={6}
                  >
                    <Tooltip title="Máximo de voluntários no período" enterDelay={1500}>
                      <TextField
                        disabled={!entity.calendar[weekDay.key][period.key].available}
                        size={"small"}
                        label="Máximo"
                        margin="dense"
                        value={entity.calendar[weekDay.key][period.key].maxVolunteers}
                        name={`calendar.${weekDay.key}.${period.key}.maxVolunteers`}
                        type="number"
                        onChange={handleChange}
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Fragment>
        )}
      </CardContent>
    </Card>
  )
    ;
};

EntityHours.propTypes = {
  className: PropTypes.string
};

export default EntityHours;
