import React, { useState, useEffect, useRef } from "react";
import { registerUser } from "../actions/user";

const useRegister = props => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: []
  });

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();

      let dataToSubmit = {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        passwordConfirmation: inputs.passwordConfirmation
      };
      console.log("isFromValid", isFormValid());
      if (isFormValid()) {
        console.log(props);
        setInputs({ errors: [] });
        props
          .dispatch(registerUser(dataToSubmit))
          .then(response => {
            if (response.payload.success) {
              props.history.push("/");
            } else {
              console.log(response.payload.message);
              setInputs({
                errors: [response.payload.message]
              });
              initMessage();
            }
          })
          .catch(err => {
            setInputs({ errors: inputs.errors.concat(err) });
          });
      } else {
        setInputs({
          errors: inputs.errors.concat("유효하지 않은 형식입니다.")
        });
        initMessage();
      }
    }
  };
  const handleChange = event => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const isFormValid = () => {
    let error;
    let errors = [];
    console.log("isFormEmpty", isFormEmpty(inputs));
    if (isFormEmpty(inputs)) {
      error = { message: "빈칸을 채워주세요" };
      setInputs({ errors: errors.concat(error) });
    } else if (!isPasswordValid(inputs)) {
      error = { message: "패스워드가 서로 다릅니다." };
      setInputs({ errors: errors.concat(error) });
    } else {
      return true;
    }
  };
  const isFormEmpty = ({ name, email, password, passwordConfirmation }) => {
    console.log(
      "name",
      name,
      "email",
      email,
      "password",
      password,
      "passwordcon",
      passwordConfirmation
    );
    if (
      name === "" ||
      name === undefined ||
      email === "" ||
      email === undefined ||
      password === "" ||
      password === undefined ||
      passwordConfirmation === "" ||
      passwordConfirmation === undefined
    ) {
      return true;
    }
    return false;
  };
  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (
      (password && password.length < 6) ||
      (passwordConfirmation && passwordConfirmation.length < 6)
    ) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };
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

export default useRegister;
