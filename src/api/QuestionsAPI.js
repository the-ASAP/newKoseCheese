import API from "./APIService";

class QuestionsAPI {
  getQuestions = () => API.get("questions");
}

export default new QuestionsAPI();