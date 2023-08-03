import { useRef, useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import PermMediaIcon from "@mui/icons-material/PermMedia";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate(); //important hooks
  const [file, setFile] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else {
      let user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        user.profilePicture = fileName;
        try {
          await axios.post("/upload", data);
        } catch (error) {
          console.log(error);
        }
      }
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
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
              placeholder="Username"
              required
              ref={username}
              className="login-input"
            />
            <input
              placeholder="Email"
              required
              type="email"
              ref={email}
              className="login-input"
            />
            <input
              placeholder="Password"
              required
              type="password"
              ref={password}
              className="login-input"
              minLength={6}
            />
            <input
              placeholder="Confirm Password"
              required
              type="password"
              ref={passwordAgain}
              className="login-input"
            />
            <label htmlFor="file" className="share-option">
              <PermMediaIcon htmlColor="tomato" className="share-icon" />
              <span className="share-option-text">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {file && (
              <div className="share-image-container">
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="share-image"
                />
                <CancelIcon
                  className="share-cancel-image"
                  onClick={() => setFile(null)}
                />
              </div>
            )}
            <button className="login-button" type="submit">
              Sign Up
            </button>
          </form>
          <div className="log-in">
            <span className="log-in-text">Already User? </span>
            <Link to="/login">
              <button className="login-register-button">
                Log into Your Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
