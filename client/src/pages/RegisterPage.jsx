import styled from "styled-components";
import { mobile } from "../responsiveMobile.js";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fce1e1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 30px;
  ${mobile({ width: "75%" })}
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px 20px;
  background-color: #945047;
  color: white;
  cursor: pointer;
  margin: auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #fce1e1;
    color: black;
  }
`;

const linkStyle = {
  textDecoration: "none",
  color: "#945047",
};

const Error = styled.span`
  display: flex;
  color: red;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch() Method
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length && email && password && confirmPassword === 0) {
      return setMessage("Please enter username");
    }
    if (confirmPassword !== password) {
      return setMessage("Please key same password");
    }
    const response = await fetch("api/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    console.log(result);

    if (result.savedUser) {
      window.location.assign("/login");
    } else if (result.errors) {
      setMessage(result.errors[0].msg);
    }
  };

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
    <Container>
      <Wrapper className="p-5">
        <h1 className="mb-2">GARAGESALE</h1>
        <p className="mb-4">
          <i>Create an Account Now!</i>
        </p>
        <Form>
          <Form.Group>
            <Form.Control
              type="username"
              className="mb-3"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Control
              type="email"
              className="mb-3"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control
              type="password"
              className="mb-3"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control
              type="password"
              className="mb-3"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {message && <Error className="mb-3">{message}</Error>}

          <Button type="submit" className="mb-3" onClick={handleSubmit}>
            CREATE
          </Button>
        </Form>

        <Link to="/login" style={linkStyle}>
          <p>Already have Account? Go Login!</p>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Register;
