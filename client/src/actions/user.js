import axios from "axios";

export const loginUser = dataToSubmit => {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then(response => {
      return response.data;
    });

  return {
    type: "LOGIN_USER",
    payload: request
  };
};
export const registerUser = dataToSubmit => {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then(response => response.data);
  return {
    type: "REGISTER_USER",
    payload: request
  };
};
