import axios from "../http";

export default class AuthService {
  URL = {
    OAUTH_TOKEN: "oauth/token",
    COMICS: "comics",
  };

  login(username, password) {
    return axios.get(resourceUrl);
  }

  logout() {
    return axios.get(
      `${this.URL.COMICS}?titleStartsWith=${title}&offset=${offset}&limit=${limit}`
    );
  }
}