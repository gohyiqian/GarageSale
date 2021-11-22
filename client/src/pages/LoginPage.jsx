import styled from "styled-components";
import { mobile } from "../responsiveMobile.js";
import { useState } from "react";
import { Form } from "react-bootstrap";
// import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  background: #fce1e1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 15px;
  ${mobile({ width: "75%" })}
`;

const Button = styled.button`
  width: 100%;
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

const Error = styled.span`
  display: flex;
  color: red;
`;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    console.log(result);

    if (result.accessToken) {
      console.log(result.accessToken);
      localStorage.setItem("accessToken", result.accessToken);
      window.location.assign("/");
    } else if (result.errors) {
      setMessage(result.errors[0].msg);
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <Wrapper className="p-5">
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

            {message && <Error className="mb-3">{message}</Error>}

            <Button type="submit" className="mb-3" onClick={handleSubmit}>
              LOGIN
            </Button>
          </Form>
          <Link to="/register" style={linkStyle}>
            <p>No Account? Go Create!</p>
          </Link>
          <Hr />
          <span>By joining, you agree to the Terms and Privacy Policy</span>
        </Wrapper>
      </Container>
    </>
  );
};

export default LoginPage;
