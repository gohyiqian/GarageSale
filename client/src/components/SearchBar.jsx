import styled from "styled-components";
import { Search } from "@material-ui/icons";
import { mobile } from "../responsiveMobile";

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
  border-radius: 15px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 10px;
`;

const Input = styled.input`
  border: none;
  border-radius: 10px;
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
