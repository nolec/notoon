import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
  background-color: #f2f2f2;
  min-height: 100vh;
  display: flex;
`;
const Hbox = styled.div`
  width: 100%;
  height: 10vh;
  padding: 10px 35px;
`;
const Hlink = styled(Link)`
  width: 100%;
  height: 100%;
  font-size: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 10px;
`;
const LoginBox = styled.div`
  width: 400px;
  position: relative;
  background-color: #fff;
  margin: auto;
  border-radius: 10px;
  padding: 40px 55px 33px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
`;
const Form = styled.form`
  > div {
    width: 100%;
    border-bottom: 2px solid #adadad;
    margin-bottom: 37px;
  }
  * {
    all: unset;
    font-size: 15px;
    color: #555;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 45px;
    background: 0 0;
  }
`;
const Name = styled.input``;
const Password = styled.input``;
const Submit = styled.input``;

const LoginPresenter = ({
  handleChange,
  handleSubmit,
  inputs,
  displayError
}) => {
  return (
    <Container>
      <LoginBox>
        <Hbox>
          <Hlink to="/">SELF</Hlink>
        </Hbox>
        <Form onSubmit={event => handleSubmit(event)}>
          <div>
            <Name
              name="email"
              type="email"
              placeholder="E-MAIL"
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <Password
              name="password"
              type="password"
              placeholder="PASSWORD"
              onChange={event => handleChange(event)}
            />
          </div>
          <Submit
            type="submit"
            value="로그인"
            onClick={event => handleSubmit(event)}
          />
        </Form>
        <div>{displayError(inputs.errors)}</div>
      </LoginBox>
    </Container>
  );
};

export default LoginPresenter;
