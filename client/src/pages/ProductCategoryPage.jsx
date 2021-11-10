import styled from "styled-components";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsiveMobile.js";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 15px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  // USING PATH LOCATION TO CHANGE FILTER STATE
  const location = useLocation();
  // console.log(location);
  // console.log(location.pathname.split("/")[2]);
  const cat = location.pathname.split("/")[2];

  //  useState
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  // handle filters onChange
  const handleFilters = (e) => {
    const value = e.target.value;
    // use spread to capture all selected filters
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  console.log(filters);
  return (
    <>
      <Navbar />
      <Banner />

      <Container className="p-4">
        <h2 className="m-3">Category: {cat}</h2>
        <FilterContainer>
          <Filter>
            <FilterText>Color:</FilterText>
            <Select name="color" onChange={handleFilters}>
              <Option selected="true">All</Option>
              <Option>white</Option>
              <Option>black</Option>
              <Option>red</Option>
              <Option>blue</Option>
              <Option>yellow</Option>
              <Option>green</Option>
            </Select>
            <FilterText>Size:</FilterText>
            <Select name="size" onChange={handleFilters}>
              <Option selected="true">All</Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Options:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="latest">Latest</Option>
              <Option value="asc">Prices (low to high)</Option>
              <Option value="desc">Prices (high to low)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
      </Container>

      <Newsletter />
      <Footer />
    </>
  );
};

export default ProductList;
