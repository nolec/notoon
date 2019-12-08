import React, { useState, useEffect, useRef } from "react";
import { loginUser } from "../actions/user";

const useLogin = props => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    errors: []
  });

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();

      let dataToSubmit = {
        email: inputs.email,
        password: inputs.password
      };

      if (isFormValid(inputs)) {
        console.log(props);
        setInputs({ errors: [] });
        props.dispatch(loginUser(dataToSubmit)).then(response => {
          if (response.payload.loginSuccess) {
            props.history.push("/");
          } else {
            console.log(response.payload.message);
            setInputs({
              errors: [response.payload.message]
            });
            initMessage();
          }
        });
      } else {
        setInputs({
          errors: inputs.errors.concat("Email과 Password를 입력해주세요")
        });
        initMessage();
      }
    }
  };
  const handleChange = event => {
    if (event) {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    }
  };
  const isFormValid = ({ email, password }) => email && password;
  const displayError = errors => {
    console.log(errors);
    return errors.map((error, i) => <p key={i}>{error}</p>);
  };
  const initMessage = () => {
    setTimeout(() => {
      setInputs({
        errors: []
      });
    }, 2000);
  };
  return { inputs, handleChange, handleSubmit, displayError };
};

export default useLogin;
