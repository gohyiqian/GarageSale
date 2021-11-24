import React from "react";
import styled from "styled-components";
import { ItemTypes } from "../utilities/itemTypes";
import { useDrag } from "react-dnd";

const ItemsBox = styled.div`
  display: flex;
  flex-grow: 1;
  height: 300px;
  width: 300px;
  flex-direction: column;
  margin: 15px;
  padding: 10px;
  background-color: white;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 0 20px rgba(33, 33, 33, 0.2);
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  max-height: 150px;
  object-fit: cover;
`;

const Desc = styled.span`
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const Product = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // console.log(item);
  return (
    <div ref={drag}>
      <ItemsBox key={item.id}>
        <Image src={item.image} alt="" />
        <Desc>{item.title}</Desc>
      </ItemsBox>
    </div>
  );
};

export default Product;
