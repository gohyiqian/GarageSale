import { Badge } from "@material-ui/core";
import SearchBar from "../components/SearchBar";
import {
  ShoppingCartOutlined,
  Instagram,
  Facebook,
  Pinterest,
  Person,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsiveMobile";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavBarStyle = {
  position: "sticky",
  top: "0",
  zIndex: "999",
  backgroundColor: "#945047",
  color: "white",
};

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
  margin: 3px 20px;
  cursor: pointer;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 100px;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
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

const NavBar = () => {
  const { cartItems } = useSelector((state) => state.cart);

  // get user info from store
  // const userLogin = useSelector(state => state.userLogin)
  // const { userInfo } = userLogin

  // dummy
  const user = false;
  const userInfo = {
    isAdmin: true,
  };

  const dispatch = useDispatch();

  const logoutHandler = () => {
    // dispatch(logout())
  };
  return (
    <Navbar style={NavBarStyle} variant="light" expand="lg" collapseOnSelect>
      <Container>
        <Left>
          <LinkContainer to="/">
            <Logo>GARAGESALE</Logo>
          </LinkContainer>
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
        </Left>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Center>
            <SearchBar />
          </Center>

          <Nav className="ml-auto">
            <Right>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <Badge
                    badgeContent={cartItems.reduce(
                      (acc, item) => acc + item.qty,
                      0
                    )}
                    color="primary"
                    max={100}
                  >
                    <ShoppingCartOutlined style={{ color: "white" }} />
                  </Badge>
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <>
                  <Person />
                  <NavDropdown title="Dummy" id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <span>Login</span>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/nftcart">
                    <Nav.Link>
                      <span>NFTs</span>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {user && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenue">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Right>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
