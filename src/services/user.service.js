import Axios from "axios";

const ENDPOINT_PATH = "/users";

export const emptyUser = () => (
  {
    acceptsContact: true,
    rating: undefined,
    address: {},
  }
);

export async function list() {
  const result = await Axios.get(ENDPOINT_PATH);
  return result.data;
}

export async function get(id) {
  const result = await Axios.get(`${ENDPOINT_PATH}/${id}`);
  return result.data;
}

export async function insert(user) {
  const result = await Axios.post(ENDPOINT_PATH, user);
  return result.data;
}

export async function edit(user) {
  const result = await Axios.patch(`${ENDPOINT_PATH}/${user.id}`, user);
  return result.data;
}

export async function remove(user) {
  const result = await Axios.delete(`${ENDPOINT_PATH}/${user.id}`);
  return result.data;
}
