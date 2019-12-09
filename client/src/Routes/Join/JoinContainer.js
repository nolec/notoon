import React from "react";
import JoinPresenter from "./JoinPresenter";
import useRegister from "../../hooks/useRegister";

const JoinContainer = ({ props }) => {
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
export default JoinContainer;
