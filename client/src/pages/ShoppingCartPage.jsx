import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { actions, productSelectors } from "../redux/productSlice";
import { getPosts } from "../redux/productSlice";
import styled from "styled-components";
import styles from "../App.module.css";
// import NavBar from "../components/NavBar";
import CartDndSection from "../components/CartDndSection";
import Product from "../components/Product";

const Container = styled.div`
  display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  flex-flow: row wrap;
  background-color: #fcf5f5;
  justify-content: space-around;
  padding: 50px;
`;

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  // console.log(products);
  // console.log(status);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div>
        <div className={styles.loader} />
      </div>
    );
  }

  return (
    <>
      {/* <NavBar /> */}
      <h2 className={styles.title}>My Shopping Cart</h2>
      <Container>
        {products.map((item) => (
          <Product item={item} />
        ))}
      </Container>
      <CartDndSection />
    </>
  );
};

export default AllProductsPage;
