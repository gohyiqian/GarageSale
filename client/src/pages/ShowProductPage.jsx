import { useState, useEffect } from "react";
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
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import RatingStar from "../components/RatingStar";
import Loader from "../components/Loader";
// import { dummyProducts } from "../dummyData";
import { Add, Remove } from "@material-ui/icons";
import { addToCartAction } from "../redux/apiCart";
import { getProduct } from "../redux/apiProduct";
import Message from "../components/Message";
// import axios from "axios";
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
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.products);
  console.log(product);

  useEffect(() => {
    dispatch(getProduct(match.params.id));
  }, [dispatch]);

  // useEffect(() => {
  //   async function getProduct() {
  //     const { data } = await axios.get(`/api/products/${match.params.id}`);
  //     console.log(data);
  //     setProduct(data);
  //   }
  //   getProduct();
  // }, []);

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

  return (
    <>
      <NavBar />
      {status === "loading" ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <RatingStar
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#945047"}
                  />
                </ListGroupItem>
                <ListGroupItem>Price: ${product.price}</ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.stockCount > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.stockCount > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")} />
                            <Amount>
                              <Form.Control
                                as="select"
                                value={Number(qty)}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.stockCount).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={Number(x) + 1}>
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
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <button
                      onClick={() =>
                        dispatch(addToCartAction(product.id, Number(qty)))
                      }
                      className={styles.loginBtn}
                      disabled={product.stockCount === 0}
                      type="button"
                    >
                      Add to Cart
                    </button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ShowProductPage;
