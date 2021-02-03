import React, { useState, useEffect } from "react";
import { FiX, FiSave, FiChevronsLeft, FiChevronsDown } from "react-icons/fi";
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
            const name = document.querySelector("#post-name_" + m.id)?.value;
            return name || m.id;
          })
        );
      }, 1500);
    inter();
  }, []);
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          window.onload();
          document.leaflet();
          setRender(true);
        }}
      >
        Posicionar Postos
      </button>
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
            style={{
              width: minimize ? "60px" : "400px",
              minHeight: "400px",
              borderRadius: minimize ? "0" : "8px",
              backgroundColor: "#393a3cf2",
              position: "absolute",
              outline: "none",
              top: minimize ? "80px" : "10px",
              left: minimize ? "0" : "60px",
              zIndex: render ? "100001" : "-100000",
              display: "flex",
              padding: "16px",
              flexDirection: "column",
              color: "#000",
              boxShadow: "#a1939382 5px 5px 24px;",
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
                NOVA CAMPANHA{" "}
                <FiChevronsDown
                  size={32}
                  style={{ marginTop: "-4px" }}
                  onClick={() => setMinimize(false)}
                />
              </h4>
            </div>
            <div style={{ display: minimize ? "none" : "" }}>
              <h4
                style={{
                  marginTop: "16px",
                  marginBottom: "8px",
                  color: "#fff",
                  fontWeight: "900"
                }}
                className="heading heading-light d-flex justify-content-between"
              >
                NOVA CAMPANHA{" "}
                <FiChevronsLeft
                  size={32}
                  style={{ marginTop: "-4px" }}
                  onClick={() => setMinimize(true)}
                />
              </h4>
              <hr style={{ borderTopColor: "#fff" }} />
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
                  <label>Postos</label>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between"
                    }}
                  >
                    {posts.map(p => (
                      <span
                        className="badge bg-secondary mb-1"
                        style={{ width: "150px" }}
                      >
                        {p} <FiX />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div />
              <button
                style={{
                  outline: "none",
                  backgroundColor: "#198754"
                }}
                className="btn btn-success"
              >
                <FiSave color="#fff" /> Salvar nova campanha
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Map;
