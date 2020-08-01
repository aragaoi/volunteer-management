import * as axios from "axios";
import {API_BASE_URL} from "../constants";

const ENDPOINT_PATH = "/users";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const emptyUser = () => (
  {
    acceptsContact: true,
    rating: undefined,
    address: {},
  }
);

export async function list() {
  const result = await api.get(ENDPOINT_PATH);
  return result.data;
}

export async function insert(user) {
  const result = await api.post(ENDPOINT_PATH, user);
  return result.data;
}

export async function edit(user) {
  const result = await api.patch(`${ENDPOINT_PATH}/${user.id}`, user);
  return result.data;
}

export async function remove(user) {
  const result = await api.delete(`${ENDPOINT_PATH}/${user.id}`);
  return result.data;
}
