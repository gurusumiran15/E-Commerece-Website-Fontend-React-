import React from "react";
import { Link } from "react-router-dom";

import CategoryCard from "./CategoryCard";
import styles from "./SectionCard.module.css";

export default function SectionCard(props) {
  const {
    section: { sectionId, sectionName, categories },
  } = props;

  if (!categories) return <>Loading...</>;

  return (
    <div className={styles["section-card"] + " bg-white"}>
      <div className={styles.header}>
        <h1 className="ovf-ellipse">{sectionName}</h1>
        <Link to={"/sections/" + sectionId} className="btn btn-primary">
          <span style={{color:"white"}}>VIEW ALL</span>
        </Link>
      </div>
      <hr />
      <div className={styles.slideshow}>
        {categories.map((category) => (
          <CategoryCard
            key={category.categoryId}
            category={category}
            width="230px"
          />
        ))}
      </div>
    </div>
  );
}
