import * as axios from "axios";
import {API_BASE_URL} from "../constants";

const ENTITY_ENDPOINT_PATH = "/institutions";
const USER_ENDPOINT_PATH = "/users";
const EVALUATION_PATH = "/evaluations";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const emptyEvaluation = () => (
  {
    comment: undefined,
    rating: 0,
  }
);

export async function insertEntityEvaluation(evaluation) {
  const result = await api.post(`${ENTITY_ENDPOINT_PATH}/${evaluation.entityId}${EVALUATION_PATH}`, evaluation);
  return result.data;
}

export async function insertUserEvaluation(evaluation) {
  const result = await api.post(`${USER_ENDPOINT_PATH}/${evaluation.userId}${EVALUATION_PATH}`, evaluation);
  return result.data;
}
