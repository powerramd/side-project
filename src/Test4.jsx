import React from "react";


function Test4() {
  return (
    <div style={{ display: "flex", height: "400em", backgroundColor: "gray",aligniItems: "center", flexDirection: "column" }}>
      {Array.from({ length: 10 }, (_, index) => (
          <div key={index} style={{textAlign:"center"}}>
          <span style={{ fontSize: "20em" }}>1234</span>
        </div>
      ))}
    </div>
  );
}

export default Test4;
