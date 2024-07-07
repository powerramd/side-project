import React, { useEffect, useRef } from "react";

function HorizontalScroll() {
  const horizonRef = useRef(null); // 創建一個 useRef 鉤子來引用水平滾動區塊容器

  useEffect(() => {
    // 計算滾動進度的函數
    function getProgress(element) {
      const rect = element.getBoundingClientRect(); // 取得元素相對於視口的位置和大小
      let progress = -(rect.top / (element.clientHeight - window.innerHeight)); // 計算滾動進度比例
      // console.log((rect.top / (element.clientHeight - window.innerHeight)));
      // console.log(rect.top);

      // 確保進度值在合理範圍內 (0 到 1 之間)
      if (progress <= 0) {
        progress = 0;
      } else if (progress >= 1) {
        progress = 1;
      }

      return progress;
    }

    // 滾動事件處理函數
    function handleScroll() {
      if (horizonRef.current) {
        // 確保 horizonRef 引用存在
        // 根據滾動進度計算並設置水平滾動區塊容器的滾動位置
        horizonRef.current.children[0].scrollLeft = getProgress(horizonRef.current) * window.innerWidth * 4;
      }
    }

    window.addEventListener("scroll", handleScroll); // 添加滾動事件監聽器

    // 清除效果: 組件卸載時移除滾動事件監聽器
    return () => {
      window.removeEventListener("scroll", handleScroll); // 移除滾動事件監聽器
    };
  }, []); // 空依賴數組表示只在組件初次渲染時執行 useEffect

  // 渲染組件內容
  return (
    <>
      <section className="section -a">
        <div className="section__text">👇 SCROLL DOWN 👇</div>
      </section>
      <section className="section -b -horizon" ref={horizonRef}>
        <div className="section__horizon">
          <div className="section__horizon-block">
            <span>HORIZONTAL 👉</span>
          </div>
          <div className="section__horizon-block">
            <span>HORIZONTAL 🥰</span>
          </div>
          <div className="section__horizon-block">
            <span>HORIZONTAL 😘</span>
          </div>
          <div className="section__horizon-block">
            <span>HORIZONTAL 🎉</span>
          </div>
          <div className="section__horizon-block">
            <div>🏄 OH YA BABY 🏄</div>
          </div>
        </div>
      </section>
      <section className="section -c">
        <div className="section__text">
          ES Design Loves Egg
          <br />
          <a href="https://e-s.tw">Made by ES Design</a>
        </div>
      </section>
    </>
  );
}

export default HorizontalScroll;
