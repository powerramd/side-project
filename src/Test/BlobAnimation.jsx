import React, { useState, useEffect, useRef } from "react";

const BlobAnimation = () => {
  const svgRef = useRef(null);
  const x1 = (100);
  const y1 = (200);
  const [x2, setX2] = useState(300);
  const [y2, setY2] = useState(200);

  const createCirclePath = (cx, cy, radius) => {
    return `M ${cx - radius},${cy} a ${radius},${radius} 0 1,0 ${radius * 2},0 a ${radius},${radius} 0 1,0 -${radius * 2},0`;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = svgRef.current.getBoundingClientRect();
      setX2(e.clientX - rect.left);
      setY2(e.clientY - rect.top);
    };

    const svgElement = svgRef.current;
    svgElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      svgElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updatePaths = () => {
      const blob1 = document.getElementById("blob1");
      const blob2 = document.getElementById("blob2");
      const distance = Math.hypot(x2 - x1, y2 - y1);
      const maxDistance = 150; // 開始變形的最大距離

      if (distance < maxDistance) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const interpFactor = 1 - distance / maxDistance;

        const controlX1 = x1 + (midX - x1) * interpFactor;
        const controlY1 = y1 + (midY - y1) * interpFactor;
        const controlX2 = x2 + (midX - x2) * interpFactor;
        const controlY2 = y2 + (midY - y2) * interpFactor;

        blob1.setAttribute("d", `${createCirclePath(x1, y1, 50)} Q ${controlX1},${controlY1} ${midX},${midY}`);
        blob2.setAttribute("d", `${createCirclePath(x2, y2, 50)} Q ${controlX2},${controlY2} ${midX},${midY}`);
      } else {
        blob1.setAttribute("d", createCirclePath(x1, y1, 50));
        blob2.setAttribute("d", createCirclePath(x2, y2, 50));
      }
    };
    updatePaths();
  }, [x2, y2]);

  return (
    <svg ref={svgRef} width="400" height="400" viewBox="0 0 400 400">
      <path id="blob1" fill="rgba(0, 0, 255, 0.5)" />
      <path id="blob2" fill="rgba(255, 0, 0, 0.5)" />
    </svg>
  );
};

export default BlobAnimation;
