import React from "react";

function Test3() {
  return (
    <div style={{ display: "flex", height: "400em", backgroundColor: "aquamarine", aligniItems: "center", flexDirection: "column" }}>
      {Array.from({ length: 10 }, (_, index) => (
        <div key={index} style={{ textAlign: "center" }}>
          <span style={{ fontSize: "20em" }}>1234</span>
        </div>
      ))}
    </div>
  );
}

export default Test3;
