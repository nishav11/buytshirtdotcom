import React from "react";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={() => {}}
          className="btn btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button onClick={() => {}} className="btn btn-outline-danger mt-2 mb-2">
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header">A photo from pexels</div>
      <div className="card-body text-center">
        <ImageHelper {...product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          this photo looks great
        </p>
        <p className="btn btn-success rounded btn-sm px-4">₹ 599</p>
        <div className="row">
          <div class="d-grid gap-2">
            {showAddToCart(addToCart)}
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
