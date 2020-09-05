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

export async function doLoginWithToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if(!token) {
    return null;
  }

  const {data} = await Axios.get(`${ENDPOINT_PATH}/whoAmI`, {
    headers: {'Authorization': `Bearer ${token}`}
  });
  return handleAuthData(data);
}

export async function doLogin(user) {
  const {data} = await Axios.post(`${ENDPOINT_PATH}/login`, user);

  return handleAuthData(data);
}

export function doLogout() {
  Axios.defaults.headers.common['Authorization'] = undefined;
  localStorage.removeItem(TOKEN_KEY);
}

export function getRoleName(role) {
  if (role === ROLES.ADMIN) {
    return "Administrador";
  }
  if (role === ROLES.USER) {
    return "Voluntário";
  }
  if (role === ROLES.ENTITY) {
    return "Entidade";
  }
}

function handleAuthData(data) {
  setGlobalAuth(data);
  localStorage.setItem(TOKEN_KEY, data.token);

  const getFn = data.role === "ENTITY" ? getEntity : getUser;
  return getFn(data.id);
}

function setGlobalAuth(data) {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
}
