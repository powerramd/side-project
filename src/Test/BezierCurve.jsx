import React, { useState, useEffect } from "react";

const BezierCurve = () => {
  const [curvePoints, setCurvePoints] = useState([]);
  const P0 = { x: 229, y: 89 };
  const P1 = { x: 180.5, y: 84 };
  const P2 = { x: 209, y: 1 };
  const P3 = { x: 137.5, y: 1 };
  const d = `M${P0.x} ${P0.y} C${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`;

  // 計算貝塞爾曲線上的點
  const calculateCurvePoints = () => {
    const points = [];
    const numPoints = 10; // 可以根據需要調整採樣點的數量

    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const x = Math.pow(1 - t, 3) * P0.x + 3 * Math.pow(1 - t, 2) * t * P1.x + 3 * (1 - t) * Math.pow(t, 2) * P2.x + Math.pow(t, 3) * P3.x;
      const y = Math.pow(1 - t, 3) * P0.y + 3 * Math.pow(1 - t, 2) * t * P1.y + 3 * (1 - t) * Math.pow(t, 2) * P2.y + Math.pow(t, 3) * P3.y;
      points.push({ x, y });
    }

    return points;
  };

  useEffect(() => {
    const points = calculateCurvePoints();
    setCurvePoints(points);
  }, []);

  return (
    <svg width="300" height="150" viewBox="0 0 300 150">
      {/* 繪製貝塞爾曲線 */}
      <path d={d} fill="none" stroke="black" />

      {/* 繪製貝塞爾曲線上的點 */}
      {curvePoints.map((point, index) => (
        <circle key={index} cx={point.x} cy={point.y} r="2" fill="red" />
      ))}
    </svg>
    
  );
};

export default BezierCurve;

