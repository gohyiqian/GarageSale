import { Badge } from "@material-ui/core";
import {
  ShoppingCartOutlined,
  Instagram,
  Facebook,
  Twitter,
  Pinterest,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsiveMobile";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #945047;
  color: white;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Center = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 25px;
  justify-content: flex-start;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const NavItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  cursor: pointer;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const Navbar = () => {
  // const quantity = useSelector((state) => state.cart.quantity);

  return (
    <Container>
      <Wrapper>
        <Left>
          <NavItem>FOLLOW US ON:</NavItem>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>

        <Center>
          <Link to="/" style={linkStyle}>
            <h1>GARAGESALE</h1>
          </Link>
        </Center>

        <Right>
          <Link to="/register" style={linkStyle}>
            <NavItem>REGISTER</NavItem>
          </Link>
          <Link to="/login" style={linkStyle}>
            <NavItem>SIGN IN</NavItem>
          </Link>
          <Link to="/cart" style={linkStyle}>
            <NavItem>
              <Badge badgeContent={1} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </NavItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
