import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../Utilities/itemTypes";

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  height: 280px;
  position: sticky;
  bottom: 0;
  z-index: 999;
  background-color: white;
  box-shadow: 0px -6px 10px 0px rgba(0, 0, 0, 0.1);
`;

const CartDiscardBox = styled.div`
  display: flex;
  flex: 1;
  background: #f5f5f5;
  margin: 50px;
  border-radius: 20px;
  height: 200px;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 5px 5px rgb(0 0 0 / 5%);
`;

const CartAddBox = styled.div`
  display: flex;
  flex: 1;
  background: #f5f5f5;
  margin: 50px;
  border-radius: 20px;
  height: 200px;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 5px 5px rgb(0 0 0 / 5%);
`;

const CartStatus = styled.div`
  display: flex;
  flex: 2;
  background: #fcf5f5;
  height: 220px;
  margin: 30px;
  justify-content: center;
  align-items: center;
`;

const CartSection = () => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const user = false;
  return (
    <Container>
      {user ? (
        <CartDiscardBox
          ref={drop}
          style={{
            backgroundPosition: "center",
            backgroundSize: "130% 120%",
            backgroundRepeat: "no-repeat",
            backgroundColor: isOver ? "#ffcccb" : "#f5f5f5",
          }}
        >
          Drag Items Here to Discard
        </CartDiscardBox>
      ) : (
        <CartAddBox
          ref={drop}
          style={{
            backgroundPosition: "center",
            backgroundSize: "130% 120%",
            backgroundRepeat: "no-repeat",
            backgroundColor: isOver ? "#deefc5" : "#f5f5f5",
          }}
        >
          Drag Items Here to Add to Cart
        </CartAddBox>
      )}
      <CartStatus>Table of Status</CartStatus>
    </Container>
  );
};

export default CartSection;
