import React, {useContext} from "react";
import {EvaluationContext} from "../../../contexts/evaluation.context";
import Grid from "@material-ui/core/Grid";
import {insertEntityEvaluation} from "../../../services/evaluation.service";
import {useSnackbar} from "notistack";
import {TextField} from "@material-ui/core";
import * as _ from "lodash";
import {EntityContext} from "../../../contexts/entity.context";
import Rating from "@material-ui/lab/Rating";
import {makeStyles} from "@material-ui/styles";
import {UserContext} from "../../../contexts/user.context";
import {VisitContext} from "../../../contexts/visit.context";
import {VisitsContext} from "../../../contexts/visits.context";
import {finishByEntity, finishByUser, list} from "../../../services/visit.service";

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
  const [user] = useContext(UserContext);
  const [visit, setVisit] = useContext(VisitContext);
  const [, setVisits] = useContext(VisitsContext);
  const [evaluation, setEvaluation] = useContext(EvaluationContext);

  const handleChange = event => {
    const newState = {...evaluation};
    _.set(newState, event.target.name, event.target.value);
    setEvaluation(newState);
  };

  async function saveEvaluation(evaluation) {
    const parts = {
      userId: user.id,
      entityId: entity.id,
    }
    await insertEntityEvaluation({...evaluation, ...parts});
  }

  async function handleSave() {
    try {
      await finishByUser(visit);
      await finishByEntity(visit);
      await saveEvaluation(evaluation);
      enqueueSnackbar("Visita finalizada com sucesso!", {variant: "success"});
    } catch (e) {
      enqueueSnackbar("Não foi possível finalizar", {variant: "error"});
    }

    setVisits && setVisits(await list());
    onSubmit();
  }

  function handleRatingChange(rating) {
    setEvaluation({...evaluation, rating});
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
          name="comment"
          value={evaluation.comment}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
    </Grid>
  </form>
}
