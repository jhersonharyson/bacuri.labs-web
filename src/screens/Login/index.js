import React, { useState } from "react";
import { Container } from "./styles";
import AuthService from "../../services/AuthService";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    AuthService.login(username, password);
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

          <button type="submit">Login</button>
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
