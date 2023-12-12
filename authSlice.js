const { createSlice } = require("@reduxjs/toolkit");

export const USER_JWT_TOKEN = "user-jwt-token";

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem(
        USER_JWT_TOKEN,
        JSON.stringify(action.payload.token)
      );
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem(USER_JWT_TOKEN);
    },
  },
});

export default authSlice;
