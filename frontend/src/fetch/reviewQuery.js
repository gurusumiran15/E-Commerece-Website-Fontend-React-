import { BACKEND_ONE_API_URL } from "../config";

export const addReviewOfProduct = async (review, product, user) => {
  review.product = { productId: product.productId };
  review.userName = user.userName;
  review.userId = user.userId;

  const response = await fetch(`${BACKEND_ONE_API_URL}/reviews/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: user.token },
    body: JSON.stringify(review),
  });
  const data = await response.json();
  return data;
};

export const deleteReviewOfProduct = async (review, product, user) => {
  review.product = { productId: product.productId };
  review.userName = user.userName;
  review.userId = user.userId;

  const response = await fetch(`${BACKEND_ONE_API_URL}/reviews/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: user.token },
    body: JSON.stringify(review),
  });

  if (response.status === 200) return;
  const data = await response.json();
  return data;
};
