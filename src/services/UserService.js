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
      const { user } = response.data;
      this.user = user;
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserService();
