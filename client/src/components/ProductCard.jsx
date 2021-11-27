import React from "react";
import { ItemTypes } from "../utilities/itemTypes";
import { useDrag } from "react-dnd";
import RatingStar from "./RatingStar";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag}>
      <Card className="my-3 p-3 rounded">
        <Card.Body key={item.id}>
          <Link to={`/product/${item.id}`}>
            <Card.Img className="mb-3" src={item.image} alt="" height="250px" />
          </Link>
          <Card.Title>{item.name}</Card.Title>
          <div className="my-2">
            <RatingStar
              value={item.rating}
              text={`${item.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
          <Card.Text as="h3">${item.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
