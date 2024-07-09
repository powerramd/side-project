import React, { useState, useEffect, useRef } from "react";

function CursorFollow({ propsSetcursorEliminateSwitch }) {
  //會跟隨鼠標的 紅點元素預設值
  const [defaultStyle, setDefaultStyle] = useState({ width: "40px", height: "40px", scale: 1 });
  // 初始化紅點位置為視窗左上角
  const [position, setPosition] = useState({ x: 0, y: 0 });
  //使用 useRef 來保存滑鼠軌跡
  const trail = useRef([]);
  //判斷鼠標與hader.js底部的距離用的
  const distance = position.y - 80;

  //紀錄滑鼠軌跡的函式-------------------------------------------------------------------------------------------------------
  useEffect(() => {
    function handleMouseMove(event) {
      const { clientX, clientY } = event; // 從事件對象中獲取滑鼠的客戶端坐標
      trail.current = [...trail.current, { x: clientX, y: clientY }].slice(-20); // 只保留最新的 20 個位置
    }

    // 設置滑鼠移動事件監聽器和定時器來更新位置
    window.addEventListener("mousemove", handleMouseMove);

    // 清理函數，在組件卸載時移除事件監聽器和定時器，以避免內存洩漏
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // 空依賴性陣列，確保 useEffect 只在組件掛載和卸載時執行

  //更新位置的函數---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    function updatePosition() {
      if (trail.current.length > 0) {
        const nextPosition = trail.current[0]; // 取得當前索引處的軌跡點作為下一個位置
        // console.log("----以下還沒刪除前----");
        // console.log(trail.current);
        trail.current = trail.current.slice(1); // 刪除已使用的軌跡點
        // console.log("----以下是刪除----");
        // console.log(trail.current);
        setPosition(nextPosition); // 更新紅點的位置為下一個軌跡點
        // console.log("----以下是更新----");
        // console.log(position);
      }
    }

    const intervalId = setInterval(updatePosition, 10); // 每 10 毫秒更新一次位置
    return () => {
      clearInterval(intervalId);
    };
  }, [trail]);

  //修改 scale 的值的函數
  /* eslint-disable-next-line no-unused-vars*/
  function updateScale(newScale) {
    setDefaultStyle((prevStyle) => ({
      ...prevStyle,
      scale: newScale,
    }));
  }

  // 計算與菜單層距離的函數-------------------------------------------------------------------------------
  useEffect(() => {
    function handleMenuInteraction() {
      //抓取hader.js的元素(綠色圓角)
      const menuLayer = document.querySelector(".menu-layer-bg");
      function calculateOutput(x) {
        const maxiDetectionRange = 26;
        if (x < maxiDetectionRange) {
          return maxiDetectionRange - x;
        } else {
          return 0;
        }
      }

      if (menuLayer) {
        // 根據距離調整特定的樣式或操作
        if (distance < -10 + parseInt(defaultStyle.width.substring(0, 2) / 2)) {
          menuLayer.style.backgroundColor = "black"; // 例如，改變菜單背景色.
        } else if (distance < -5 + parseInt(defaultStyle.width.substring(0, 2) / 2)) {
          menuLayer.style.backgroundColor = "red";
        } else if (distance < 2 + parseInt(defaultStyle.width.substring(0, 2) / 2)) {
          menuLayer.style.backgroundColor = "blue";
        } else {
          menuLayer.style.backgroundColor = ""; // 恢復原來的背景色
        }
      }
      console.log(`${distance}:` + calculateOutput(distance));
    }

    window.addEventListener("mousemove", handleMenuInteraction);
    return () => {
      window.removeEventListener("mousemove", handleMenuInteraction);
    };
  }, [position, defaultStyle, distance]);

  const circleStyle = {
    zIndex: "100000",
    position: "fixed",
    width: defaultStyle.width,
    height: defaultStyle.height,
    top: (parseInt(defaultStyle.width.substring(0, 2)) / 2) * -1,
    left: (parseInt(defaultStyle.height.substring(0, 2)) / 2) * -1,
    borderRadius: "50%",
    pointerEvents: "none",
    transition: "0.15s ease-out",
    transformOrigin: "center",
    transform: `matrix(${defaultStyle.scale}, 0, 0, ${defaultStyle.scale}, ${position.x}, ${position.y})`,
    backgroundColor: propsSetcursorEliminateSwitch,
  };

  // 渲染方法，返回一個可以跟隨滑鼠軌跡的紅點元素
  return (
    <>
      <p>{position.y - 80}</p>
      <div id="Cursor" style={circleStyle} />
    </>
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
// useEffect(() => {
//   function handleMenuInteraction() {
//     const menuLayer = document.querySelector(".menu-layer-bg");
//     if (menuLayer) {
//       const rect = menuLayer.getBoundingClientRect();
//       const centerX = rect.left + rect.width / 2;
//       const centerY = rect.top + rect.height / 2;

//       const distance = Math.sqrt(Math.pow(position.x - centerX, 2) + Math.pow(position.y - centerY, 2));
//       // 根據距離調整特定的樣式或操作
//       if (distance < 60) {
//         // 處理黏黏球效果
//         menuLayer.style.backgroundColor = "green"; // 例如，改變菜單背景色
//         // 其他相關操作...
//       } else {
//         menuLayer.style.backgroundColor = ""; // 恢復原來的背景色
//         // 其他相關操作...
//       }
//     }
//   }

//   window.addEventListener("mousemove", handleMenuInteraction);
//   return () => {
//     window.removeEventListener("mousemove", handleMenuInteraction);
//   };
// }, [position]);
