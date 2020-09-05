import Axios from "axios";
import {get as getEntity} from "./entity.service";
import {get as getUser} from "./user.service";

const ENDPOINT_PATH = "/auth";

export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  ENTITY: "ENTITY"
}

const TOKEN_KEY = "token";

export async function doLogin(user) {
  const {data} = await Axios.post(`${ENDPOINT_PATH}/login`, user);

  Axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  localStorage.setItem(TOKEN_KEY, data.token);

  const getFn = data.role === "ENTITY" ? getEntity : getUser;
  return await getFn(data.id);
}

export function doLogout() {
  Axios.defaults.headers.common['Authorization'] = undefined;
  localStorage.removeItem(TOKEN_KEY);
}
