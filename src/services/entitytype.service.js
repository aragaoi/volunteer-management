import Axios from "axios";
import * as _ from "lodash";

const ENDPOINT_PATH = "/institution-types";

export async function list() {
  const result = await Axios.get(ENDPOINT_PATH);
  return result.data;
}

export async function saveAll([...entityTypes]) {
  if (_.isEmpty(entityTypes)) {
    return [];
  }

  entityTypes.forEach(type => {
    delete type.added;
    delete type.deleted;
    delete type.id;
  });

  const result = await Axios.post(ENDPOINT_PATH, entityTypes);
  return result.data;
}

export async function deleteAll([...entityTypes]) {
  if (_.isEmpty(entityTypes)) {
    return [];
  }

  entityTypes.forEach(type => delete type.deleted);

  const result = await Axios.patch(ENDPOINT_PATH, {
    active: false
  }, {
    params: {
      ids: entityTypes
        .filter(type => type.id)
        .map(type => type.id)
    }
  });
  return result.data;
}
