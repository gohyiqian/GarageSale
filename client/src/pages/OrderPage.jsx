import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/apiOrder";
import { actions } from "../redux/orderSlice";
import { useHistory } from "react-router";
import styles from "../App.module.css";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CheckOutSteps from "../components/CheckOutSteps";
import Message from "../components/Message";

const Description = styled.p`
  font-weight: 600;
  line-height: 10px;
`;
const fontStyle = {
  color: "#945047",
  fontWeight: "600",
};

const OrderPage = () => {
  const { paymentMethod, cartItems, shippingAddress } = useSelector(
    (state) => state.cart
  );
  const { userInfo } = useSelector((state) => state.user);

  const itemsPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  const shippingPrice = (itemsPrice > 1000 ? 0 : itemsPrice * 0.1).toFixed(2);
  const taxPrice = Number(0.082 * itemsPrice).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const { orders, status, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const history = useHistory();

  if (!paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (status === " success") {
      history.push(`/order/${orders.id}`);
      dispatch(actions.createOrderReset);
    }
  });

  const handleOrder = () => {
    dispatch(
      addOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
    history.push(`/order/${orders.id}`);
  };

  return (
    <>
      <NavBar />
      <Container style={{ margin: "auto" }} className="mt-5 mb-5">
        <CheckOutSteps step1 step2 step3 step4 />
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h1 className="mb-3 px-3">Your Order</h1>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="mb-3">Shipping Information</h2>
                <Description>
                  Name:
                  <span style={fontStyle}> {userInfo.name}</span>
                </Description>
                <Description>
                  Email:<span style={fontStyle}> {userInfo.email}</span>
                </Description>
                <Description>
                  Shipping Address:{" "}
                  <span style={fontStyle}>
                    {shippingAddress.address}, {shippingAddress.city},{" "}
                    {shippingAddress.country} {shippingAddress.postalCode}{" "}
                  </span>
                </Description>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2 className="mb-3">Payment Method</h2>
                <Description>
                  Payment by: <span style={fontStyle}>{paymentMethod}</span>
                </Description>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2 className="mb-3">Order Items</h2>
                <Description>
                  Total:{" "}
                  <span style={fontStyle}>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items{" "}
                  </span>
                </Description>
                {cartItems.length === 0 ? (
                  <Message variant="info">Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col>
                            <Link to={`/product/${item.productId}`}>
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {item.qty} X ${item.price} = $
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      Shipping <br />
                      (Free only if above $1k):
                    </Col>
                    <Col>${shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col>${totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                {error && <Message variant="danger">{error} </Message>}

                <ListGroup.Item className="mt-2">
                  <button
                    type="button"
                    className={styles.loginBtn}
                    disabled={cartItems === 0}
                    onClick={handleOrder}
                  >
                    Place Order
                  </button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <hr />
      <Footer />
    </>
  );
};

export default OrderPage;