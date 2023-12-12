import { BACKEND_TWO_API_URL } from "../config";

export const placeOrder = async (user) => {
  const response = await fetch(`${BACKEND_TWO_API_URL}/orders/add-orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: user.token,
    },
  });
  if (response.ok) return true;
  return false;
};

export const getOrders = async (user) => {
  const response = await fetch(`${BACKEND_TWO_API_URL}/orders/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: user.token,
    },
  });
  const orderItems = await response.json();
  console.log(orderItems);
  return orderItems;
};
