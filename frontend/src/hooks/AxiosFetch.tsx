import axios from "axios";

const admin = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1.0/admin",
});

export { admin };