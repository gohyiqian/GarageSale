import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import styled from "styled-components";
import styles from "../App.module.css";
import { getUserDetails, updateUserProfile } from "../redux/apiUser";
import { actions } from "../redux/userSlice";
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
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  margin: 50px;
  top: 100px;
  border: 5px solid white;
`;

const Following = styled.div`
  display: flex;
  flex: 1;
`;
const Follower = styled.div`
  flex: 1;
`;
const UserProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const { error, status, userInfo, profileDetails } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!profileDetails || userInfo.id !== profileDetails.id) {
        // dispatch(actions.userProfileUpdateReset());
        dispatch(getUserDetails("profile"));
        // dispatch(listMyOrders());
      } else {
        // pre-fill the form with existing logged-in user data
        setName(profileDetails.name);
        setEmail(profileDetails.email);
      }
    }
  }, [dispatch, history, userInfo, profileDetails]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: profileDetails.id,
          username: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <>
      <NavBar />
      {status === "loading" && <Loader />}
      <ProfileContainer>
        <UserCoverImg src="images/noCover.jpg" alt="" />
        <UserProfileImg src="images/noAvatar.png" alt="" />
      </ProfileContainer>

      <Row style={{ margin: "20px" }}>
        <Col md={3} className="p-4">
          <h2>{userInfo.name} </h2>
          <div style={{ display: "flex" }}>
            <Following>2</Following>
            <Follower>20</Follower>
          </div>
          <div style={{ display: "flex" }} className="mb-3">
            <Following>Following</Following>
            <Follower>Followers</Follower>
          </div>
          <h4> Bio </h4>
          <hr />
          <span>
            I am a full-time shopper, specialised in curating and recommending
            the best nike shoes in town
          </span>
          <h4 className="mt-3">Joined</h4>
          <hr />
          <span>{userInfo.date_joined}</span>
          <h4 className="mt-3">Edit Profile</h4>
          <hr />

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="mb-3"
                required
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                className="mb-3"
                required
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="passwordConfirm" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <button type="submit" className={styles.loginBtn}>
              Update
            </button>
          </Form>
        </Col>
        <Col md={9} className="p-4">
          <h2>My Orders</h2>
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>09090</td>
                <td>8989</td>
                <td>8877</td>
                <td>Paid</td>
                <td>
                  <LinkContainer to={`/order/`}>
                    <Button className="btn-sm">Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            </tbody>
          </Table>
          <hr />
          <h2>My Sales</h2>
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Sold</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>09090</td>
                <td>8989</td>
                <td>8877</td>
                <td>Paid</td>
                <td>
                  <LinkContainer to={`/order/`}>
                    <Button className="btn-sm">Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <hr />
      <Footer />
    </>
  );
};

export default UserProfilePage;
