import axios from "../http";
import environments from "../configurations/environments";

class HistoryService {
  user = null;

  URL = {
    HISTORY: "/history",
    ALL_HISTORY: "/history/all"
  };

  async getAll() {
    try {
      const response = await axios.get(this.URL.HISTORY);
      const { content } = response.data;
      return content;
    } catch (e) {
      console.log(e);
    }
  }

  async getMyHistory() {
    try {
      const response = await axios.get(this.URL.ALL_HISTORY);
      const { content } = response.data;
      return content;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new HistoryService();
