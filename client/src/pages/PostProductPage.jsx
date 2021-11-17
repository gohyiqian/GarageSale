import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/postSlice";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CartSection from "../components/CartSection";
import { DragSource } from "react-dnd";

const mySource = {
  beginDrag(props) {
    return {
      id: props.id,
    };
  },
  endDrag(props, monitor, component) {},
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

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

const ItemsBox = styled.div`
  display: flex;
  flex-grow: 1;
  height: 300px;
  width: 300px;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  background-color: white;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 0 20px rgba(33, 33, 33, 0.2);
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

export default function Post() {
  const dispatch = useDispatch();

  const { posts, status } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // if (loading === true) {
  //   return (
  //     <div className="todo-list">
  //       <div className="loader" />
  //     </div>
  //   );
  // }

  if (status === "loading") {
    return (
      <div>
        <div className="loader" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Title>My Shopping Cart</Title>
      <Container>
        {posts.map((item) => (
          <ItemsBox key={item.id}>
            <Image src={item.image} alt="" />
            <Desc>{item.title}</Desc>
          </ItemsBox>
        ))}
      </Container>
      <CartSection />
    </>
  );
}
