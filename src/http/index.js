import axios from "axios";

import environments from "../configurations/environments";
import AuthService from "../services/AuthService";

const http = axios.create({
  baseURL: `${environments.host}`,
  timeout: false
});

http.interceptors.request.use(
  response => {
    const token = AuthService.getAccessToken();
    if (token) {
      response.headers.Authorization = `Bearer ${token}`;
    }
    return response;
  },
  error => {
    console.log(error.message);
    return error;
  }
);

http.interceptors.response.use(
  response => response,
  error => {
    console.log(error.message);
    return error;
  }
);

export default http;
