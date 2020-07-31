import React, {createContext, useState} from "react";
import {emptyEvaluation} from "../services/evaluation.service";

export const EvaluationContext = createContext(null);

export const EvaluationStore = props => {
  const [evaluation, setEvaluation] = useState(emptyEvaluation());

  return (
    <EvaluationContext.Provider value={[evaluation, setEvaluation]}>
      {props.children}
    </EvaluationContext.Provider>
  );
};
