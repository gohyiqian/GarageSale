import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import styles from "../App.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import NavBar from "../components/NavBar";
import { getProduct, updateProduct } from "../redux/apiProduct";
import { LinkContainer } from "react-router-bootstrap";

const ProductEditPage = ({ match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const { product, status, error } = useSelector((state) => state.products);
  console.log(product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [stockCount, setStockCount] = useState(0);
  const [description, setDescription] = useState("");
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("productId", productId);
    setUpload(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );
      setImage(data);
      setUpload(false);
    } catch (error) {
      setUpload(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id: productId,
        name: name,
        price: price,
        image: image,
        brand: brand,
        category: category,
        stockCount: stockCount,
        description: description,
      })
    );
  };
  return (
    <>
      <NavBar />
      <Container style={{ margin: "auto" }} className="mt-4 mb-4">
        <div>
          <h2 className="mb-4">Edit Product: {product.name}</h2>
          <Row>
            <Col md={3} className="mb-3">
              <LinkContainer to="/admin/productlist">
                <button className={styles.loginBtn}>
                  Back to All Products
                </button>
              </LinkContainer>
            </Col>
          </Row>
          {status === "loading" ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="brand">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="countinstock">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter stock"
                        value={stockCount}
                        onChange={(e) => setStockCount(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="category">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="image">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="input"
                        rows={3}
                        placeholder="Enter image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      ></Form.Control>

                      <input type="file" onChange={handleFileUpload} />

                      {upload && <Loader />}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={7}
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <button className={styles.loginBtn} type="submit">
                      Update
                    </button>
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default ProductEditPage;
