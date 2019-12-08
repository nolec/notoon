import React from "react";
import JoinPresenter from "./JoinPresenter";
import { connect } from "react-redux";
import useRegister from "../../hooks/useRegister";

const JoinContainer = props => {
  const { inputs, handleSubmit, handleChange, displayError } = useRegister(
    props
  );
  return (
    <JoinPresenter
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      displayError={displayError}
    />
  );
};
const mapStateToProps = state => {
  console.log(state.user, "mapStateToProps");
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(JoinContainer);
