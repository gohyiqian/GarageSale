import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Info = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  // border-top-left-radius: 20px;
  // border-bottom-right-radius: 20px;
  // border-top-right-radius: 80px;
  // border-bottom-left-radius: 80px;
  ${mobile({ height: "20vh" })}
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  border-radius: 10px;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  min-width: 250px;
  margin: 10px;
  position: relative;
  justify-content: center;

  &:hover ${Image} {
    opacity: 0.5;
  }
  &:hover ${Button} {
    background-color: #a94c4c;
    color: white;
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
