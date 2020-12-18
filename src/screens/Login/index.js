import React, { useState } from "react";
import { Container } from "./styles";
import AuthService from "../../services/AuthService";
import Loader from "../../components/Loader";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    await AuthService.login(username, password);
    setLoading(false);
  };

  return (
    <Container className="login-card" onSubmit={onSubmit}>
      <div className="login-card-content">
        <div className="header">
          <div className="logo">
            <img src="https://avatars3.githubusercontent.com/u/75508602?s=400&u=6071d1c4b2a756babe38948e5d165904c285072c&v=4" />
          </div>
          <h2>
            Bacuri<span className="highlight">Labs</span>
          </h2>
        </div>
        <div className="form">
          <div className="form-field username">
            <div className="icon">
              <i className="far fa-user" />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={event => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="form-field password">
            <div className="icon">
              <i className="fas fa-lock" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>

          {!loading && <button type="submit">Login</button>}
          {loading && (
            <div className="loader-button">
              <Loader />
            </div>
          )}
          <div>
            Don't have an account? <a href="">Sign Up Now</a>
          </div>
        </div>
      </div>
      <div className="login-card-footer">
        <a href="">Forgot password?</a>
      </div>
    </Container>
  );
};

export default Login;
