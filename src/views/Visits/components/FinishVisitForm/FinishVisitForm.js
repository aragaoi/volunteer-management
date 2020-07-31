import React, {useContext, useEffect, useState} from "react";
import {VisitContext} from "../../../../contexts/visit.context";
import Grid from "@material-ui/core/Grid";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {buildVisitSchema} from "../../../../common/validators";
import {getPeriods, insert, list} from "../../../../services/visit.service";
import {useSnackbar} from "notistack";
import {VisitsContext} from "../../../../contexts/visits.context";
import {TextField} from "@material-ui/core";
import * as _ from "lodash";
import moment from "moment";
import {EntityContext} from "../../../../contexts/entity.context";
import Rating from "@material-ui/lab/Rating";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  rating: {
    textAlign: "center",
  },
}));

export function FinishVisitForm(props) {
  const classes = useStyles();
  const {onSubmit} = props;

  const {enqueueSnackbar} = useSnackbar();
  const [entity] = useContext(EntityContext);
  const [visit, setVisit] = useContext(VisitContext);
  const [periods, setPeriods] = useState([]);
  const [, setVisits] = useContext(VisitsContext);

  const {register, errors, handleSubmit} = useForm({
    resolver: yupResolver(buildVisitSchema())
  });

  useEffect(() => {
    setVisit({...visit, date: new Date()});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    resolvePeriods(visit.date);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visit.date])

  const handleChange = event => {
    const newState = {...visit};
    _.set(newState, event.target.name, event.target.value);
    setVisit(newState);
  };

  async function handleSave() {
    try {
      await insert(visit);
      enqueueSnackbar("Visita agendada com sucesso!", {variant: "success"});
    } catch (e) {
      enqueueSnackbar("Não foi possível agendar", {variant: "error"});
    }

    setVisits && setVisits(await list());
    onSubmit();
  }

  function resolvePeriods(date) {
    const weekDayNumber = moment(date).day();
    const weekDay = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ][weekDayNumber];

    const entityPeriods = Object.entries(_.get(entity, `calendar.${weekDay}`))
      .filter(([, info]) => info.available && (!info.maxVolunteers || Number(info.maxVolunteers) > 0))
      .map(([period]) => period);

    const availablePeriods = getPeriods()
      .filter(period => entityPeriods.includes(period.key));

    setPeriods(availablePeriods);
  }

  function handleRatingChange() {

  }

  return <form
    id="visit-form"
    autoComplete="off"
    noValidate
    onSubmit={handleSubmit(handleSave)}
  >
    <Grid
      container
      spacing={1}
      alignItems={"center"}
      justify={"center"}
    >
      <Grid
        item
        xs={12}
        className={classes.rating}
      >
        <Rating onChange={handleRatingChange} size={"large"}/>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          multiline
          rows={3}
          rowsMax={8}
          fullWidth
          label="Comentário"
          margin="dense"
          name="description"
          value={"Comentário"}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
    </Grid>
  </form>
}
