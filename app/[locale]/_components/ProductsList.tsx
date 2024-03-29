import React from "react";
import ProductCard from "./ProductCard";

type Props = {};

function ProductsList({}: Props) {
  return (
    <section>
      {Array(12)
        .fill("")
        ?.map((card, i) => (
          <ProductCard key={i} />
        ))}
    </section>
  );
}

export default ProductsList;
