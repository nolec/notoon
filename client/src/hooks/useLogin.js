import React, { useState, useEffect, useRef, useCallback } from "react";
import { loginUser } from "../actions/user";
import { useDispatch } from "react-redux";

const useLogin = props => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    errors: []
  });
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();

    let dataToSubmit = {
      email: inputs.email,
      password: inputs.password
    };
    console.log(inputs);
    if (isFormValid(inputs)) {
      setInputs({ ...inputs, errors: [] });
      dispatch(loginUser(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          props.history.push("/");
        } else {
          console.log(response.payload.message);
          setInputs({ ...inputs, errors: [response.payload.message] });
        }
      });
    } else {
      setInputs({
        ...inputs,
        errors: inputs.errors.concat("Email과 Password를 입력해주세요")
      });
      initMessage();
    }
  };
  const handleChange = useCallback(
    event => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    },
    [inputs]
  );
  const isFormValid = ({ email, password }) => email && password;
  const displayError = errors => {
    console.log(errors);
    return errors.map((error, i) => <p key={i}>{error}</p>);
  };
  const initMessage = () => {
    setInputs({ ...inputs, errors: [] });
  };
  return { inputs, handleChange, handleSubmit, displayError };
};

export default useLogin;
