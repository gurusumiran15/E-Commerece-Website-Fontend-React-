import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/cards/ProductCard";
import ProductCardCompact from "../components/cards/ProductCardCompact";
import { getProductsWithText } from "../fetch/index";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default function Search() {
  const [products, setProducts] = useState(null);
  const { width } = useWindowDimensions();
  const [searchParams] = useSearchParams();
  const text = searchParams.get("text");

  useEffect(() => {
    getProductsWithText(text)
      .then((products) => setProducts(products))
      .catch((error) => console.log(error));
  }, [text]);

  if (!products) return <>Loading...</>;

  if (width < 770) {
    return (
      <div>
        {products.map((product) => {
          return (
            <ProductCardCompact key={product.productId} product={product} />
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {products.map((product) => {
        return <ProductCard key={product.productId} product={product} />;
      })}
    </div>
  );
}
