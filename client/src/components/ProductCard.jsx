import React from "react";
import { ItemTypes } from "../utilities/itemTypes";
import { useDrag } from "react-dnd";
import RatingStar from "./RatingStar";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../App.module.css";

const ProductCard = ({ product }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    product: product,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="m-2 py-3">
      <Card key={product.id} style={{ width: "18rem" }}>
        <Link to={`/product/${product.id}`}>
          <Card.Img
            className={styles.card_img_top}
            variant="top"
            src={product.image}
            alt=""
            height="250px"
          />
        </Link>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Short description here...</Card.Text>
          <RatingStar
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color={"#f8e825"}
          />{" "}
          <Link
            to={`/product/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <button className={styles.loginBtn} variant="primary">
              <strong>${product.price} | SHOP NOW </strong>
            </button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
