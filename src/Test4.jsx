import { useState, useEffect } from "react";


function Test4() {
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
  const [controlPoints, setControlPoints] = useState({
    P12: { x: 98, y: 21.938 },
    P1: { x: 98, y: 49 },
    P2: { x: 98, y: 76.062 },

    P3: { x: 76.062, y: 98 },
    P4: { x: 49, y: 98 },
    P5: { x: 21.938, y: 98 },
    
    P6: { x: 0, y: 76.062 },
    P7: { x: 0, y: 49 },
    P8: { x: 0, y: 21.938 },
    
    P9: { x: 21.938, y: 0 },
    P10: { x: 49, y: 0 },
    P11: { x: 76.062, y: 0 },
  });
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
  function test() {
    console.log(d);
  }

  // 測試改變 SVG 控制點的函數
  useEffect(() => {
    const interval = setInterval(() => {
      setControlPoints((prevState) => ({
        ...prevState, 
        // 修改這裡的控制點座標
        P12: { x: 115, y: -20 },
        P1: { x: 137, y: -20 },
        P2: { x: 93, y: -20 },

        P3: { x: 77, y: 44 },
        P4: { x: 49, y: 44 },
        P5: { x: 21, y: 44 },

        P6: { x: -17, y: -20 },
        P7: { x: -40, y: -20 },
        P8: { x: 5, y: -20 },

        P9: { x: 27, y: -20 },
        P10: { x: 49, y: -20 },
        P11: { x: 71, y: -20 }
      }));
    }, 1000); // 設定間隔時間為1000毫秒 (即每秒執行一次)


    // 清除定時器的效果
    return () => clearInterval(interval);
  }, []); // 空依賴表示只在組件挂載時執行一次

  return (
    <>
      <button style={{ width: "20px", height: "5px" }} onClick={test}></button>
      <svg style={{position:"absolute",top:"-90", left:"112", zIndex:"1000",}}
        width="300" height="300" viewBox="-97 -190 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill="#D9D9D9" />

        {Object.keys(controlPoints).map((key, index) => (
          <g key={index}>
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
