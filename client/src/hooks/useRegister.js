import React, { useState, useEffect, useRef, useCallback } from "react";
import { registerUser } from "../actions/user";
import { useDispatch } from "react-redux";

const useRegister = props => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: []
  });

  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();

    let dataToSubmit = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      passwordConfirmation: inputs.passwordConfirmation
    };
    console.log("isFromValid", isFormValid());
    if (isFormValid()) {
      setInputs({ errors: [] });

      dispatch(registerUser(dataToSubmit))
        .then(response => {
          if (response.payload.success) {
            setTimeout(() => {
              props.history.push("/");
            }, 3000);
          } else {
            console.log(response.payload.message);
            setInputs({ ...inputs, errors: [response.payload.message] });
            initMessage();
          }
        })
        .catch(err => {
          setInputs({ ...inputs, errors: inputs.errors.concat(err) });
        });
    } else {
      setInputs({
        ...inputs,
        errors: inputs.errors.concat("유효하지 않은 형식입니다.")
      });
    }
  };
  const handleChange = useCallback(
    event => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    },
    [inputs]
  );
  const isFormValid = () => {
    let error;
    let errors = [];
    console.log("isFormEmpty", isFormEmpty(inputs));
    if (isFormEmpty(inputs)) {
      error = { message: "빈칸을 채워주세요" };
      setInputs({ errors: errors.concat(error) });
      console.log("빈칸에러?");
      return false;
    } else if (!isPasswordValid(inputs)) {
      error = { message: "패스워드가 서로 다릅니다." };
      setInputs({ errors: errors.concat(error) });
      console.log("패스워드에러?");
      return false;
    } else {
      return true;
    }
  };
  const isFormEmpty = ({ name, email, password, passwordConfirmation }) => {
    return (
      !name.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (passwordConfirmation && passwordConfirmation.length < 6) {
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
    setInputs({ ...inputs, errors: [] });
  };

  return { inputs, handleChange, handleSubmit, displayError };
};

export default useRegister;
