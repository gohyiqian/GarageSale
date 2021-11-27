import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "../App.module.css";
import styled from "styled-components";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import RatingStar from "../components/RatingStar";
import Loader from "../components/Loader";
import { dummyProducts } from "../dummyData";
import { Add, Remove } from "@material-ui/icons";
// import Message from '../components/Message'
// import { listProductDetails, createProductReview } from '../actions/productActions'
// import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
`;

const ShowProductPage = ({ match, history }) => {
  const [qty, setQty] = useState(0);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(createProductReview(
    //     match.params.id, {
    //     rating,
    //     comment
    // }
    // ))
  };

  const handleQuantity = (type) => {
    // if (type === "dec") {
    //   quantity > 1 && setQuantity(quantity - 1);
    // } else {
    //   setQuantity(quantity + 1);
    // }
  };

  const handleClick = () => {
    // dispatch(
    //   addProduct({ ...product, quantity, color, size })
    // );
  };

  const product = dummyProducts.find((p) => p.id == match.params.id);
  return (
    <>
      <NavBar />
      <Container>
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
        <Row>
          <Col md={5}>
            <Image src={product.image} alt="" height="400px" />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <RatingStar
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#945047"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.stockCount > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.stockCount > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <AmountContainer>
                          <Remove onClick={() => handleQuantity("dec")} />
                          <Amount>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.stockCount).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Amount>
                          <Add onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <button
                    onClick={addToCartHandler}
                    className={styles.loginBtn}
                    disabled={product.stockCount == 0}
                    type="button"
                  >
                    Add to Cart
                  </button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ShowProductPage;
