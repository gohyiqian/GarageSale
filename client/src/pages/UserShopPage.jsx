import styled from "styled-components";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { getProductsByShop } from "../redux/apiProduct";
import { getShopByUserId, getShopByShopId } from "../redux/apiShop";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
// import Paginate from "../components/Paginate";
import Loader from "../components/Loader";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: #fcf5f5;
`;

const ProfileContainer = styled.div`
  height: 280px;
  position: relative;
`;

const Title = styled.h1`
  display: flex;
  font-size: 22px;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #fcf5f5;
  // color: #ff69b4;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
`;

const ShopPage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { shop, status, error } = useSelector((state) => state.shop);
  const { products } = useSelector((state) => state.products);
  const [coverImg, setCoverImg] = useState("");

  // console.log(match.params.id);
  useEffect(() => {
    if (userInfo) {
      setCoverImg(userInfo.usertype.cover_image);
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(getShopByUserId(userInfo.id));
  }, [userInfo.id]);

  useEffect(() => {
    if (shop.shop_id) {
      dispatch(getProductsByShop(shop.shop_id));
    }
  }, [shop.shop_id]);

  return (
    <>
      <NavBar />
      <ProfileContainer>
        <CoverImg src={coverImg} alt="" />
      </ProfileContainer>

      <Title>
        <i className="fas fa-store px-2" />
        {shop.name} <i className="fas fa-store px-2" />
      </Title>
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          {/* <Paginate pages={pages} page={page} keyword={keyword} /> */}
          <Container>
            {products.length !== 0 ? (
              products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <span>Oops! This Shop has not listed any products yet</span>
            )}
          </Container>
          {/* <Paginate pages={pages} page={page} keyword={keyword} /> */}
        </>
      )}
    </>
  );
};

export default ShopPage;
