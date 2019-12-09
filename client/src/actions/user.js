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

export const auth = async () => {
  const request = await axios
    .get("/api/users/auth")
    .then(response => response.data);

  return {
    type: "AUTH_USER",
    payload: request
  };
};

export const logoutUser = () => {
  const request = axios
    .get(`/api/users/logout`)
    .then(response => response.data);

  return {
    type: "LOGOUT_USER",
    payload: request
  };
};
