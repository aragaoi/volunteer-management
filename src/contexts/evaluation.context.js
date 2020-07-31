import React, {createContext, useEffect, useState} from "react";

export const EvaluationContext = createContext(null);

export const EvaluationStore = props => {
  const [evaluation, setEvaluation] = useState(props.evaluation);

  useEffect(() => setEvaluation(props.evaluation), [props.evaluation])

  return (
    <EvaluationContext.Provider value={[evaluation, setEvaluation]}>
      {props.children}
    </EvaluationContext.Provider>
  );
};
