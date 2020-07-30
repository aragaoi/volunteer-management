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
import {ErrorMessage} from "@hookform/error-message";
import * as _ from "lodash";
import {KeyboardDatePicker} from "@material-ui/pickers";
import moment from "moment";
import {EntityContext} from "../../../../contexts/entity.context";

export function VisitForm(props) {
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

  const handleDateChange = newDate => {
    setVisit({...visit, date: newDate && newDate.isValid() ? newDate.toDate() : undefined});
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

  return <form
    id="visit-form"
    autoComplete="off"
    noValidate
    onSubmit={handleSubmit(handleSave)}
  >
    <Grid
      container
      spacing={3}
      alignItems={"center"}
      justify={"center"}
    >
      <Grid
        item
        xs={8}
      >
        <KeyboardDatePicker
          autoOk
          fullWidth
          disableToolbar
          disablePast={true}
          inputVariant="outlined"
          format="DD/MM/yyyy"
          margin="dense"
          name="date"
          label="Data da visita"
          value={visit.date}
          inputRef={register}
          onChange={handleDateChange}
          required
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <ErrorMessage errors={errors} name="date"/>
      </Grid>
      <Grid
        item
        xs={8}
      >
        <TextField
          fullWidth
          label={_.isEmpty(periods) ? "Não há horário disponível nessa data" : "Período"}
          margin="dense"
          name="period"
          inputRef={register}
          onChange={handleChange}
          required
          select
          SelectProps={{native: true}}
          value={visit.period}
          variant="outlined"
          disabled={_.isEmpty(periods)}
        >
          <option
            key=""
            value=""
          >
          </option>
          {periods.map(option => (
            <option
              key={option.key}
              value={option.key}
            >
              {option.label}
            </option>
          ))}
        </TextField>
        <ErrorMessage errors={errors} name="period"/>
      </Grid>
    </Grid>
  </form>
}
