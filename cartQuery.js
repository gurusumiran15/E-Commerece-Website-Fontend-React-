import { BACKEND_TWO_API_URL } from "../config";

const destructureCart = (cartData) => {
  const products = cartData.cartItems.map((cartItem) => {
    const product = cartItem.product;
    product.quantity = cartItem.quantity;
    product.cartItemId = cartItem.cartItemId;
    return product;
  });
  const cart = { ...cartData, cartItems: products };
  return cart;
};

export const getCart = async (user) => {
  const response = await fetch(`${BACKEND_TWO_API_URL}/cart/`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: user.token },
  });
  const data = await response.json();
  return destructureCart(data);
};

export const getProductFromCart = async (productId, user) => {
  const response = await fetch(`${BACKEND_TWO_API_URL}/cart/get-item`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: user.token },
    body: JSON.stringify(productId),
  });

  if (response.status !== 200) return null;

  const data = await response.json();
  return data;
};

export const addProductToCart = async (productId, user) => {
  const response = await fetch(`${BACKEND_TWO_API_URL}/cart/add-item`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: user.token },
    body: JSON.stringify(productId),
  });
  if (response.ok) return true;
  return false;
};

export const removeProductFromCart = async (cartItemId, user) => {
  const response = await fetch(`${BACKEND_TWO_API_URL}/cart/remove-item`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: user.token },
    body: JSON.stringify(cartItemId),
  });
  const data = await response.json();
  return destructureCart(data);
};

export const updateProductInCart = async (cartItemId, quantity, user) => {
  const response = await fetch(`${BACKEND_TWO_API_URL}/cart/update-item`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: user.token },
    body: JSON.stringify({
      cartItemId,
      quantity,
    }),
  });
  const data = await response.json();
  console.log(data);
  return destructureCart(data);
};
