import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { actions, productSelectors } from "../redux/productSlice";
import { getNFTs } from "../redux/productSlice";
import styled from "styled-components";
import styles from "../App.module.css";
// import NavBar from "../components/NavBar";
import CartDndSection from "../components/CartDndSection";
import ProductCardTest from "../components/ProductCardTest";
import NavBar from "../components/NavBar";

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
  const { nfts, status } = useSelector((state) => state.products);
  console.log(nfts);

  useEffect(() => {
    dispatch(getNFTs());
  }, []);

  if (status === "loading") {
    return (
      <div>
        <div className={styles.loader} />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <h2 className={styles.title}>OpenSea NFTs</h2>
      <Container>
        {nfts.map((product) => (
          <ProductCardTest product={product} />
        ))}
      </Container>
      <CartDndSection />
    </>
  );
};

export default AllProductsPage;
