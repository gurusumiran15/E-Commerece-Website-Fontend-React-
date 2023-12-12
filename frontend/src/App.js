import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Section from "./pages/Section";
import Error from "./pages/Error";
import Header from "./components/header/Header";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Search from "./pages/Search";
import LoginModal from "./components/modals/FormModal";
import { useEffect } from "react";
import { validateUser } from "./fetch/index";
import authSlice, { USER_JWT_TOKEN } from "./store/authSlice";

export default function App() {
  const token = JSON.parse(localStorage.getItem(USER_JWT_TOKEN));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) return;
    validateUser(token)
      .then((res) => dispatch(authSlice.actions.login(res)))
      .catch((err) => dispatch(authSlice.actions.logout()));
  }, [token, dispatch]);

  return (
    <div id="App">
      <LoginModal />
      <Header />
      <div id="outer-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:categoryId" element={<Category />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/products/search" element={<Search />} />
          <Route path="/sections/:sectionId" element={<Section />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}
