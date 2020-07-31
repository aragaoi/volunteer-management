import * as axios from "axios";
import {API_BASE_URL} from "../constants";

const ENTITY_ENDPOINT_PATH = "/entity-evaluations";
const USER_ENDPOINT_PATH = "/user-evaluations";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function insertEntityEvaluation(evaluation) {
  const result = await api.post(ENTITY_ENDPOINT_PATH, evaluation);
  return result.data;
}

export async function insertUserEvaluation(evaluation) {
  const result = await api.post(USER_ENDPOINT_PATH, evaluation);
  return result.data;
}
