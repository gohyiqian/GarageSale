import styled from "styled-components";
import NavBar from "../components/NavBar";
// import Banner from "../components/Banner";
import ProductsList from "../components/ProductsList";
import Footer from "../components/Footer";
import { mobile } from "../responsiveMobile.js";
import { useLocation } from "react-router";
import { useState } from "react";

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

const ProductCategoryPage = () => {
  const location = useLocation();
  // get the category type from path
  console.log(location.pathname.split("/")[2]);
  const cat = location.pathname.split("/")[2];

  // sort & filter state
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  // handle filters onChange
  const handleFilters = (e) => {
    const value = e.target.value;
    // use spread to capture all prev selected filters
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  console.log(filters);
  return (
    <>
      <NavBar />
      {/* <Banner /> */}

      <div className="p-4">
        <h2 className="m-3">Category: {cat}</h2>
        <FilterContainer>
          <Filter>
            <FilterText>Color:</FilterText>
            <Select name="color" onChange={handleFilters}>
              <option selected="true">All</option>
              <option>white</option>
              <option>black</option>
              <option>red</option>
              <option>blue</option>
              <option>yellow</option>
              <option>green</option>
              <option>orange</option>
            </Select>

            <FilterText>Size:</FilterText>
            <Select name="size" onChange={handleFilters}>
              <option selected="true">All</option>
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort options:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <option value="latest">Latest</option>
              <option value="asc">Prices (low to high)</option>
              <option value="desc">Prices (high to low)</option>
            </Select>
          </Filter>
        </FilterContainer>
        {/* pass filtering props to productsList component */}
        <ProductsList cat={cat} filters={filters} sort={sort} />
      </div>
      <Footer />
    </>
  );
};

export default ProductCategoryPage;
