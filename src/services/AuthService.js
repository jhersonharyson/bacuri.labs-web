import axios from "../http";
import environments from "../configurations/environments";

class AuthService {
  URL = {
    OAUTH_TOKEN: "/oauth/token"
  };

  async login(username, password) {
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

    const response = await axios.post(this.URL.OAUTH_TOKEN, formData, {
      headers
    });
    console.log(response);

    return response;
  }

  logout() {
    return axios.get(
      `${
        this.URL.COMICS
      }?titleStartsWith=${title}&offset=${offset}&limit=${limit}`
    );
  }

  getToken() {
    return localStorage.getItem("token");
  }
}

export default new AuthService();
