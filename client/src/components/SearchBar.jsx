import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 20vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 10px;
`;

const Input = styled.input`
  border: none;
  height: 30px;
  width: 600px;
  font-s9xe
  margin-right: 10px;
  ${mobile({ width: "50px" })};
`;

const SearchBar = () => {
  return (
    <Container>
      <SearchContainer>
        <Input placeholder="You only live once you know? Enjoy shopping!..." />
        <Search style={{ color: "gray", fontSize: 25 }} />
      </SearchContainer>
    </Container>
  );
};

export default SearchBar;
