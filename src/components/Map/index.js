import React, { useState, useEffect } from "react";
import { FiX, FiSave, FiChevronsLeft, FiChevronsDown } from "react-icons/fi";

import Carousel from "../Carousel";

import "./styles.css";

export function Map(props) {
  const [render, setRender] = useState(false);
  const [posts, setPosts] = useState([]);
  const [minimize, setMinimize] = useState(false);
  const closeMapping = () => {
    setRender(false);
  };

  useEffect(() => {
    const inter = () =>
      setInterval(() => {
        const list = window.newMarker || [];
        setPosts(
          list.map(m => {
            const postName = document.querySelector("#post-name_" + m.id);
            const postVaccine = document.querySelector("#post-vaccine_" + m.id);
            let name = posts?.filter(p => p.id == m.id)[0]?.name;
            let vaccine = posts?.filter(p => p.id == m.id)[0]?.vaccine;

            if (postVaccine != null) {
              vaccine = postVaccine.value;
            }

            if (postName != null) {
              name = postName.value;
            }

            return { name, id: m.id, vaccine };
          })
        );
      }, 1500);
    inter();
  }, []);
  return (
    <>
      <div className="col ml-0 pl-0" style={{ width: "100%" }}>
        <div className="row fluid header">
          <div className="label">
            <span>Campanhas</span>
            <div className="d-flex justify-content-between" style={{ flex: 1 }}>
              <h2>Campanhas de vacinação</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.onload();
                  document.leaflet();
                  setRender(true);
                }}
              >
                Criar uma nova campanha
              </button>
            </div>
          </div>
        </div>
        <div className="divider" />
        <Carousel />
      </div>
      <div
        id="map-canvas"
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          outline: "none",
          top: "0",
          left: render ? "0" : "100vw",
          zIndex: render ? "100000" : "-100000"
        }}
      />
      {render && (
        <div>
          <button
            onClick={closeMapping}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "60px",
              backgroundColor: "#fff",
              position: "absolute",
              outline: "none",
              top: "10px",
              right: "10px",
              zIndex: render ? "100001" : "-100000"
            }}
            className="d-flex justify-content-center align-items-center btn"
          >
            <FiX size={48} color="#3f51b5" />
          </button>

          <div
            className={minimize ? "0" : "card"}
            style={{
              width: minimize ? "45px" : "400px",
              minHeight: minimize ? "100vh" : "400px",
              borderRadius: minimize && "0",
              backgroundColor: minimize ? "#393a3c" : "#393a3cf2",
              position: "absolute",
              outline: "none",
              top: minimize ? "0" : "10px",
              left: minimize ? "0" : "60px",
              zIndex: render ? "100001" : "-100000",
              display: "flex",
              paddingLeft: minimize && "24px",
              marginTop: minimize && "-24px",
              flexDirection: "column",
              color: "#000",
              boxShadow: "#a19393 5px 5px 24px;",
              transition: "1s"
            }}
          >
            <div style={{ display: !minimize ? "none" : "" }}>
              <h4
                style={{
                  color: "#fff",
                  fontWeight: "900",
                  transform: "rotate(-90deg) translateX(-159px)",
                  width: "max-content",
                  marginLeft: "-123px"
                }}
                className="heading heading-light d-flex justify-content-between"
              >
                <span className="highlight">NOVA</span> CAMPANHA{" "}
                <FiChevronsDown
                  size={32}
                  style={{ marginTop: "-4px" }}
                  onClick={() => setMinimize(false)}
                />
              </h4>
            </div>
            <div
              style={{
                display: minimize ? "none" : "flex",
                height: "100%",
                flexDirection: "column",
                flex: 1
              }}
            >
              <h4
                style={{
                  marginTop: "16px",
                  marginBottom: "8px",
                  color: "#fff",
                  fontWeight: "900"
                }}
                className="heading heading-light d-flex justify-content-between"
              >
                <span>
                  <span className="highlight">NOVA</span> CAMPANHA{" "}
                </span>
                <FiChevronsLeft
                  size={32}
                  style={{ marginTop: "-4px" }}
                  onClick={() => setMinimize(true)}
                />
              </h4>
              <hr style={{ borderTopColor: "#fff" }} />
              <div
                className="d-flex col justify-content-between"
                style={{ height: "100%" }}
              >
                <div
                  className="d-flex col p-0 m-0 mt-2 mr-1"
                  style={{ color: "#fff" }}
                >
                  <label>Camapnha</label>
                  <input
                    placeholder="Nome da campanha"
                    className="form-control"
                    style={{
                      width: "auto",
                      height: "15px",
                      backgroundColor: "#fff",
                      color: "#000"
                    }}
                  />

                  <div className="d-flex" style={{ color: "#fff" }}>
                    <div className="d-flex col-4 col p-0 m-0 mt-2 mr-1">
                      <label>Início</label>
                      <input
                        placeholder="Nome da campanha"
                        className="form-control"
                        style={{
                          height: "15px",
                          width: "auto",
                          backgroundColor: "#fff",
                          color: "#000"
                        }}
                        type="date"
                      />
                    </div>

                    <div className="d-flex col-4 col p-0 m-0 mt-2 ml-1">
                      <label>Fim</label>
                      <input
                        placeholder="Nome da campanha"
                        className="form-control"
                        style={{
                          height: "15px",
                          width: "auto",
                          backgroundColor: "#fff",
                          color: "#000"
                        }}
                        type="date"
                      />
                    </div>
                  </div>

                  <div className="d-flex col m-0 p-0 mt-2">
                    <label>Imagem da campanha</label>
                    <input type="file" style={{ color: "#fff" }} />
                  </div>

                  {posts.length > 0 && (
                    <div className="d-flex col m-0 p-0 mt-2">
                      <label>Postos</label>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap"
                          // justifyContent: "space-between"
                        }}
                      >
                        {/* posts.map(p => (
                      <span
                        className="badge bg-secondary mb-1"
                        style={{ width: "49%" }}
                      >
                        {p.name + " - " + p.id} <FiX />
                      </span>
                    )) */}
                        <strong
                          className="mr-3"
                          style={{ fontWeight: "bolder" }}
                        >
                          {posts.length}
                        </strong>{" "}
                        postos adicionados a campanha
                      </div>
                    </div>
                  )}
                </div>

                <div className="d-flex">
                  <button
                    style={{
                      outline: "none",
                      backgroundColor: "#198754",
                      marginTop: "16px",
                      width: "100%"
                    }}
                    className="btn btn-success btn-block"
                  >
                    <FiSave color="#fff" /> Salvar nova campanha
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Map;
