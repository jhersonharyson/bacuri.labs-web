import axios from "../http";
import environments from "../configurations/environments";

class VaccineService {
  user = null;

  URL = {
    VACCINE: "/vaccine"
  };

  async getAll() {
    try {
      const response = await axios.get(this.URL.VACCINE);
      const { content } = response.data;
      return content;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new VaccineService();
