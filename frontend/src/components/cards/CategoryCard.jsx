import React from "react";
import { Link } from "react-router-dom";

import imagePlaceholder from "../../assets/img/image-placeholder.jpg";
import styles from "./CategoryCard.module.css";

export default function CategoryCard(props) {
  const {
    category: { categoryId, categoryName, imageUrl },
    width,
  } = props;

  return (
    <div className={styles["category-card"]} style={{ width }}>
      <Link to={`/categories/${categoryId}`}>
        <img
          className="zoom"
          src={imageUrl || imagePlaceholder}
          alt="Product"
          width="200px"
          height="250px"
        />
        <h5 className="ovf-ellipse">{categoryName}</h5>
      </Link>
    </div>
  );
}
