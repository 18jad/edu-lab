import axios from "axios";

const admin = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1.0/admin",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
  },
});

const instructor = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1.0/instructor",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("instructor_access_token")}`,
  },
});

export { admin, instructor };
