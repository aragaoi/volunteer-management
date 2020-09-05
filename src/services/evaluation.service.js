import Axios from "axios";

const ENTITY_ENDPOINT_PATH = "/institutions";
const USER_ENDPOINT_PATH = "/users";
const EVALUATION_PATH = "/evaluations";

export const emptyEvaluation = () => (
  {
    comment: undefined,
    rating: 0,
  }
);

export async function insertEntityEvaluation(evaluation) {
  const result = await Axios.post(`${ENTITY_ENDPOINT_PATH}/${evaluation.entityId}${EVALUATION_PATH}`, evaluation);
  return result.data;
}

export async function insertUserEvaluation(evaluation) {
  const result = await Axios.post(`${USER_ENDPOINT_PATH}/${evaluation.userId}${EVALUATION_PATH}`, evaluation);
  return result.data;
}
