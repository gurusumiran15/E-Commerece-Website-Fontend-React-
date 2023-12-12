import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./Modal";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import { actions } from "../../store";

export default function FormModal() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.loginModal.isOpen);
  const onClose = () => dispatch(actions.loginModalActions.close());

  return (
    <Modal isOpen={isOpen}>
      {isLogin ? (
        <LoginForm
          dispatch={dispatch}
          onClose={onClose}
          setIsLogin={setIsLogin}
        />
      ) : (
        <RegisterForm
          dispatch={dispatch}
          onClose={onClose}
          setIsLogin={setIsLogin}
        />
      )}
    </Modal>
  );
}
