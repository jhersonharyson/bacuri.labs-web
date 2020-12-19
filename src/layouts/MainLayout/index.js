import React from "react";

import { Container, Dropdown, DropdownMenu, DropdownButton } from "./styles.js";

const MainLayout = ({ children: Content }) => {
  const onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Container>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top p-1 mr-0">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <h4 className="mb-0">
              Bacuri<span className="highlight">Labs</span>
            </h4>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto mb-2 mb-md-0">
              <li className="nav-item active">
                <a className="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
            <form className="d-flex" onSubmit={onSubmit}>
              <input
                className="form-control mr-2 btn-sm"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success btn-sm" type="submit">
                Search
              </button>
            </form>

            <Dropdown className="ml-2">
              <DropdownButton className="btn-outline-primary">
                JH
              </DropdownButton>
              <DropdownMenu className="dropdown-menu">
                <li>
                  <p className="text-center">Olá J. Haryson</p>
                  <hr />
                </li>
                <li>
                  <button className="dropdown-item">Profile</button>
                </li>
                <li>
                  <button className="dropdown-item">Exit</button>
                </li>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </nav>
      <main className="container mt-4">{Content}</main>
      <footer>
        <div className="container text-center">
          Designed with love by J. Haryson && D. Duarte
        </div>
      </footer>
    </Container>
  );
};

export default MainLayout;
