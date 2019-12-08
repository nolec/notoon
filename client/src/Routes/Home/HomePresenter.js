import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Main = styled.main``;

const Container = styled.div`
  padding-top: 20px;
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;
const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(150px, 1fr));
  grid-template-rows: repeat(auto, minmax(300px, 1fr));
  grid-gap: 30px;
  ${Item}:first-child {
    grid-column: span 2;
    grid-row: span 2;
  }
`;
const ItemContent = styled.div``;

const HomePresenter = () => (
  <Main>
    <Container>
      <GridBox>
        <Item>
          <ItemContent></ItemContent>
        </Item>
      </GridBox>
    </Container>
  </Main>
);

HomePresenter.propTypes = {};

export default HomePresenter;
