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
    <Container className="p-4">
      {/* using dummyData */}
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
