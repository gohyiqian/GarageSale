import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODJiM2VjODE0ZWI1MjMxM2Q4NGE0ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjEyNTU3MSwiZXhwIjoxNjM2Mzg0NzcxfQ.jlkyzoDco2YsaF1FipbwtOqohPUvKICDCPKkITvpo_Y";
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
