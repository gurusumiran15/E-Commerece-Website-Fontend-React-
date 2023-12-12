import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../components/cards/ProductCard";
import ProductCardCompact from "../components/cards/ProductCardCompact";
import { getCategory } from "../fetch/index";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default function Category() {
  const [category, setCategory] = useState(null);
  const categoryId = Number(useParams().categoryId);
  const { width } = useWindowDimensions();

  useEffect(() => {
    getCategory(categoryId)
      .then((category) => setCategory(category))
      .catch((error) => console.log(error));
  }, [categoryId]);

  if (!category) return <>Loading...</>;

  if (width < 770) {
    return (
      <div>
        {category.products.map((product) => {
          return (
            <ProductCardCompact key={product.productId} product={product} />
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {category.products.map((product) => {
        return <ProductCard key={product.productId} product={product} />;
      })}
    </div>
  );
}
