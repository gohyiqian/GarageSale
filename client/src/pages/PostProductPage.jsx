import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/postSlice";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import CartDndSection from "../components/CartDndSection";
import TestProduct from "../components/TestProduct";

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
  color: white;
  padding: 10px;
  margin: 0;
`;
const Container = styled.div`
  display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  flex-flow: row wrap;
  background-color: #fcf5f5;
  justify-content: space-around;
  padding: 50px;
`;

export default function Post() {
  const dispatch = useDispatch();

  const { posts, status } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div>
        <div className="loader" />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <Title>My Shopping Cart</Title>
      <Container>
        {posts.map((item) => (
          <TestProduct item={item} />
        ))}
      </Container>
      <CartDndSection />
    </>
  );
}
