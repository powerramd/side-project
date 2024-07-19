import React, { useEffect, useMemo, useRef, useReducer, useCallback, useState } from "react";
import { sticker } from "./picture/images";
import { useLocation } from "react-router-dom";

// 自定義 hook 用於處理 resize 邏輯
const useResizeEffect = (cardItems, prpos) => {
  // 創建 refs 來引用 DOM 元素
  const marqueeContinerRef = useRef(null);
  const marqueeRef = useRef(null);
  const marquee2Ref = useRef(null);

  // 使用 useReducer 來管理複雜的狀態
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "RESIZE":
          return { ...state, ...action.payload };
        case "SET_MARQUEE_TRANSFORM_2":
          return { ...state, marqueeTransform2: action.payload };
        case "SET_MARQUEE_TRANSFORM_1":
          return { ...state, marqueeTransform: action.payload };
        default:
          return state;
      }
    },
    {
      continerWidth: 0, //用來放置容器寬度
      marqueeStyleLeft: 0, //動態設定跑馬燈初始的位置
      marquee2StyleLeft: 0, //動態設定跑馬燈初始的位置
      marqueeTransform: 0, //根據容器寬度設定要移動的距離
      marqueeTransform2: 0, //根據容器寬度設定要移動的距離
      use1Ref: marqueeRef,
      use2Ref: marquee2Ref,
    }
  );

  // 處理視窗大小變化的效果
  useEffect(() => {
    const handleResize = () => {
      if (marquee2Ref.current) {
        const continerWidth2 = prpos.current.offsetWidth + marqueeRef.current.offsetWidth;
        const continerWidth = prpos.current.offsetWidth;

        // 當視窗大小變化時，更新所有相關的狀態
        dispatch({
          type: "RESIZE",
          payload: {
            continerWidth2,
            continerWidth,
            marquee2StyleLeft: 0 - marquee2Ref.current.offsetWidth,
            marqueeStyleLeft: 0, // 暫時
            marqueeTransform: 0,
            marqueeTransform2: 0,
            use1Ref: marqueeRef,
            use2Ref: marquee2Ref,
          },
        });
      }
    };

    // 初始調用一次
    handleResize();
   
   
  
  }, [cardItems, prpos]);

  return [state, marqueeContinerRef, marquee2Ref, marqueeRef, dispatch];
};

