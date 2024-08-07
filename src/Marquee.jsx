import { useEffect, useMemo, useRef, useState } from "react";

function Marquee({ speed = 1.3 }) {
  // 跑馬燈移動的值
  const [carouselTransform, setCarouselTransform] = useState(0);
  const [carousel2Transform, setCarousel2Transform] = useState(0);
  // 用來抓取跑馬燈容器的寬度
  const marqueeRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);
  // 抓取跑馬燈長度，用來修正要移到螢幕外面的的距離
  const carouselRef = useRef(null);
  const carousel2Ref = useRef(null);
  //用來定初始的位置
  const [carouselStyleLeft, setCarouselStyleLeft] = useState(0);
  const [carousel2StyleLeft, setCarousel2StyleLeft] = useState(0);
  //用來設定卡片大小
  const [figure, setFigure] = useState(0);
  const cardItems = 5;

  // 控制是否正在調整大小的狀態

  // 初始化設定
  useEffect(() => {
    const handleResize = () => {
      if (marqueeRef.current) {
        // 當容器尺寸變化時更新寬度資訊
        setItemWidth(marqueeRef.current.offsetWidth);
        setCarousel2StyleLeft(0 - carousel2Ref.current.offsetWidth);
        setCarouselStyleLeft(0);
        //加這兩個可以防止畫面大小改變的時候跑掉
        setCarouselTransform(0);
        setCarousel2Transform(0);
        setFigure(marqueeRef.current.offsetWidth / cardItems);
      }
    };

    // 初始設定及 resize 時更新
    handleResize();
    // 畫面改變大小的時候觸發
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [figure]);

  // 每5毫秒移動1px，但如果超過畫面邊界就把跑馬燈丟到最前面(螢幕外)重新跑
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselTransform > itemWidth) {
        // 1.5是調整的係數，連接處會小小的誤差，導致雖然不是很明顯但會有斷開的感覺，可能是因為執行順序的關係?
        setCarouselTransform(0 - carouselRef.current.offsetWidth + 1.5);
      }
      setCarouselTransform((prev) => prev + speed);
    }, 4); // 每隔 5 豪秒切換一次

    // 清除 interval，避免內存洩漏
    return () => clearInterval(interval);
  }, [carousel2Transform, carouselTransform, itemWidth, speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carousel2Transform / 2 > itemWidth) {
        setCarousel2Transform(0 + 1.5);
      }
      setCarousel2Transform((prev) => prev + +speed);
    }, 4);
    // 清除 interval，避免內存洩漏
    return () => clearInterval(interval);
  }, [carousel2Transform, itemWidth, speed]);

  const carouselStyle = useMemo(
    () => ({
      transform: `matrix(${1}, 0, 0, ${1}, ${Math.round(carouselTransform)}, ${0})`,
      left: `${carouselStyleLeft}px`,
    }),
    [carouselTransform, carouselStyleLeft]
  );

  const carousel2Style = useMemo(
    () => ({
      transform: `matrix(${1}, 0, 0, ${1}, ${Math.round(carousel2Transform)}, ${0})`,
      left: `${carousel2StyleLeft}px`,
    }),
    [carousel2Transform, carousel2StyleLeft]
  );

  const figureStyle = useMemo(
    () => ({
      height: `calc(${figure}px - 2em)`,
      width: `${figure}px`,
    }),
    [figure]
  );
  // 使用 .map() 生成 figure 元素
  const figures = useMemo(
    () =>
      Array(cardItems)
        .fill()
        .map((_, index) => <figure key={index} style={figureStyle} className="figure-style"></figure>),
    [cardItems, figureStyle]
  );

  return (
    <div ref={marqueeRef} className="show-product-continer">
      <div ref={carouselRef} style={carouselStyle} className="show-product-carousel">
        {figures}
      </div>
      <div ref={carousel2Ref} style={carousel2Style} className="show-product-carousel-2">
        {figures}
      </div>
    </div>
  );
}

export default Marquee;
