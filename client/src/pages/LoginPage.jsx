import styled from "styled-components";
import styles from "../App.module.css";
import { useState } from "react";
import { Form } from "react-bootstrap";
// import Loader from "../components/Loader";
import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";

const Hr = styled.hr`
  color: red;
  border: solid grey 1px;
  width: 300px;
`;

const linkStyle = {
  textDecoration: "none",
  color: "#945047",
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("api/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       password: password,
  //     }),
  //   });
  //   const result = await response.json();
  //   console.log(result);

  //   if (result.accessToken) {
  //     console.log(result.accessToken);
  //     localStorage.setItem("accessToken", result.accessToken);
  //     window.location.assign("/");
  //   } else if (result.errors) {
  //     setMessage(result.errors[0].msg);
  //   }
  // };

  return (
    <>
      <NavBar />
      <div className={styles.loginContainer}>
        <div className={styles.loginWrapper}>
          <Link to="/" style={linkStyle}>
            <h1 className="mb-3" style={{ color: "#945047" }}>
              GARAGESALE
            </h1>
          </Link>
          <p className="mb-3">
            <i>Hi Welcome Back Shopper!</i>
          </p>
          <p className="mb-3">Enter your Credentials</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {message && <span className={styles.loginError}>{message}</span>}

            <button
              type="submit"
              className={styles.loginBtn}
              onClick={handleSubmit}
            >
              LOGIN
            </button>
          </Form>
          <Link to="/register" style={linkStyle}>
            <p>No Account? Go Create!</p>
          </Link>
          <Hr />
          <p>Terms & Conditions Apply</p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
