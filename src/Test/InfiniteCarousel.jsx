import React, { useState, useEffect, useRef } from 'react';


const InfiniteCarousel = () => {
  // 圖片的狀態，初始值為 [2, 1, 2, 1]
  const [images] = useState([2, 1, 2, 1]);
  // 旋轉角度的狀態，初始值為 0
  const [rotation, setRotation] = useState(0);
  // 滑動狀態，初始值為 false
  const [sliding, setSliding] = useState(false);
  // 為了檢查組件是否加載
  const carouselRef = useRef(null);

  // 右滑，將旋轉角度減去 90 度
  const slideRight = () => {
    if (sliding) return; // 如果正在滑動，則不執行
    setSliding(true); // 設定滑動狀態為 true
    setRotation(prev => prev - 90); // 更新旋轉角度
  };

  // 左滑，將旋轉角度加上 90 度
  const slideLeft = () => {
    if (sliding) return; // 如果正在滑動，則不執行
    setSliding(true); // 設定滑動狀態為 true
    setRotation(prev => prev + 90); // 更新旋轉角度
  };

  // 使用 useEffect 來監聽旋轉器的 transitionend 事件
  useEffect(() => {
    // 定義處理 transitionend 事件的函數
    const handleTransitionEnd = () => {
      setSliding(false); // 設定滑動狀態為 false
      // 將旋轉角度限制在 0-359 度之間
      setRotation(prev => prev % 360);
    };

    const carousel = carouselRef.current;
    if (carousel) {
      // 為旋轉器添加 transitionend 事件監聽器
      carousel.addEventListener('transitionend', handleTransitionEnd);
    }

    // 在組件卸載時移除事件監聽器
    return () => {
      if (carousel) {
        carousel.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, []);

  return (
    <div className="carousel-container">
      <button onClick={slideLeft}>左滑</button>
      <div className="carousel-view">
        <div 
          ref={carouselRef}
          className="carousel-rotator"
          style={{ 
            transform: `translateZ(-150px) rotateY(${rotation}deg)`,
            transition: sliding ? 'transform 0.3s ease-in-out' : 'none' // 根據滑動狀態設置轉換動畫
          }}
        >
          {images.map((img, index) => (
            <div 
              key={index} 
              className="carousel-face"
              style={{ 
                transform: `rotateY(${index * 90}deg) translateZ(150px)` // 設置每個面的位置
              }}
            >
              <img 
                src={`https://picsum.photos/id/${img}/300/200`} 
                alt={` ${img}`} 
              />
            </div>
          ))}
        </div>
      </div>
      <button onClick={slideRight}>右滑</button>
    </div>
  );
};

export default InfiniteCarousel;
