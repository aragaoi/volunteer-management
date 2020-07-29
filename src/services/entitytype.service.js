import * as axios from "axios";
import * as _ from "lodash";
import {API_BASE_URL} from "../constants";

const ENDPOINT_PATH = "/institution-types";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function list() {
  const result = await api.get(ENDPOINT_PATH);
  return result.data;
}

export async function saveAll([...entityTypes]) {
  if (_.isEmpty(entityTypes)) {
    return;
  }

  entityTypes.forEach(type => {
    delete type.added;
    delete type.id;
  });

  const result = await api.post(ENDPOINT_PATH, entityTypes);
  return result.data;
}

export async function deleteAll([...entityTypes]) {
  if (_.isEmpty(entityTypes)) {
    return;
  }

  entityTypes.forEach(type => delete type.deleted);

  const result = await api.patch(ENDPOINT_PATH, {
    active: false
  }, {
    params: {
      where: JSON.stringify({
        id: {
          inq: entityTypes.map(type => type.id)
        }
      })
    }
  });
  return result.data;
}
