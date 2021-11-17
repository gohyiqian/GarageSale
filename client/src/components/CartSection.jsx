import React from "react";
import styled from "styled-components";
import Bucket from "../components/Bucket";

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  height: 400px;
`;

const CartDiscardBox = styled.div`
  display: flex;
  flex: 1;
  background: #f5f5f5;
  margin: 40px;
  border-radius: 50px;
  height: 320px;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 5px 5px rgb(0 0 0 / 5%);
`;

const CartAddBox = styled.div`
  display: flex;
  flex: 1;
  background: #f5f5f5;
  margin: 40px;
  border-radius: 50px;
  height: 320px;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 5px 5px rgb(0 0 0 / 5%);
`;

const CartStatus = styled.div`
  display: flex;
  flex: 2;
  background: #fcf5f5;
  height: 380px;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

const CartSection = () => {
  const user = true;
  return (
    <Container>
      {user ? (
        <CartDiscardBox>Drag Items Here to Discard</CartDiscardBox>
      ) : (
        <CartAddBox>Drag Items Here to Add to Cart</CartAddBox>
      )}
      <CartStatus>Table of Status</CartStatus>
    </Container>
  );
};

export default CartSection;
