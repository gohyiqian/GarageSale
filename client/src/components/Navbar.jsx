import { Badge } from "@material-ui/core";
import {
  ShoppingCartOutlined,
  Instagram,
  Facebook,
  Pinterest,
  Search,
  Person,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsiveMobile";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar } from "react-bootstrap";

const Container = styled.div`
  height: 65px;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #945047;
  color: white;
  padding: 0 20px;
  ${mobile({ height: "150px", flexDirection: "column" })}
`;

const Wrapper = styled.div`
  padding: 5px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px", flexDirection: "column" })}
`;

const Center = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column", margin: "5px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Logo = styled.h1`
  display: flex;
  margin-top: 3px;
  margin-left: 5px;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const NavItem = styled.div`
  font-size: 13px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const SocialContainer = styled.div`
  display: flex;
  ${mobile({ display: "none" })}
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

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 500px;
  font-s9xe
  margin-right: 15px;
  ${mobile({ width: "300px" })};
`;

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  &:hover {
    background-color: #ddd;
  }
`;

const DropdownLink = styled.a``;

const NavBar = () => {
  // const quantity = useSelector((state) => state.cart.quantity);
  const user = false;
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={linkStyle}>
            <Logo>GARAGESALE</Logo>
          </Link>
        </Left>

        <Center>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
          <SearchContainer>
            <Input placeholder="Search all you want ..." />
            <Search style={{ color: "gray", fontSize: 25 }} />
          </SearchContainer>
        </Center>

        <Right>
          {user ? (
            <Link to="/login" style={linkStyle}>
              <NavItem>LOGIN | REGISTER</NavItem>
            </Link>
          ) : (
            <Link to="/register" style={linkStyle}>
              <NavItem>LOGIN | REGISTER</NavItem>
            </Link>
          )}
          <Link to="/cart" style={linkStyle}>
            <NavItem>
              <Badge badgeContent={1} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </NavItem>
          </Link>
          <NavItem>
            <Person />
          </NavItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
