import * as axios from "axios";
import {API_BASE_URL} from "../constants";

const ENDPOINT_PATH = "/users";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const emptyUser = () => (
  {
    acceptsContact: true,
    rating: 0,
    address: {},
    evaluations: []
  }
);

export async function list() {
  const result = await api.get(ENDPOINT_PATH);
  return result.data;
}

export async function save(user) {
  const result = await api.post(ENDPOINT_PATH, user);
  return result.data;
}
