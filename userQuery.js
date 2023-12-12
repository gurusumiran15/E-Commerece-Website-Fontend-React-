import { BACKEND_THREE_API_URL } from "../config";

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BACKEND_THREE_API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error("Failed to login");
    if (data.message === "Email not registered") {
      error.props = {
        email: "Email not registered",
      };
    } else if (data.message === "Invalid credentials") {
      error.props = {
        email: "Invalid credentials",
        password: "Invalid credentials",
      };
    }
    throw error;
  }

  return {
    token: data.token,
    user: {
      userId: data.userId,
      userName: data.userName,
      token: data.token,
    },
  };
};

export const registerUser = async ({ username, email, password }) => {
  const response = await fetch(`${BACKEND_THREE_API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, userName: username }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error("Email registered");
    if (data.message === "Email already registered") {
      error.props = {
        email: "Email already registered",
      };
    }
    throw error;
  }
  return {
    token: data.token,
    user: {
      userId: data.userId,
      userName: data.userName,
      token: data.token,
    },
  };
};

export const validateUser = async (token) => {
  const response = await fetch(`${BACKEND_THREE_API_URL}/users/validate`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error("Invalid token");
    throw error;
  }
  return {
    token: data.token,
    user: {
      userId: data.userId,
      userName: data.userName,
      token: data.token,
    },
  };
};
