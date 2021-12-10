import { useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router";
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
  // const history = useHistory();
  const { status, updateStatus, userInfo, error, profileDetails } = useSelector(
    (state) => state.user
  );

  console.log(profileDetails);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profileDetails.id !== Number(userId)) {
      dispatch(getUserDetails(userId));
    } else {
      setName(profileDetails.name);
      setEmail(profileDetails.email);
      setIsAdmin(profileDetails.isAdmin);
      setIsBuyer(profileDetails.usertype.is_buyer);
      setIsSeller(profileDetails.usertype.is_seller);
    }
  }, [profileDetails]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: profileDetails.id,
        username: name,
        email: email,
        isAdmin: isAdmin,
        isBuyer: isBuyer,
        isSeller: isSeller,
      })
    );
    setMessage("User Profile Updated");
  };

  return (
    <>
      <NavBar />
      <Container style={{ margin: "auto" }} className="mt-4 mb-4">
        <h1 className="mb-4">Edit Users Profile</h1>

        {status === "loading" ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
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

                <Row>
                  <Col>
                    <Form.Group controlId="isadmin">
                      <Form.Check
                        type="checkbox"
                        className="mb-3"
                        label="Is Admin"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                      ></Form.Check>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="isbuyer">
                      <Form.Check
                        type="checkbox"
                        className="mb-3"
                        label="Is Buyer"
                        checked={isBuyer}
                        onChange={(e) => setIsBuyer(e.target.checked)}
                      ></Form.Check>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="isseller">
                      <Form.Check
                        type="checkbox"
                        className="mb-3"
                        label="Is Seller"
                        checked={isSeller}
                        onChange={(e) => setIsSeller(e.target.checked)}
                      ></Form.Check>
                    </Form.Group>
                  </Col>
                </Row>
                {/* <Form.Group>
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control className="mb-3"></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control className="mb-3"></Form.Control>
                </Form.Group> */}
                {updateStatus === "success" && message && (
                  <Message variant="info">{message}</Message>
                )}
                <Row>
                  <Col>
                    <button type="submit" className={styles.loginBtn}>
                      Update
                    </button>
                  </Col>
                  <Col>
                    <LinkContainer to={`/admin/allusers`}>
                      <button type="submit" className={styles.loginBtn}>
                        Back
                      </button>
                    </LinkContainer>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </>
  );
};

export default UserEditPage;