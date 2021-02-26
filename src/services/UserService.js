import axios from "../http";
import environments from "../configurations/environments";

class UserService {
  user = null;

  URL = {
    USER: "/user"
  };

  async getInfo() {
    try {
      const response = await axios.get(this.URL.USER);
      const { content } = response.data;
      this.user = content;
      localStorage.setItem("user", JSON.stringify(content));
      return this.user;
    } catch (e) {
      console.log(e);
    }
  }

  getUser() {
    if (!this.user) this.user = JSON.parse(localStorage.getItem("user"));
    return this.user;
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new UserService();
