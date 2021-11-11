import styled from "styled-components";
import { categories } from "../dummyData";
import { mobile } from "../responsiveMobile";
import CategoryItem from "./CategoryItem";
import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  // padding: 1.25rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Title = styled.span`
  display: flex;
  font-size: 18px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  padding: 15px;
  background-color: #fcf5f5;
`;

const Categories = () => {
  const [cat, setCat] = useState();
  useEffect(() => {
    const getProductCategories = async () => {
      const res = await fetch("api/products/categories", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) {
        const payload = await res.json();
        setCat(payload);
        console.log(payload);
      } else {
        console.error("Server Error");
      }
    };
    getProductCategories();
  }, []);

  return (
    <>
      <Title>SHOP BY CATEGORIES</Title>
      <Container className="p-4">
        {/* using dummyData */}
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default Categories;
