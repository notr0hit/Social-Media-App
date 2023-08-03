import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">Social Media</h3>
          <span className="login-desc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              className="login-input"
              required
              ref={email}
            />
            <input
              placeholder="password"
              type="password"
              className="login-input"
              required
              minLength={6}
              ref={password}
            />
            <button
              className="login-button"
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? "Loading" : "Log In"}
            </button>
          </form>
          <div className="sign-up">
            <span class="sign-up-text">Not a User?</span>
            <Link to="/register">
              <button className="login-register-button">
                Create a New Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
