import React, { useState, useEffect, useRef } from "react";

function CursorTrail({ setcursorEliminateSwitch }) {
  //獲取當前URL的位置，useLocation()是react-router-dom的一個hook，包括 pathname、search、hash、state 等屬性。

  const [position, setPosition] = useState({ x: -80, y: -80 }); // 初始化紅點位置為視窗左上角

  const trail = useRef([]); // 使用 useRef 來保存滑鼠軌跡

  useEffect(() => {
    function handleMouseMove(event) {
      const { clientX, clientY } = event; // 從事件對象中獲取滑鼠的客戶端坐標
      trail.current = [...trail.current, { x: clientX, y: clientY }].slice(-2000); // 只保留最新的 2000 個位置
    }

    // 更新位置的函數
    function updatePosition() {
      if (trail.current.length > 0) {
        const nextPosition = trail.current[0]; // 取用第一個位置
        trail.current = trail.current.slice(1); // 刪除已使用的軌跡點
        setPosition(nextPosition); // 更新紅點的位置為下一個軌跡點
      }
    }

    // 設置滑鼠移動事件監聽器和定時器來更新位置
    window.addEventListener("mousemove", handleMouseMove);
    const intervalId = setInterval(updatePosition, 10); // 每 16 毫秒更新一次位置

    // 清理函數，在組件卸載時移除事件監聽器和定時器，以避免內存洩漏
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(intervalId);
    };
  }, []); // 空依賴性陣列，確保 useEffect 只在組件掛載和卸載時執行

  // 渲染方法，返回一個可以跟隨滑鼠軌跡的紅點元素
  return <div className="Cursor" style={{ transform: `translate3D(${position.x - 18}px, ${position.y - 98}px, 0)`, backgroundColor: setcursorEliminateSwitch }} />;
}

export default CursorTrail;
