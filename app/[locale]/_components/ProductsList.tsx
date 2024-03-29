import React from "react";
import ProductCard from "./ProductCard";

type Props = {};

function ProductsList({}: Props) {
  return (
    <section>
      {Array(12)
        .fill("")
        ?.map((card) => (
          <ProductCard />
        ))}
    </section>
  );
}

export default ProductsList;
