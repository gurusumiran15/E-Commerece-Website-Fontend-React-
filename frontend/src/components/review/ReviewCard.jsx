import React from "react";

import { ReactComponent as StarIcon } from "../../assets/svg/star.svg";
import styles from "./ReviewCard.module.css";

export default function ReviewCard(props) {
  const { review } = props;
  return (
    <div className={styles["review-card"]}>
      <div className={styles.info}>
        <span>{review.userName} &#x2022; </span>
        <span>{review.createdAt.substring(0, 10)}</span>
      </div>
      <Rating rating={review.rating} />
      <p>{review.text}</p>
      <br />
    </div>
  );
}

function Rating(props) {
  const { rating } = props;
  const stars = [];
  for (let i = 1; i <= 5; i++)
    stars.push(
      <StarIcon
        key={i}
        className={
          `star ${styles.star} ` +
          (rating >= i ? styles.active : styles.inactive)
        }
      />
    );
  return <div>{stars}</div>;
}
