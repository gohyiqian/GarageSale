import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import styled from "styled-components";
import styles from "../App.module.css";
import { updateShop, getShopByUserId } from "../redux/apiShop";
import { getProductsByShop } from "../redux/apiProduct";
import { useHistory } from "react-router";
import { mobile } from "../responsiveMobile";
import { LinkContainer } from "react-router-bootstrap";

const ProfileContainer = styled.div`
  height: 280px;
  position: relative;
`;
const UserCoverImg = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
`;

const UserProfileImg = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  margin: 10vh 0 10vh 16vh;
  top: 100px;
  border: 5px solid white;
  ${mobile({ width: "25vh", height: "25vh", margin: "auto" })}
`;

const Following = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Follower = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserShopPage = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const { status, userInfo, error } = useSelector((state) => state.user);
  const {
    shop,
    status: shopStatus,
    error: shopError,
  } = useSelector((state) => state.shop);

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    // console.log("userEffect: 01");
    dispatch(getShopByUserId(userInfo.id));
    setName(shop.name);
    setContact(shop.contact);
    setDesc(shop.description);
  }, [userInfo]);

  useEffect(() => {
    // console.log("userEffect: 02");
    if (shop.shop_id) {
      dispatch(getProductsByShop(shop.shop_id));
    }
  }, [shop.shop_id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateShop({
        id: shop.shop_id,
        name: name,
        contact: contact,
        description: desc,
      })
    );
    // clear inputs
    setName("");
    setContact("");
    setDesc("");
  };

  const handleViewShop = () => {
    history.push(`myshop/${userInfo.id}`);
  };

  console.log(products);
  const handleCreateProduct = (e) => {};

  return (
    <>
      <NavBar />
      {status === "loading" && shopStatus === "loading" && <Loader />}
      {error && shopError && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <ProfileContainer>
        <UserCoverImg src="../images/coverImage.jpg" alt="" />
        <UserProfileImg src="../images/shopAvatar.jpg" alt="" />
      </ProfileContainer>

      <Row style={{ margin: "40px" }}>
        <Col
          md={3}
          className="p-4"
          style={{ backgroundColor: "#fcf5f5" }}
          className={styles.scrollbar_v2}
        >
          <h2 style={{ textAlign: "center" }} className="mt-5">
            {!shop ? "Sample Shop" : shop.name}
          </h2>
          <div style={{ display: "flex" }}>
            <Following>2</Following>
            <Follower>20</Follower>
          </div>
          <div style={{ display: "flex" }} className="mb-3">
            <Following>Following</Following>
            <Follower>Followers</Follower>
          </div>
          <h4 style={{ textAlign: "center" }}> Shop Information </h4>
          <hr />
          <span style={{ textAlign: "center" }}>
            {!shop ? "Sample description" : shop.description}
          </span>

          <h4 className="mt-3" style={{ textAlign: "center" }}>
            Edit Shop Profile
          </h4>
          <hr />

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                className="mb-3"
                required
                type="name"
                placeholder="Enter Shop Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="contact">
              <Form.Label>Shop Contact Number</Form.Label>
              <Form.Control
                type="contact"
                className="mb-3"
                required
                placeholder="Enter Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Shop Information</Form.Label>
              <Form.Control
                as="textarea"
                className="mb-3"
                rows={4}
                required
                placeholder="Enter Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {message && <Message variant="danger">{message}</Message>}
            <button type="submit" className={styles.loginBtn}>
              Update
            </button>
          </Form>
        </Col>

        <Col md={9} className="px-4">
          {products.length !== 0 ? (
            <>
              <h2
                style={{ color: "#945047", backgroundColor: "#fcf5f5" }}
                className="mb-3 py-1"
              >
                My Products
              </h2>
              <Row className="mb-2">
                <Col md={3}>
                  <button
                    className={styles.loginBtn}
                    onClick={handleCreateProduct}
                  >
                    <i className="fas fa-plus px-2" /> Add more Product
                  </button>
                </Col>
              </Row>
              <Row className="mb-3">
                <div className={styles.customized_scrollbar}>
                  <Table striped responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th>Price</th>
                        <th>Stock Left</th>
                        <th>Posted Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.brand}</td>
                          <td>{product.category}</td>
                          <td>
                            {product.rating
                              ? product.rating / 5.0
                              : "No Ratings"}
                          </td>
                          <td>${product.price}</td>
                          <td>{product.stockCount}</td>
                          <td>{product.createdAt.substring(0, 10)}</td>
                          <td>
                            <LinkContainer to={`/products/${product.id}`}>
                              <button className="btn-sm" variant="secondary">
                                Details
                              </button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Row>
              <Row>
                <Col md={3}>
                  <button className={styles.loginBtn} onClick={handleViewShop}>
                    <i className="fas fa-store px-2" /> View Your Shop
                  </button>
                </Col>
              </Row>
            </>
          ) : (
            <Row>
              <div className="mb-3">
                <h3 className="mb-4">Congrats on starting your Shop! </h3>

                <p>
                  <i className="fas fa-hand-point-left px-2" />
                  Step 1: Start by updating your Shop profile on the side bar.
                </p>
                <p>
                  <i className="fas fa-hand-point-down px-2" />
                  Step 2: Create your first product by clicking the button
                  below!
                </p>
              </div>
              <Col md={3}>
                <button
                  className={styles.loginBtn}
                  onClick={handleCreateProduct}
                >
                  <i className="fas fa-plus px-2"> </i> Create Your First
                  Product
                </button>
              </Col>
              <Col></Col>
            </Row>
          )}
        </Col>
      </Row>
      <hr />
      <Footer />
    </>
  );
};
export default UserShopPage;
