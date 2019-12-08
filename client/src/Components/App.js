import React from "react";
import GlobalStyles from "./GlobalStyles";
import Router from "./Router";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 10px auto;
  padding: 76px;
`;

const App = () => {
  return (
    <Container>
      <GlobalStyles />
      <Router />
    </Container>
  );
};

export default App;
