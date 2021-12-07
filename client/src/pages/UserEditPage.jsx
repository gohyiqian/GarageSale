import { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUser } from "../redux/apiUser";
import NavBar from "../components/NavBar";
import styles from "../App.module.css";
import { LinkContainer } from "react-router-bootstrap";

const UserEditPage = ({ match }) => {
  const userId = match.params.id;
  // console.log(userId);
  const dispatch = useDispatch();
  const history = useHistory();
  const { status, updateStatus, userInfo, error, profileDetails } = useSelector(
    (state) => state.user
  );

  console.log(profileDetails);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profileDetails.id !== Number(userId)) {
      dispatch(getUserDetails(userId));
    } else {
      setName(profileDetails.name);
      setEmail(profileDetails.email);
      setIsAdmin(profileDetails.isAdmin);
    }
  }, [userId, profileDetails]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: profileDetails.id,
        username: name,
        email: email,
        isAdmin: isAdmin,
      })
    );
    setMessage("User Profile Updated");
  };

  return (
    <>
      <NavBar />
      {status === "loading" ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container style={{ margin: "auto" }} className="mt-4 mb-4">
          <h1 className="mb-4 mx-5">Edit Users Profile</h1>
          <Row style={{ margin: "20px" }}>
            <Col md={6} className="p-4">
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="name"
                    className="mb-3"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    className="mb-3"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="isadmin">
                  <Form.Check
                    type="checkbox"
                    className="mb-3"
                    label="Is Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>

                {updateStatus === "success" && message && (
                  <Message variant="info">{message}</Message>
                )}
                <button type="submit" className={styles.loginBtn}>
                  Update
                </button>
                <LinkContainer to={`/admin/allusers`}>
                  <button type="submit" className={styles.loginBtn}>
                    Back to All Users
                  </button>
                </LinkContainer>
              </Form>
            </Col>
            <Col md={6} className="p-4">
              <Form>
                <Form.Group>
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control className="mb-3"></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control className="mb-3"></Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default UserEditPage;
