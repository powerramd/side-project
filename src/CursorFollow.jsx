import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from "react";
import { CursorContext } from "./CursorContext";
import { useLocation } from "react-router-dom";

function CursorFollow({ props }) {
  //獲取當前URL的位置，useLocation()是react-router-dom的一個hook，包括 pathname、search、hash、state 等屬性。
  const location = useLocation();
  //這個是可以共享的狀態
  const { state, dispatch } = useContext(CursorContext);
  //這個是拿來使用的共享狀態
  const { position, leftPosition, defaultStyle, filter, alpha } = state;

  const trail = useRef([]);
  //將容器置中到headr.jsx----------------------------------------------------------------------------------------------------
  const cursorContainerRef = useRef(null);
  const [cursorContainerWidth, setcursorContainerWidth] = useState(0);
  // const [leftPosition, setLeftPosition] = useState(0);

  // 当header.js的container因為畫面大小改變時重新計算
  useEffect(() => {
    const calculateCenterPosition = () => {
      if (cursorContainerRef.current) {
        setcursorContainerWidth(cursorContainerRef.current.offsetWidth);
        dispatch({ type: "SET_LEFT_POSITION", payload: (props.memenuContainerWidth - cursorContainerWidth) / 2 });
      }
    };
    calculateCenterPosition();
  }, [props.memenuContainerWidth, dispatch, cursorContainerWidth]);

  //紀錄滑鼠軌跡的函式-------------------------------------------------------------------------------------------------------
  useEffect(() => {
    function handleMouseMove(event) {
      const { clientX, clientY } = event; // 從事件對象中獲取滑鼠的客戶端坐標
      trail.current = [...trail.current, { x: clientX, y: clientY }].slice(-50); // 只保留最新的 200 個位置
      localStorage.setItem("x", clientX);
      localStorage.setItem("y", clientY);
    }

    // 設置滑鼠移動事件監聽器和定時器來更新位置
    window.addEventListener("mousemove", handleMouseMove);

    // 清理函數，在組件卸載時移除事件監聽器和定時器，以避免內存洩漏
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // 空依賴性陣列，確保 useEffect 只在組件掛載和卸載時執行

  //更新位置的函數-----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    function updatePosition() {
      if (trail.current.length > 0) {
        const nextPosition = trail.current[0]; // 取得當前索引處的軌跡點作為下一個位置
        trail.current = trail.current.slice(1); // 刪除已使用的軌跡點
        // setPosition(nextPosition); // 更新紅點的位置為下一個軌跡點
        dispatch({ type: "SET_POSITION", payload: nextPosition });
      }
    }

    const intervalId = setInterval(updatePosition, 10); // 每 10 毫秒更新一次位置
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]); // 空依賴性陣列，確保 useEffect 只在組件掛載和卸載時執行

  useLayoutEffect(() => {
    // 讀取儲存的滑鼠座標
    const storedMouseX = localStorage.getItem("x");
    const storedMouseY = localStorage.getItem("y");

    if (storedMouseX && storedMouseY) {
      dispatch({ type: "SET_POSITION", payload: { x: storedMouseX, y: storedMouseY } });
    }
  }, [dispatch, location.pathname]);

  //修改 scale 的值的函數----------------------------------------------------------------------------------------------------
  /* eslint-disable-next-line no-unused-vars*/
  function updateScale(newScale) {
    dispatch({ type: "SET_SCALE", payload: newScale });
  }

  //元素樣式設定-------------------------------------------------------------------------------------------------------------
  const CursorContainer = {
    zIndex: -1,
    left: leftPosition,
    width: props.memenuLayerBgWidth,
  };
  const circleStyle = {
    position: "fixed",
    width: defaultStyle.width,
    height: defaultStyle.height,
    top: `calc( -1*(var(--menu-height)/ 5) - ${parseInt(defaultStyle.height.substring(0, 2)) / 2}px)`,
    left: -leftPosition - parseInt(defaultStyle.width.substring(0, 2) / 2),
    borderRadius: "50%",
    transition: "0.15s ease-out",
    transformOrigin: "center",
    transform: `matrix(${defaultStyle.scale}, 0, 0, ${defaultStyle.scale}, ${position.x}, ${position.y})`,
    backgroundColor: `rgba(13, 43, 20, ${alpha})`,
  };
  const Fusion_target = {
    position: "absolute",
    width: props.memenuLayerBgWidth,
    height: "var(--menu-bg-height)",
    top: "0",
    left: "0",
    backgroundColor: "#0d2b14",
    visibility: "visible",
    borderRadius: "9999px",
  };

  // 渲染方法，返回一個可以跟隨滑鼠軌跡的紅點元素
  return (
    <div className="Cursor_container gooey" style={CursorContainer}>
      <div id="Cursor" style={circleStyle} />
      <div id="Fusion_target" style={Fusion_target} ref={cursorContainerRef}></div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id={filter}>
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
  );
}

export default CursorFollow;

// 測試區--------------------------------------------------------------------------------------------------

//const nextPosition = trail.current[trail.current.length - 1]; // 取得最後一個軌跡點作為下一個位置
//trail.current = trail.current.slice(1); // 刪除已使用的軌跡點
//console.log("這是取出", trail.current);
//setPosition(nextPosition); // 更新紅點的位置為下一個軌跡點

// 更新位置的函數，使用遞迴和setTimeout
// function updatePosition(index) {
//   if (index < trail.current.length) {
//     const nextPosition = trail.current[index];
//     setPosition(nextPosition);
//     setTimeout(() => {
//       updatePosition(index + 1);
//     }, 10); // 每隔500毫秒更新一次位置，可以調整間隔時間
//   }
// }
// updatePosition(0); // 初始調用更新位置的函數，從索引0開始

// let timer = 0; // 計時器
// clearTimeout(timer); // 每次鼠標移動時清除之前的計時器
// timer = setTimeout(() => {
//   trail.current = [];
// }, 1000); // 1000 毫秒（1 秒）後清空 trail.current

// 新增計算與菜單層距離的函數-------------------------------------------------------------------------------
//判斷鼠標與hader.js底部的距離用的
// const distance = position.y - 80;
// useEffect(() => {
//   function handleMenuInteraction() {
//     //抓取hader.js的元素(綠色圓角)
//     const menuLayer = document.querySelector(".menu-layer-bg");

//     if (menuLayer) {
//       // 根據距離調整特定的樣式或操作
//       if (distance < -10 + parseInt(defaultStyle.width.substring(0, 2) / 2)) {
//         menuLayer.style.backgroundColor = "black"; // 例如，改變菜單背景色.
//       } else if (distance < -5 + parseInt(defaultStyle.width.substring(0, 2) / 2)) {
//         menuLayer.style.backgroundColor = "red";
//       } else if (distance < 2 + parseInt(defaultStyle.width.substring(0, 2) / 2)) {
//         menuLayer.style.backgroundColor = "blue";
//       } else {
//         menuLayer.style.backgroundColor = ""; // 恢復原來的背景色
//       }
//     }
//     function calculateOutput(x) {
//       const maxiDetectionRange = 26;
//       if (x < maxiDetectionRange) {
//         return maxiDetectionRange - x;
//       } else {
//         return 0;
//       }
//     }
//     //console.log(`${distance}:` + calculateOutput(distance));
//   }

//   window.addEventListener("mousemove", handleMenuInteraction);
//   return () => {
//     window.removeEventListener("mousemove", handleMenuInteraction);
//   };
// }, [position, defaultStyle, distance]);
