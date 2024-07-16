import React, { useState, useEffect, useRef } from "react";

const BezierMotion = () => {
  const canvasRef = useRef(null);
  const [time, setTime] = useState(0);

  // 計算貝茲曲線上的點
  const cubicBezier = (t, p0, p1, p2, p3) => {
    const cx = 3 * (p1.x - p0.x);
    const bx = 3 * (p2.x - p1.x) - cx;
    const ax = p3.x - p0.x - cx - bx;

    const cy = 3 * (p1.y - p0.y);
    const by = 3 * (p2.y - p1.y) - cy;
    const ay = p3.y - p0.y - cy - by;

    const x = ax * t ** 3 + bx * t ** 2 + cx * t + p0.x;
    const y = ay * t ** 3 + by * t ** 2 + cy * t + p0.y;

    return { x, y };
  };

  useEffect(() => {
    // 貝茲曲線控制點
    const p0 = { x: 50, y: 200 };
    const p1 = { x: 150, y: 50 };
    const p2 = { x: 250, y: 350 };
    const p3 = { x: 350, y: 200 };
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 繪製控制點
      ctx.fillStyle = "blue";
      [p0, p1, p2, p3].forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });

      // 繪製控制線
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.stroke();

      // 繪製貝茲曲線
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      for (let t = 0; t <= 1; t += 0.01) {
        const point = cubicBezier(t, p0, p1, p2, p3);
        ctx.lineTo(point.x, point.y);
      }
      ctx.stroke();

      // 繪製移動的物體
      const currentPoint = cubicBezier(time, p0, p1, p2, p3);
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(currentPoint.x, currentPoint.y, 8, 0, 2 * Math.PI);
      ctx.fill();

      setTime((prevTime) => (prevTime + 0.005) % 1);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [time]);

  return (
    <>
      <canvas ref={canvasRef} width={400} height={400} />
    </>
  );
};
export default BezierMotion;
