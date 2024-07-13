import React, { useState } from "react";


const Test = ({ children }) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <button className="ripple-button" onClick={createRipple}>Click me
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
};

export default Test;
