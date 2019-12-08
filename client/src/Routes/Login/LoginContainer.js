import React from "react";
import LoginPresenter from "./LoginPresenter";
import { connect } from "react-redux";
import useLogin from "../../hooks/useLogin";

const LoginContainer = props => {
  const { inputs, handleSubmit, handleChange, displayError } = useLogin(props);
  return (
    <LoginPresenter
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      displayError={displayError}
    />
  );
};
const mapStateToProps = state => {
  console.log(state, state.user, "mapStateToProps");
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(LoginContainer);
