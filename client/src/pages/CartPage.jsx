import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Message from "../components/Message";
import styles from "../App.module.css";
import { addToCartAction, removeFromCartAction } from "../redux/apiCart";
import { actions } from "../redux/cartSlice";

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCartAction(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      <NavBar />
      <Container>
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
        <Row>
          <Col md={8}>
            <h1 className="mb-5">Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message variant="dark">
                Your cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroupItem key={item.productId}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.productId}`}>
                          {item.name}
                        </Link>
                      </Col>

                      <Col md={2}>${item.price}</Col>

                      <Col md={3}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCartAction(
                                item.productId,
                                Number(e.target.value)
                              )
                            )
                          }
                        >
                          {[...Array(item.stockCount).keys()].map((x) => (
                            <option key={x + 1} value={Number(x) + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>

                      <Col md={1}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => {
                            dispatch(removeFromCartAction(item.productId));
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2 className="mb-5">Summary:</h2>
                  <h3>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items
                  </h3>
                  <h3>
                    Subtotal: $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </h3>
                </ListGroupItem>
              </ListGroup>

              <ListGroupItem>
                <button
                  onClick={checkoutHandler}
                  className={styles.loginBtn}
                  disabled={cartItems.length == 0}
                  type="button"
                >
                  Proceed To Checkout
                </button>
              </ListGroupItem>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartPage;
