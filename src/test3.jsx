import React from "react";
import Test4 from "./Test4";

function Test3() {
  return (
    <>
      <div className="container gooey">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -10"
                result="gooey"
              />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
      <Test4></Test4>
    </>
  );
}

export default Test3;
