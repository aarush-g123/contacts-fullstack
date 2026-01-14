import axios from "axios";

const baseUrl = "/api/contacts";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newContact) => {
  return axios.post(baseUrl, newContact).then((response) => response.data);
};

const update = (id, updatedContact) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedContact)
    .then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };
