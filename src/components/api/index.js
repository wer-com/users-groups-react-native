import axios from "axios";
const baseURL = "https://shielded-river-07217.herokuapp.com";
export default axios.create({
  baseURL,
});
