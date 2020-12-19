import axios from "axios";

import environments from "../configurations/environments";
import AuthService from "../services/AuthService";

const http = axios.create({
  baseURL: `${environments.host}`,
  timeout: false
});

http.interceptors.request.use(
  request => {
    console.log(request);
    const token = AuthService.getAccessToken();
    if (
      (token && request.url != "/oauth/token") ||
      (request.method == "delete" && request.url == "/oauth/token")
    ) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  error => {
    console.log(error.message);
    return error;
  }
);

http.interceptors.response.use(
  response => {
    if (response.code == 401) {
      AuthService.getAccessToken();
    }
    return response;
  },
  error => {
    console.log(error.message);
    return error;
  }
);

export default http;
