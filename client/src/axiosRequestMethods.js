import axios from "axios";

// add heroku as baseURL
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/";

const TOKEN = process.env.REACT_APP_TOKEN;
// JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//   .accessToken || "";

// No JWT required for public access
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// JWT for user request
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
