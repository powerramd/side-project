import { useState, useEffect } from "react";

function Test4() {
  const [forTest, setFotTest] = useState("null");
  //會跟隨鼠標的svg預設座標
  const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });
  //判斷鼠標與hader.js底部的距離用的
  const [distance, setSdistance] = useState(0);
  //svg標點顏色
  const colors = [
    "rgba(255, 87, 51, 0.3)",
    "rgba(255, 195, 0, 0.3)",
    "rgba(54, 219, 202, 0.3)",
    "rgba(92, 51, 255, 0.3)",
    "rgba(255, 51, 94, 0.3)",
    "rgba(125, 255, 51, 0.3)",
    "rgba(255, 51, 195, 0.3)",
    "rgba(51, 255, 87, 0.3)",
    "rgba(51, 68, 255, 0.3)",
    "rgba(255, 51, 139, 0.3)",
    "rgba(255, 233, 51, 0.3)",
    "rgba(51, 255, 166, 0.3)",
  ];
  //svg控制點
  const [controlPoints, setControlPoints] = useState({
    P12: { x: 49, y: 10.969 },
    P1: { x: 49, y: 24.5 },
    P2: { x: 49, y: 38.031 },

    P3: { x: 38.031, y: 49 },
    P4: { x: 24.5, y: 49 },
    P5: { x: 10.969, y: 49 },

    P6: { x: 0, y: 38.031 },
    P7: { x: 0, y: 24.5 },
    P8: { x: 0, y: 10.969 },

    P9: { x: 10.969, y: 0 },
    P10: { x: 24.5, y: 0 },
    P11: { x: 38.031, y: 0 },
  });
  //用來動態控制svg
  const d = `
    M${controlPoints.P1.x} ${controlPoints.P1.y}
    C${controlPoints.P2.x} ${controlPoints.P2.y}
     ${controlPoints.P3.x} ${controlPoints.P3.y}
     ${controlPoints.P4.x} ${controlPoints.P4.y}
     ${controlPoints.P5.x} ${controlPoints.P5.y}
     ${controlPoints.P6.x} ${controlPoints.P6.y}
     ${controlPoints.P7.x} ${controlPoints.P7.y}
     ${controlPoints.P8.x} ${controlPoints.P8.y}
     ${controlPoints.P9.x} ${controlPoints.P9.y}
     ${controlPoints.P10.x} ${controlPoints.P10.y}
     ${controlPoints.P11.x} ${controlPoints.P11.y}
     ${controlPoints.P12.x} ${controlPoints.P12.y}
     ${controlPoints.P1.x} ${controlPoints.P1.y}
    Z`;
  /*用來方便測試的按鈕事件
  function test() {
    console.log(d);
  }*/

  useEffect(() => {
    const defaultContropoints = {
      P12: { x: 49, y: 10.969 },
      P1: { x: 49, y: 24.5 },
      P2: { x: 49, y: 38.031 },

      P3: { x: 38.031, y: 49 },
      P4: { x: 24.5, y: 49 },
      P5: { x: 10.969, y: 49 },

      P6: { x: 0, y: 38.031 },
      P7: { x: 0, y: 24.5 },
      P8: { x: 0, y: 10.969 },

      P9: { x: 10.969, y: 0 },
      P10: { x: 24.5, y: 0 },
      P11: { x: 38.031, y: 0 },
    };
    function handleMouseMove(event) {
      // 從事件對象中獲取滑鼠的座標
      const { clientX, clientY } = event;
      //讓svg可以跟著滑鼠移動
      setSvgPosition({ x: clientX, y: clientY });
      //用來計算與y=80垂直距離
      setSdistance(svgPosition.y - 80);
      //抓取hader.js的元素(綠色圓角)
      if (distance < 0) {
        updatecontrolPoints(calculateOutput(distance));
      } else if (distance < 40) {
        updatecontrolPoints(calculateOutput(distance));
      } else if (distance < 81) {
        updatecontrolPoints(calculateOutput(distance));
      } else {
        updatecontrolPoints(0);
      }
    }

    //如果距離小於80就回傳從0開始遞增的數字
    function calculateOutput(x) {
      const maxiDetectionRange = 80;
      if (x < maxiDetectionRange) {
        return maxiDetectionRange - x;
      } else {
        return 0;
      }
    }

    //用來更新控制點的函數
    function updatecontrolPoints(variable) {
      setControlPoints((prevState) => ({
        ...prevState,
        P12: { x: 49, y: 11 },
        P1: { x: 49, y: 24.5 },
        P2: { x: 49, y: 38.031 },

        P3: { x: 38.031, y: 49 },
        P4: { x: 24.5, y: 49 },
        P5: { x: 10.969, y: 49 },

        P6: { x: 0, y: 38.031 },
        P7: { x: 0, y: 24.5 },
        P8: { x: 0, y: 10.969 },

        P9: { x: 10.969, y: 0 },
        P10: { x: 24.5, y: (defaultContropoints.P10.y + variable) * -1 },
        P11: { x: 38.031, y: 0 },
      }));
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mosemove", handleMouseMove);
    };
  }, [distance, svgPosition]);

  /*測試改變 SVG 控制點的函數
  useEffect(() => {
    const interval = setInterval(() => {
      setControlPoints((prevState) => ({
        ...prevState,
        // P12: { x: 49, y: 11 },
        // P1: { x: 49, y: 25 },
        // P2: { x: 49, y: 38 },

        // P3: { x: 38, y: 49 },
        // P4: { x: 24.5, y: 49 },
        // P5: { x: 11, y: 49 },

        // P6: { x: 0, y: 38 },
        // P7: { x: 0, y: 25 },
        // P8: { x: 0, y: 11 },

        // P9: { x: 11, y: -9 },
        // P10: { x: 24.5, y: -19 },
        // P11: { x: 38, y: -9 },
        // 修改這裡的控制點座標
        P12: { x: 57.5, y: -19 },
        P1: { x: 68.5, y: -19 },
        P2: { x: 46.5, y: -19 },

        P3: { x: 38, y: 49 },
        P4: { x: 24.5, y: 49 },
        P5: { x: 11, y: 49 },

        P6: { x: -8.5, y: -19 },
        P7: { x: -20, y: -19 },
        P8: { x: 2.5, y: -19 },

        P9: { x: 13.5, y: -19 },
        P10: { x: 24.5, y: -19 },
        P11: { x: 35.5, y: -19 },
      }));
    }, 1000); // 設定間隔時間為1000毫秒 (即每秒執行一次)

    // 清除定時器的效果

    return () => clearInterval(interval);
  }, []); // 空依賴表示只在組件挂載時執行一次*/

  const svgStyle = {
    display: "flex",
    zIndex: "1000",
    position: "absolute",
    transform: `matrix(1, 0, 0, 1, ${svgPosition.x}, ${svgPosition.y})`,
    top: "-75",
    left: "-50",
    pointerEvents: "none",
    // backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  };
  const pathStyle = {
    transformBox: "fill-box",
    transformOrigin: "center",
  };

  return (
    <>
      <h1>{forTest}</h1>
      {/*<button style={{ width: "20px", height: "5px" }} onClick={test}></button>*/}
      <svg style={svgStyle} width="100" height="100" viewBox="-25,-50,100,100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill="#D9D9D9" style={pathStyle} />

        {Object.keys(controlPoints).map((key, index) => (
          <g key={index} tyle={pathStyle}>
            <circle cx={controlPoints[key].x} cy={controlPoints[key].y} r="3" fill={colors[index % colors.length]} />
            <text x={controlPoints[key].x + 5} y={controlPoints[key].y - 5} fontSize="10" fill="black">
              {key}
            </text>
          </g>
        ))}
      </svg>
    </>
  );
}

export default Test4;
