import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.accessToken;
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODJiM2VjODE0ZWI1MjMxM2Q4NGE0ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjEyNTU3MSwiZXhwIjoxNjM2Mzg0NzcxfQ.jlkyzoDco2YsaF1FipbwtOqohPUvKICDCPKkITvpo_Y";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
