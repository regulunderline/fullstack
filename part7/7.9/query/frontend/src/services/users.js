import axios from "axios";
const baseUrl = "/api/users";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

export default { getAll, getOne };
