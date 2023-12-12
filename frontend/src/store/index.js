import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import loginModalSlice from "./loginModalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    loginModal: loginModalSlice.reducer,
  },
});

export const actions = {
  authActions: authSlice.actions,
  loginModalActions: loginModalSlice.actions,
};
