import React, { useEffect, useMemo, useRef, useReducer, useCallback, useState } from "react";
import { sticker } from "./picture/images";
import { useLocation } from "react-router-dom";

function Marquee({ prpos }) {
  const showContinerRef = useRef();
  const marqueeRef = useRef();
  const marqueeRef2 = useRef();

  // const [fatherContiner, setFatherContiner] = useState();
  // const [showContiner, setshowContiner] = useState();
  // const [marqueeContiner, setMarqueeContiner] = useState();
  // const [marqueeContiner2, setMarqueeContiner2] = useState();
  const cardItems = 5;

  // 動畫名稱
  const [animationName, setAnimationName] = useState(["marquee1-1"]);
  const [animationName2, setAnimationName2] = useState(["marquee2-1"]);
  // 動畫時間
  const [initSpeed, setinitSpeed] = useState(3);
  const [animationSpeed, setAnimationSpeed] = useState(initSpeed);
  const [animationSpeed2, setAnimationSpeed2] = useState(initSpeed);
  // 第二塊跑馬燈初始位置
  const [marqueeLeft1, setMarqueeLeft1] = useState(0);
  const [marqueeLeft2, setMarqueeLeft2] = useState(0);
  // 移動的距離
  const [fristMove, setFristMove] = useState(0);
  const [lastMove, setLastMove] = useState(0);
  const [fristMove2, setFristMove2] = useState(0);
  const [lastMove2, setLastMove2] = useState(0);

  // 計算速率與時間，分別丟入原始距離、初始時間、新的距離
  function calculateNewTime(originalDistance, originalTime, newDistance) {
    const originalSpeed = originalDistance / originalTime; // 計算原始速度
    const newTime = newDistance / originalSpeed; // 計算新時間
    return newTime;
  }

  // 初始化設定
  useEffect(() => {
    function init() {
      if (marqueeRef.current && marqueeRef.current && marqueeRef2.current && prpos.current) {
        const fatherContiner = prpos.current;
        const marqueeContiner = marqueeRef.current;
        const marqueeContiner2 = marqueeRef2.current;
        // 計算原始速度
        const originalDistance = fatherContiner.offsetWidth;
        const originalTime = initSpeed;
        setLastMove(prpos.current.offsetWidth);
        setLastMove2(prpos.current.offsetWidth + marqueeRef2.current.offsetWidth);

        // 計算新距離和新時間
        const newDistance2 = fatherContiner.offsetWidth + marqueeContiner2.offsetWidth;

        const newTime2 = calculateNewTime(originalDistance, originalTime, newDistance2);

        // 將跑第二塊跑馬燈移動到左邊螢幕外
        setMarqueeLeft2(0 - marqueeRef.current.offsetWidth);
        // 跑馬燈速率修正速度
        setAnimationSpeed2(newTime2);
      }
    }

    init();
    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("resize", init);
    };
  }, [initSpeed, prpos]);

  //動畫重播
  useEffect(() => {
    function handleAnimationEnd() {
      const repeatMove = (0 - marqueeRef.current.offsetWidth) - Math.abs(prpos.current.offsetWidth - marqueeRef.current.offsetWidth);
      setFristMove(repeatMove);
      setAnimationName("marquee1-2");
      setAnimationSpeed(Math.abs(calculateNewTime(prpos.current.offsetWidth, initSpeed, Math.abs(repeatMove)))+3);
    }

    const marqueeElement = marqueeRef.current;

    marqueeElement?.addEventListener("animationiteration", handleAnimationEnd);

    return () => {
      marqueeElement?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [fristMove, initSpeed, prpos]);

  useEffect(() => {
    function handleAnimationEnd2() {


      const repeatMove2 = (0 - marqueeRef.current.offsetWidth) - Math.abs(prpos.current.offsetWidth - marqueeRef.current.offsetWidth);
      setLastMove2(prpos.current.offsetWidth + marqueeRef2.current.offsetWidth + Math.abs(prpos.current.offsetWidth - marqueeRef.current.offsetWidth));
      console.log(repeatMove2);
      setFristMove2(repeatMove2);
      setAnimationName2("marquee2-2");
      setinitSpeed(Math.abs(calculateNewTime(marqueeRef.current.offsetWidth, initSpeed, Math.abs(repeatMove2))))
      
    }

    const marqueeElement2 = marqueeRef2.current;

    marqueeElement2?.addEventListener("animationiteration", handleAnimationEnd2);

    return () => {
      marqueeElement2?.removeEventListener("animationend", handleAnimationEnd2);
    };
  }, [initSpeed, prpos]);

  // 第一次移動
  useEffect(() => {
    setLastMove(prpos.current.offsetWidth);
    setLastMove2(prpos.current.offsetWidth + marqueeRef2.current.offsetWidth);
  }, [prpos]);

  // 第一個跑馬燈樣式
  const marqueeStyle = useMemo(
    () => ({
      transform: `matrix(1, 0, 0, 1, 0, 0)`,
      left: `${marqueeLeft1}px`,
      animation: `${animationName} ${animationSpeed}s infinite linear`,
      "--first-move": `${fristMove}px`,
      "--last-move": `${lastMove}px`,
    }),
    [animationName, animationSpeed, fristMove, lastMove, marqueeLeft1]
  );

  // 第二個跑馬燈樣式
  const marqueeStyle2 = useMemo(
    () => ({
      transform: `matrix(1, 0, 0, 1, 0, 0)`,
      left: `${marqueeLeft2}px`,
      animation: `${animationName2} ${animationSpeed2}s infinite linear`,
      "--first-move2": `${fristMove2}px`,
      "--last-move2": `${lastMove2}px`,
    }),
    [animationName2, animationSpeed2, fristMove2, lastMove2, marqueeLeft2]
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
    <div ref={showContinerRef} className="show-product-continer">
      <div ref={marqueeRef} style={marqueeStyle} className="show-product-marquee">
        {figures}
      </div>
      <div ref={marqueeRef2} style={marqueeStyle2} className="show-product-marquee-2">
        {figures}
      </div>
    </div>
  );
}

export default Marquee;