function Marquee({ prpos }) {
  const cardItems = 5; // 設置卡片數量

  // 使用自定義 hook 來處理 resize 效果
  const [{ continerWidth2, continerWidth, marqueeStyleLeft, marquee2StyleLeft, use2Ref, use1Ref }, marqueeContinerRef, marquee2Ref, marqueeRef, dispatch] =
    useResizeEffect(cardItems, prpos);
  const [marqueeTransform,setMarqueeTransform]= useState(0)
  const [marqueeTransform2,setMarqueeTransform2]= useState(0)

  //獲取當前URL的位置，useLocation()是react-router-dom的一個hook，包括 pathname、search、hash、state 等屬性。
  const location = useLocation();
  // 控制動畫狀態的 state
  const [switchAnimation, setSwitchAnimation] = useState("marquee");
  const [switchAnimation2, setSwitchAnimation2] = useState("marquee2");
  const initialTime = 6.5;
  const [time, setTime] = useState("6.5");
  const [time2, setTime2] = useState(`${6.5}`);
  useEffect(() => {
    function init() {
      const fatherContiner = prpos.current.offsetWidth;
      const childContiner = use2Ref.current.offsetWidth;
      const duration = (((childContiner + fatherContiner) / fatherContiner) * initialTime);
      setTime2(`${duration}`);

    }
  
    if (prpos.current && use2Ref.current) {
      init();
    }
  }, [location.pathname, prpos, use2Ref, initialTime]);

  // 動畫結束後切換動畫，讓動畫初始位置設定到左邊視窗外
  const handleAnimationEnd = useCallback(() => {
    const fatherContiner = prpos.current.offsetWidth;
    const childContiner = use1Ref.current.offsetWidth;
    const animationDuration =( ((childContiner + fatherContiner+ Math.abs(fatherContiner-childContiner)) / fatherContiner ) * initialTime);

    setTime(animationDuration);
    setMarqueeTransform( 0 - (Math.abs((fatherContiner - childContiner)*2) + fatherContiner))
    dispatch({ type: "SET_MARQUEE_TRANSFORM_1", payload: 0 - (Math.abs(fatherContiner - childContiner) + fatherContiner) });
    setSwitchAnimation("marquee3")
  }, [dispatch, prpos, use1Ref]);


  const handleAnimationEnd2 = useCallback(() => {
    const fatherContiner = prpos.current.offsetWidth;
    const childContiner = use2Ref.current.offsetWidth;

    setSwitchAnimation2("marquee4")
    setMarqueeTransform2(- (Math.abs(fatherContiner - childContiner)))
    dispatch({ type: "SET_MARQUEE_TRANSFORM_2", payload: 0 - (fatherContiner -childContiner)-(Math.abs(fatherContiner - childContiner) ) });
    const animationDuration2 = (childContiner + fatherContiner+  Math.abs(fatherContiner-childContiner)) / ((childContiner + fatherContiner)/(((childContiner + fatherContiner) / fatherContiner) * initialTime));
    setTime2(animationDuration2 );
  }, [prpos, use2Ref, dispatch]);

  // 添加動畫結束事件監聽器
  useEffect(() => {
    const element = use1Ref.current;
    const element2 = use2Ref.current;
    element?.addEventListener("animationiteration", handleAnimationEnd);
    element2?.addEventListener("animationiteration", handleAnimationEnd2);
    return () => {
      element?.removeEventListener("animationiteration", handleAnimationEnd);
      element2?.removeEventListener("animationiteration", handleAnimationEnd2);
    };
  }, [handleAnimationEnd, handleAnimationEnd2, use1Ref, use2Ref]);

  // 第一個跑馬燈樣式
  const marqueeStyle = useMemo(
    () => ({
      transform: `matrix(1, 0, 0, 1, 0, 0)`,
      left: `${marqueeStyleLeft}px`,
      animation: `${switchAnimation} ${time}s infinite linear`,
      "--show-product-container-width": `${continerWidth}px`,
      "--reset-position": `${marqueeTransform}px`,
    }),
    [marqueeStyleLeft, time, continerWidth, marqueeTransform]
  );

  // 第二個跑馬燈樣式
  const marquee2Style = useMemo(
    () => ({
      transform: `matrix(1, 0, 0, 1, 0, 0)`,
      left: `${marquee2StyleLeft}px`,
      animation: `${switchAnimation2} ${time2}s infinite linear`,
      "--show-product-container-width2": `${continerWidth2}px`,
     "--reset-position2": `${marqueeTransform2}px`,
    }),
    [marquee2StyleLeft, switchAnimation2, time2, continerWidth2, marqueeTransform2]
  );

  // 卡片容器樣式
  const figureStyle = useMemo(
    () => ({
      // height: `calc(${cardSize}px - 2em)`,
      // width: `${cardSize}px`,
      height: `384px`,
      width: `384px`,
    }),
    []
  );

  // 用.map生成卡片元素
  const figures = useMemo(
    () =>
      Array(cardItems)
        .fill()
        .map((_, index) => (
          <figure key={index} style={figureStyle} className="figure-style">
            <img src={sticker} alt="" />
          </figure>
        )),
    [cardItems, figureStyle]
  );

  return (
    <div ref={marqueeContinerRef} className="show-product-continer">
      <div ref={marquee2Ref} style={marquee2Style} className="show-product-marquee-2">
        {figures}
      </div>
      <div ref={marqueeRef} style={marqueeStyle} className="show-product-marquee">
        {figures}
      </div>
    </div>
  );
}

export default Marquee;
