import styled from "styled-components";
// import { popularProducts } from "../dummyData";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  // (cat, filters, sort) props passed from ProductCategoryPage
  // console.log(filters);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // getProducts by category
  // useEffect activated when [cat] changes
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `${process.env.REACT_APP_BASE_URL}products?category=${cat}`
            : // if no cat, just fetch from this
              `${process.env.REACT_APP_BASE_URL}products`
        );
        setProducts(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  // filter products to find those that matches the category
  // useEffect activated when [products,cat,filters] changes
  useEffect(() => {
    if (cat) {
      if (filters.color === "All" || filters.size === "All") {
        setFilteredProducts(products);
      } else {
        const filterOption = products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        );
        console.log(filterOption);
        setFilteredProducts(filterOption);
      }
    }
  }, [products, cat, filters]);

  // Sorting by Prices & CreatedDate
  useEffect(() => {
    if (sort === "latest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 10)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
