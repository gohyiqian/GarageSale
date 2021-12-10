import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import styled from "styled-components";
import styles from "../App.module.css";
import { getUserDetails, updateUserProfile } from "../redux/apiUser";
import { useHistory } from "react-router";

const ProfileContainer = styled.div`
  height: 280px;
  position: relative;
`;
const UserCoverImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const UserProfileImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  margin: 50px 0 50px 120px;
  top: 100px;
  border: 5px solid white;
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
  const [desc, setDesc] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const { status, userInfo, profileDetails, error } = useSelector(
    (state) => state.user
  );

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleCreateProduct = (e) => {};

  const product = false;

  return (
    <>
      <NavBar />
      {status === "loading" && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <ProfileContainer>
        <UserCoverImg src="../images/coverImage.jpg" alt="" />
        <UserProfileImg src="../images/shopAvatar.jpg" alt="" />
      </ProfileContainer>

      <Row style={{ margin: "20px" }}>
        <Col md={3} className="p-4" style={{ backgroundColor: "#fcf5f5" }}>
          <h2 style={{ textAlign: "center" }}>MerryK Shop </h2>
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
          <span>
            Official shop selling authentic MaryLamb products exclusively from
            Argentina.
          </span>
          <h4 className="mt-3" style={{ textAlign: "center" }}>
            Joined
          </h4>
          <hr />
          <span>{userInfo.date_joined}</span>
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

            <Form.Group controlId="description">
              <Form.Label>Shop Description</Form.Label>
              <Form.Control
                as="textarea"
                className="mb-3"
                required
                placeholder="Enter Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
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

            {message && <Message variant="danger">{message}</Message>}
            <button type="submit" className={styles.loginBtn}>
              Update
            </button>
          </Form>
        </Col>

        <Col md={9} className="p-4">
          {product ? (
            <>
              <h2 style={{ color: "#945047" }} className="mb-3">
                My Products
              </h2>
              <Row>{/* Map seller product here */}</Row>
              <Row>
                <Col md={3}>
                  <button
                    className={styles.loginBtn}
                    onClick={handleCreateProduct}
                  >
                    <i className="fas fa-plus px-2"> </i> Add more Product
                  </button>
                </Col>
                <Col></Col>
              </Row>
            </>
          ) : (
            <Row>
              <h3 className="mb-4">Congrats for starting your own Shop! </h3>
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

          {/* 
          {orderStatus === "loading" ? (
            <Loader />
          ) : orderError ? (
            <Message variant="danger">{orderError}</Message>
          ) : (
            <> */}
          {/* <Table striped responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                  </tr>
                </thead>
              </Table> */}
          {/* <div className={styles.customized_scrollbar}>
                <Table striped responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Order Amount</th>
                      <th>Payment Status</th>
                      <th>Delivery Status</th>
                      <th>Details</th>
                    </tr>
                  </thead> */}

          {/* <tbody>
                    {orderList.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            <strong style={{ color: "green" }}>
                              Paid on {order.paidAt.substring(0, 10)}{" "}
                            </strong>
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <strong style={{ color: "green" }}>
                              Sent on {order.paidAt.substring(0, 10)}
                            </strong>
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order.id}`}>
                            <Button className="btn-sm" variant="secondary">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table> */}
          {/* </div> */}
          {/* </>
          )} */}
        </Col>
      </Row>
      <hr />
      <Footer />
    </>
  );
};
export default UserShopPage;
