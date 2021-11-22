import NavBar from "../components/NavBar";
import styled from "styled-components";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsiveMobile.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userRequest } from "../axiosRequestMethods";
import { useHistory } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import { Link } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  background-color: #fcf5f5;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  margin-left: 30px;
  font-weight: 600;
  display: flex;
  cursor: pointer;
  border-radius: 10px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};

  &:hover {
    background-color: #f8f4f4;
    font-weight: bold;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 1.5;
  display: flex;
  margin-left: 30px;
`;

const Image = styled.img`
  margin: 20px;
  width: 200px;
  border: solid 1px #ddd;
  background-color: white;
  border-radius: 10px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #ddd;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  background-color: white;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  // STRIPE CHECKOUT
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart, cart.total, history]);

  return (
    <>
      <NavBar />
      <Banner />
      <Container>
        <Wrapper>
          <Title>YOUR SHOPPING CART</Title>
          <Hr />
          <Link to="/" style={linkStyle}>
            <Top>
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Top>
          </Link>
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <span>
                        <b>Product:</b> {product.title}
                      </span>
                      <span>
                        <b>ID:</b> {product._id}
                      </span>
                      <ProductColor color={product.color} />
                      <span>
                        <b>Size:</b> {product.size}
                      </span>
                    </Details>
                  </ProductDetail>

                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
            </Info>

            <Summary>
              <h1>ORDER SUMMARY</h1>
              <SummaryItem>
                <span>Subtotal:</span>
                <span>$ {cart.total}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Estimated Shipping:</span>
                <span>$ 5.90</span>
              </SummaryItem>
              <SummaryItem>
                <span>Shipping Discount:</span>
                <span>$ -5.90</span>
              </SummaryItem>
              <SummaryItem type="total">
                <span>Total:</span>
                <span>$ {cart.total}</span>
              </SummaryItem>

              <StripeCheckout
                name="Garage Shop"
                image="https://avatars.githubusercontent.com/u/8252901?v=4"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
