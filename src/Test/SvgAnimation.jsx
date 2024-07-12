import { useState, useEffect, useCallback, useMemo } from "react";

function SvgAnimation() {
  const [forTest, setForTest] = useState(null);
  const [forTest2, setForTest2] = useState(null);
  const [forTest3, setForTest3] = useState(null);
  //會跟隨鼠標的svg預設座標
  const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });
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
  //svg預設控制點
  const defaultControlPoints = {
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
  const d = useMemo(
    () => `
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
    Z`,
    [controlPoints]
  );

  // 讓svg可以跟著滑鼠移動
  const handleMouseMove = useCallback((event) => {
    const { clientX, clientY } = event;
    setSvgPosition({ x: clientX, y: clientY });
  }, []);

  // 用來計算SVG與y=80垂直距離
  function calculateDistance(y) {
    return y - 80;
  }

  //計算輸出值: 如果距離小於40就回傳從0開始遞增的數字
  function calculateOutput(x) {
    const maxiDetectionRange = 40;
    if (x < maxiDetectionRange) {
      return maxiDetectionRange - x;
    } else {
      return 0;
    }
  }

  //緩進緩快出的效果
  function easeinCurveEffect(x, parameter1, parameter2) {
    return Math.pow(x, parameter1) / parameter2;
  }

  // 更新控制點
  const updateSvgShape = useCallback((variable, stage) => {
    const updataStage = [
      {
        P10y: (defaultControlPoints.P10.y + variable) * -2,
        stageNumber: 0,
      },
      {
        P1x: variable > 16 ? defaultControlPoints.P1.x + (variable - 16) * 2 : defaultControlPoints.P1.x + easeinCurveEffect(variable, 1.0, 10) * 1,
        P7x: variable > 16 ? defaultControlPoints.P7.x + (variable - 16) * -2 : defaultControlPoints.P7.x + easeinCurveEffect(variable, 1.0, 10) * -1,
        P2x: variable > 25 ? 36.75 : defaultControlPoints.P2.x + easeinCurveEffect(variable, 2, 50) * -1,
        P6x: variable > 25 ? 12.5 : defaultControlPoints.P6.x + easeinCurveEffect(variable, 2, 50),
        P8x: defaultControlPoints.P8.x + easeinCurveEffect(variable, 1.8, 40) * -2,
        P12x: defaultControlPoints.P12.x + easeinCurveEffect(variable, 1.8, 40) * 2,
        P9x: defaultControlPoints.P9.x + easeinCurveEffect(variable, 2.5, 40) * -1,
        P11x: defaultControlPoints.P11.x + easeinCurveEffect(variable, 2.5, 40),

        P1y: variable > 15 ? variable - 16 : defaultControlPoints.P1.y + easeinCurveEffect(variable, 2.6, 50) * -1,
        P7y: variable > 15 ? variable - 16 : defaultControlPoints.P7.y + easeinCurveEffect(variable, 2.6, 50) * -1,
        P2y: variable > 24 ? variable - 16 : defaultControlPoints.P2.y + easeinCurveEffect(variable, 2, 20) * -1,
        P6y: variable > 24 ? variable - 16 : defaultControlPoints.P6.y + easeinCurveEffect(variable, 2, 20) * -1,
        P8y: defaultControlPoints.P8.y + easeinCurveEffect(variable, 2.0, 10) * -1,
        P12y: defaultControlPoints.P12.y + easeinCurveEffect(variable, 2.0, 10) * -1,
        P9y: (defaultControlPoints.P9.y + easeinCurveEffect(variable, 2.0, 10)) * -1,
        P11y: (defaultControlPoints.P11.y + easeinCurveEffect(variable, 2.0, 10)) * -1,
        P3y: defaultControlPoints.P3.y + easeinCurveEffect(variable, 1.6, 50) * -1,
        P4y: defaultControlPoints.P4.y + easeinCurveEffect(variable, 1.6, 50) * -1,
        P5y: defaultControlPoints.P5.y + easeinCurveEffect(variable, 1.6, 50) * -1,
        stageNumber: 1,
      },
    ];
    setControlPoints((prevState) => ({
      ...prevState,
      P12: { x: updataStage[1].P12x, y: updataStage[1].P12y },
      P1: { x: updataStage[1].P1x, y: updataStage[1].P1y },
      P2: { x: updataStage[1].P2x, y: updataStage[1].P2y },

      P3: { x: 38.031, y: updataStage[1].P3y },
      P4: { x: 24.5, y: updataStage[1].P4y },
      P5: { x: 10.969, y: updataStage[1].P5y },

      P6: { x: updataStage[1].P6x, y: updataStage[1].P6y },
      P7: { x: updataStage[1].P7x, y: updataStage[1].P7y },
      P8: { x: updataStage[1].P8x, y: updataStage[1].P8y },

      P9: { x: updataStage[1].P9x, y: updataStage[1].P9y },
      P10: { x: 24.5, y: updataStage[0].P10y },
      P11: { x: updataStage[1].P11x, y: updataStage[1].P11y },
    }));
    setForTest2(variable);
  }, []);

  //添加滑鼠移動的監聽器
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  //控制點動畫設定
  useEffect(() => {
    //newDistance用來判斷與y=80的垂直距離
    const newDistance = calculateDistance(svgPosition.y);
    // setForTest(`calculateOutput:${calculateOutput(newDistance)}`);
    setForTest3(`newDistance:${newDistance}`);
    if (newDistance < 40) {
      updateSvgShape(calculateOutput(newDistance));
    } else {
      updateSvgShape(0);
    }
  }, [svgPosition, updateSvgShape]);

  //svg的style
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

  //svg的裡面路徑的style
  const pathStyle = {
    transformBox: "fill-box",
    transformOrigin: "center",
  };

  return (
    <>
      <h2>{forTest}</h2>
      <h2>{forTest3}</h2>
      <h2>{forTest2}</h2>
      {/*<button style={{ width: "20px", height: "5px" }} onClick={test}></button>*/}

      <svg style={svgStyle} idth="100" height="100" viewBox="-25,-50,100,100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Dynamic SVG shape">
        <path d={d} fill="blue" style={pathStyle} />

        {Object.entries(controlPoints).map(([key, point], index) => (
          <g key={key} style={pathStyle}>
            <circle cx={point.x} cy={point.y} r="3" fill={colors[index % colors.length]} />
            <text x={point.x + 5} y={point.y - 5} fontSize="10" fill="black">
              {key}
            </text>
          </g>
        ))}
      </svg>
    </>
  );
}

export default SvgAnimation;
