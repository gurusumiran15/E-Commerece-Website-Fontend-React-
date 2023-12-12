import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { actions } from "../../store";
import { ReactComponent as CartIcon } from "../../assets/svg/cart-shopping-solid.svg";
import { ReactComponent as TruckIcon } from "../../assets/svg/truck-solid.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svg/user-solid.svg";
import WarningModal from "../modals/WarningModal";
import styles from "./Menu.module.css";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const promptForLogin = () => dispatch(actions.loginModalActions.open());

  if (!auth.isLoggedIn)
    return (
      <li className="nav-item">
        <div
          className={`btn btn-dark bold ${styles["btn-header"]}`}
          onClick={promptForLogin}
        >
          <ProfileIcon
            style={{
              width: "20px",
              height: "20px",
              fill: "white",
              marginRight: "8px",
            }}
          />
          Login
        </div>
      </li>
    );

  return (
    <>
      <li className="nav-item">
        <button
          className={`btn btn-dark bold ${styles["btn-header"]}`}
          onClick={() => navigate("/cart")}
        >
          <CartIcon
            style={{
              width: "20px",
              height: "20px",
              fill: "white",
              marginRight: "8px",
            }}
          />
          Cart
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`btn btn-dark bold ${styles["btn-header"]}`}
          onClick={() => navigate("/orders")}
        >
          <TruckIcon
            style={{
              width: "20px",
              height: "20px",
              fill: "white",
              marginRight: "8px",
            }}
          />
          Orders
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`btn btn-dark bold ${styles["btn-header"]}`}
          onClick={() => setIsWarningOpen(true)}
        >
          <ProfileIcon
            style={{
              width: "20px",
              height: "20px",
              fill: "white",
              marginRight: "8px",
            }}
          />
          Logout
        </button>
      </li>
      <WarningModal
        isOpen={isWarningOpen}
        title="Logout"
        message="Are you sure you want to logout?"
        onCancel={() => setIsWarningOpen(false)}
        onConfirm={() => {
          dispatch(actions.authActions.logout());
          setIsWarningOpen(false);
        }}
      />
    </>
  );
}
