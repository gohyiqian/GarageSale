import styled from "styled-components";
import styles from "../App.module.css";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { register } from "../redux/apiUser";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const Hr = styled.hr`
  color: red;
  border: solid grey 1px;
  width: 300px;
`;

const linkStyle = {
  textDecoration: "none",
  color: "#945047",
};

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo, status, error } = useSelector((state) => state.user); // get user info from store

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    } else {
      dispatch(register(username, email, password));
    }
  };

  // Fetch() Method
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (username.length && email && password && confirmPassword === 0) {
  //     return setMessage("Please enter username");
  //   }
  //   if (confirmPassword !== password) {
  //     return setMessage("Please key same password");
  //   }
  //   const response = await fetch("api/auth/register", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       email: email,
  //       password: password,
  //     }),
  //   });
  //   const result = await response.json();
  //   console.log(result);

  //   if (result.savedUser) {
  //     window.location.assign("/login");
  //   } else if (result.errors) {
  //     setMessage(result.errors[0].msg);
  //   }
  // };

  // Axios Method
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (username.length && email && password && confirmPassword === 0) {
  //     return setMessage("Please enter username");
  //   }
  //   if (confirmPassword !== password) {
  //     return setMessage("Please key same password");
  //   } else {
  //     const user = {
  //       username: username,
  //       email: email,
  //       password: password,
  //     };
  //     try {
  //       await axios
  //         .post(`${process.env.REACT_APP_BASE_URL}auth/register`, user)
  //         .then((response) => {
  //           console.log(response);
  //         });
  //       window.location.assign("/login");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  return (
    <>
      <NavBar />

      {error && <Message variant="danger">{error}</Message>}
      {status === "loading" && <Loader />}
      <div className={styles.loginContainer}>
        <div className={styles.loginWrapper}>
          <Link to="/" style={linkStyle}>
            <h1 className="mb-2" style={{ color: "#945047" }}>
              GARAGESALE
            </h1>
          </Link>
          <p className="mb-4">
            <i>Create an Account Now!</i>
          </p>
          <Form>
            <Form.Group>
              <Form.Control
                type="username"
                className="mb-3"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Control
                type="email"
                className="mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Form.Control
                type="password"
                className="mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Form.Control
                type="password"
                className="mb-4"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {message && <span className={styles.loginError}>{message}</span>}

            <button
              type="submit"
              className={styles.loginBtn}
              onClick={handleSubmit}
            >
              CREATE
            </button>
          </Form>

          <Link to="/login" style={linkStyle}>
            <p>Already have Account? Go Login!</p>
          </Link>
          <Hr />
          <p>Terms & Conditions Apply</p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
