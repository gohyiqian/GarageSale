import styled from "styled-components";
import { mobile } from "../responsiveMobile.js";
import { useState } from "react";
import { Form } from "react-bootstrap";
// import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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

const Error = styled.span`
  display: flex;
  color: red;
`;

const linkStyle = {
  textDecoration: "none",
  color: "#945047",
};

const Login = () => {
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
    <Container>
      <Wrapper className="p-5">
        <h1 className="mb-3">GARAGESALE</h1>
        <p className="mb-3">
          <i>Start Shopping Now!</i>
        </p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
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
        <span>By joining, you agree to the Terms and Privacy Policy</span>
      </Wrapper>
    </Container>
  );
};

export default Login;
