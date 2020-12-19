import axios from "../http";
import environments from "../configurations/environments";
import UserService from "./UserService";
import { useHistory } from "react-router-dom";

class AuthService {
  access_token = null;

  URL = {
    OAUTH_TOKEN: "/oauth/token"
  };

  async login(username, password) {
    const { formData, headers } = this.buildLoginParams(username, password);
    const response = await axios.post(this.URL.OAUTH_TOKEN, formData, {
      headers
    });

    console.log(response);

    if (await this.proccessResponse(response)) {
      return true;
    }
    return false;
  }

  async logout() {
    try {
      // await axios.delete(this.URL.COMICS);
      localStorage.removeItem("access_token");
      location.href = "/";
    } catch (e) {
      console.log(e);
    }
  }

  getAccessToken() {
    return localStorage.getItem("access_token");
  }

  setAccessToken(access_token) {
    return localStorage.setItem("access_token", access_token);
  }

  async proccessResponse(response) {
    if (response.status == 200) {
      this.access_token = response?.data?.access_token;
      this.setAccessToken(this.access_token);
      console.log(await this.getUser());
      return true;
    }
    return false;
  }

  async getUser() {
    await UserService.getInfo();
  }

  buildLoginParams(username, password) {
    const formData = new URLSearchParams();
    formData.append("grant_type", environments.security_oauth2_client_scope);
    formData.append("password", password);
    formData.append("username", username);

    const headers = {
      Authorization:
        "Basic " +
        btoa(
          environments.security_oauth2_client_clientId +
            ":" +
            environments.security_oauth2_client_clientSecret
        ),
      "Content-Type": "application/x-www-form-urlencoded"
    };

    return { formData, headers };
  }

  isAuthenticated() {
    return !!this.getAccessToken();
  }
}

export default new AuthService();
