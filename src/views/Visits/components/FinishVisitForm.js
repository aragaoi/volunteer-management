import React, {useContext} from "react";
import {EvaluationContext} from "../../../contexts/evaluation.context";
import Grid from "@material-ui/core/Grid";
import {insertEntityEvaluation, insertUserEvaluation} from "../../../services/evaluation.service";
import {useSnackbar} from "notistack";
import {TextField} from "@material-ui/core";
import * as _ from "lodash";
import Rating from "@material-ui/lab/Rating";
import {makeStyles} from "@material-ui/styles";
import {VisitContext} from "../../../contexts/visit.context";
import {VisitsContext} from "../../../contexts/visits.context";
import {finishByEntity, finishByUser, list} from "../../../services/visit.service";
import {LoginContext} from "../../../contexts/login.context";

const useStyles = makeStyles(theme => ({
  rating: {
    textAlign: "center",
  },
}));

export function FinishVisitForm(props) {
  const classes = useStyles();
  const {onSubmit} = props;

  const {enqueueSnackbar} = useSnackbar();
  const {login}  = useContext(LoginContext);
  const [visit] = useContext(VisitContext);
  const [, setVisits] = useContext(VisitsContext);
  const [evaluation, setEvaluation] = useContext(EvaluationContext);

  const handleChange = event => {
    const newState = {...evaluation};
    const value = event.target.value;
    _.set(newState, event.target.name, event.target.type === "radio" ? Number(value) : value);
    setEvaluation(newState);
  };

  async function saveEvaluation(evaluation, visit) {
    const parts = {
      userId: visit.userId,
      entityId: visit.entityId,
      visitId: visit.id
    }
    if (login.userId) {
      await insertEntityEvaluation({...evaluation, ...parts});
    } else {
      await insertUserEvaluation({...evaluation, ...parts});
    }
  }

  async function handleSave(event) {
    event.preventDefault();

    try {
      if (login.userId) {
        await finishByUser(visit);
      } else {
        await finishByEntity(visit);
      }

      await saveEvaluation(evaluation, visit);
      enqueueSnackbar("Visita finalizada com sucesso!", {variant: "success"});
    } catch (e) {
      enqueueSnackbar("Não foi possível finalizar", {variant: "error"});
    }

    setVisits && setVisits(await list());
    onSubmit();
  }

  return <form
    id="evaluation-form"
    autoComplete="off"
    noValidate
    onSubmit={handleSave}
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
        <Rating name="rating" onChange={handleChange} size={"large"}/>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          multiline
          rows={5}
          rowsMax={5}
          fullWidth
          label="Comentário"
          margin="dense"
          name="comment"
          value={evaluation.comment}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
    </Grid>
  </form>
}
