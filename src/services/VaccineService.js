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
      const { vaccine } = response.data;
      return vaccine;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new VaccineService();
