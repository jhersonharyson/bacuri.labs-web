import React, { useState, useEffect } from "react";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import { Link } from "react-router-dom";
import { Container, Dropdown, DropdownMenu, DropdownButton } from "./styles.js";

const MainLayout = ({ children: Content }) => {
  const [username, setUsername] = useState("##");
  const [shortUsername, setShortUsername] = useState("##");
  const [registrationNumber, setRegistrationNumber] = useState("##");
  const onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  const logout = () => {
    AuthService.logout();
  };

  useEffect(() => {
    const { firstName, lastName, id } = UserService.getUser();
    setUsername(`${firstName[0]}. ${lastName}`);
    setShortUsername(`${firstName[0]}.${lastName[0]}`.toUpperCase());
    setRegistrationNumber(id);
  }, []);
  return (
    <Container
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "100%"
      }}
    >
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
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{ color: "#fff", fontWeight: "bolder" }}
                  aria-current="page"
                  to="/apply"
                >
                  Vacinas
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{ color: "#fff", fontWeight: "bolder" }}
                  to="/campaign"
                >
                  Campanhas
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{ color: "#fff", fontWeight: "bolder" }}
                  to="/history"
                >
                  Históricos
                </Link>
              </li>
            </ul>
            <div className="btn btn-outline-light mr-3">
              Matrícula #{registrationNumber}
            </div>
            <form className="d-flex" onSubmit={onSubmit}>
              <input
                className="form-control mr-2 btn-sm"
                type="search"
                placeholder="Busque por todo o site"
                aria-label="Search"
              />
              <button className="btn btn-outline-success btn-sm" type="submit">
                Encontrar
              </button>
            </form>

            <Dropdown className="ml-2">
              <DropdownButton className="btn-outline-primary">
                {shortUsername}
              </DropdownButton>
              <DropdownMenu className="dropdown-menu">
                <li>
                  <p className="text-center">Olá {username}</p>
                  <hr />
                </li>
                <li>
                  <button className="dropdown-item">Perfil</button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Sair
                  </button>
                </li>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </nav>
      <main
        id="content"
        className="container mt-4"
        style={{ display: "flex", flex: 1, overflow: "unset" }}
      >
        {Content}
      </main>
      <footer style={{ display: "flex" }}>
        <div className="container text-center d-flex justify-content-center">
          Designed with love by <strong className="mx-1">J. Haryson</strong> &&{" "}
          <strong className="mx-1">D. Duarte</strong>
        </div>
      </footer>
    </Container>
  );
};

export default MainLayout;
