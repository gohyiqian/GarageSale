import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/orderSlice";
import { getOrderDetails } from "../redux/apiOrder";
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

const OrderSuccessPage = ({ match }) => {
  const orderId = match.params.id;
  console.log(orderId);
  const { userInfo } = useSelector((state) => state.user);

  const { orderDetails, status, error } = useSelector((state) => state.order);
  console.log(orderDetails);
  //   const itemsPrice = cartItems
  //     .reduce((acc, item) => acc + item.price * item.qty, 0)
  //     .toFixed(2);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (!orderDetails || orderDetails.id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderDetails, orderId]);

  return (
    <>
      <NavBar />
      <Container style={{ margin: "auto" }} className="mt-5 mb-5">
        <CheckOutSteps step1 step2 step3 step4 step5 />
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h1 className="mb-3 px-3">Order Submitted Successfully</h1>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="mb-3">Shipping Information</h2>
                <Description>
                  Name:
                  <span style={fontStyle}> {orderDetails.user.username}</span>
                </Description>
                <Description>
                  Email:
                  <span style={fontStyle}> {orderDetails.user.email}</span>
                </Description>
                <Description>
                  Shipping Address:{" "}
                  <span style={fontStyle}>
                    {orderDetails.shippingAddress.address},{" "}
                    {orderDetails.shippingAddress.city},{" "}
                    {orderDetails.shippingAddress.country}{" "}
                    {orderDetails.shippingAddress.postalCode}{" "}
                  </span>
                </Description>
                {orderDetails.isDelivered ? (
                  <Message variant="success">
                    Delivered on {orderDetails.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="warning">Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2 className="mb-3">Payment Method</h2>
                <Description>
                  Payment by:{" "}
                  <span style={fontStyle}>{orderDetails.paymentMethod}</span>
                </Description>
                {orderDetails.isPaid ? (
                  <Message variant="success">
                    Paid on {orderDetails.paidAt}
                  </Message>
                ) : (
                  <Message variant="warning">Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2 className="mb-3">Order Items</h2>
                <Description>
                  Total:{" "}
                  <span style={fontStyle}>
                    {orderDetails.orderItems.reduce(
                      (acc, item) => acc + item.qty,
                      0
                    )}{" "}
                    Items{" "}
                  </span>
                </Description>
                {orderDetails.orderItems.length === 0 ? (
                  <Message variant="info">Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {orderDetails.orderItems.map((item, index) => (
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
                    <Col>${orderDetails.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      Shipping <br />
                      (Free only if above $1k):
                    </Col>
                    <Col>${orderDetails.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${orderDetails.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col>${orderDetails.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                {error && <Message variant="danger">{error} </Message>}

                <ListGroup.Item className="mt-2"></ListGroup.Item>
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

export default OrderSuccessPage;
