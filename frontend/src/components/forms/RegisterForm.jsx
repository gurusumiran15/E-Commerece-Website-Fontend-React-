import { useState } from "react";

import { registerUser } from "../../fetch/index";
import { actions } from "../../store";
import Input from "./Input";

export default function RegisterForm(props) {
  const { dispatch, onClose, setIsLogin } = props;

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const showLogin = () => setIsLogin(true);
  const onChange = (e) => {
    setValues((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword)
      return setErrors({
        password: "Passwords must match!",
        confirmPassword: "Passwords must match!",
      });
    registerUser(values)
      .then((res) => {
        dispatch(actions.authActions.login(res));
        setIsLogin(true);
        onClose();
      })
      .catch((error) => {
        if (!error.props) {
          alert("Cannot connect to server");
          onClose();
        }
        setErrors(error.props);
      });
  };

  return (
    <div className={"card"} style={{ width: "400px" }}>
      <div className="card-body">
        <h3 className="card-title">Register</h3>
        <hr />
        <form onSubmit={onSubmit}>
          <Input
            name="username"
            label="Username"
            type="text"
            value={values.username}
            error={errors.username}
            onChange={onChange}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            value={values.email}
            error={errors.email}
            onChange={onChange}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={values.password}
            error={errors.password}
            onChange={onChange}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={values.confirmPassword}
            error={errors.confirmPassword}
            onChange={onChange}
          />
          <div className="d-flex justify-content-end mb-5">
            <button className="btn btn-light" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-dark" type="submit">
              Confirm
            </button>
          </div>
        </form>
        <p>
          Already have an account?{" "}
          <span className="highlight-link" onClick={showLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
