import { Link } from "react-router-dom";
import styled from "styled-components";
import { ItemTypes } from "../Utilities/itemTypes";
import { useDrag } from "react-dnd";

const Info = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: #a94c4c;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  border-radius: 10px;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const PriceInfo = styled.h1`
  border-radius: 20%;
  background-color: white;
  position: absolute;
  padding: 10px;
  color: #945047;
  z-index: 3;
  font-size: 25px;
`;

const Title = styled.p`
  background-color: white;
  font-size: 16px;
  padding: 5px;
  border-radius: 10px;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  align-items: center;
  justify-content: center;
  background-color: #fcf5f5;
  position: relative;

  &:hover ${PriceInfo} {
    opacity: 0;
  }

  &:hover ${Info} {
    opacity: 1;
  }
  &:hover ${Button} {
    color: white;
    transition: all 1s ease;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    id: item.id,
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <Container
      ref={drag}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <PriceInfo>${item.price}</PriceInfo>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Link to={`/product/${item._id}`}>
          <Button>BUY NOW</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default Product;
