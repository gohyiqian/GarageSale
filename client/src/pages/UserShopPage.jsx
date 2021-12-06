import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import styled from "styled-components";
// import styles from "../App.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const UserShopPage = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col>My Shop</Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default UserShopPage;
