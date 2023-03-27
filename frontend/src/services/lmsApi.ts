import axios from "axios";

const lmsApi = axios.create({
  baseURL: 'http://localhost:8080/',
});

export default lmsApi;