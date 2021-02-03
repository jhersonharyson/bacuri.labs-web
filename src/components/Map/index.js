import React, { useState } from "react";
import { FiX } from "react-icons/fi";
export function Map(props) {
  const [render, setRender] = useState(false);
  const closeMapping = () => {
    setRender(false);
  };
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
        </div>
      )}
    </>
  );
}

export default Map;
