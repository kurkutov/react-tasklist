import axios from "axios"

export default axios.create({
  baseURL: "http://task-list.loc/",
  responseType: "json"
})