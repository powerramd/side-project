import React, { useState, useRef, useEffect } from "react";

function Cat() {
  const [mousePosition, setMousePosition] = useState({ x: 239, y: 239 });
  const svgRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        //(event.clientX - rect.left)算出滑鼠與圖片邊緣的距離，後面是標準化0~1的值轉換為SVG內部的標系統
        const mouseX = ((event.clientX - rect.left) / rect.width) * 478;
        const mouseY = ((event.clientY - rect.top) / rect.height) * 478;
        setMousePosition({ x: mouseX, y: mouseY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateEyePosition = (eyeX, eyeY, mouseX, mouseY) => {
    //計算方向向量
    const dx = mouseX - eyeX;
    const dy = mouseY - eyeY;
    //畢達哥拉斯定理計算眼睛到滑鼠的直線距離
    const distance = Math.sqrt(dx * dx + dy * dy);
    // 最大移動距離
    const maxDistance = 5;
    //計算移動比例，如果距離小於或等於 maxDistance，ratio 為 1，如果距離大於 maxDistance，ratio 將小於 1
    const ratio = Math.min(maxDistance / distance, 1);

    return {
      //計算新位置
      cx: eyeX + dx * ratio,
      cy: eyeY + dy * ratio,
    };
  };

  const rightPupil = calculateEyePosition(175, 190, mousePosition.x, mousePosition.y);
  const leftPupil = calculateEyePosition(232, 190, mousePosition.x, mousePosition.y);

  return (
    <svg ref={svgRef} className="introduce-cat" width="478" height="478" viewBox="0 0 478 478" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 背景 */}
      <circle cx="239" cy="239" r="239" fill="#E09E4A" />

      {/* 身體 */}
      <path
        d="M342.106 239.667C342.106 270.1 329.277 293.139 308.536 308.585C287.78 324.043 259.068 331.917 227.303 331.917C195.538 331.917 166.827 324.043 146.07 308.585C125.33 293.139 112.5 270.1 112.5 239.667C112.5 209.232 125.332 185.761 146.075 169.886C166.833 153.999 195.544 145.699 227.303 145.699C259.063 145.699 287.773 153.999 308.531 169.886C329.275 185.761 342.106 209.232 342.106 239.667Z"
        fill="black"
      />

      {/* 右眼 */}
      <circle cx="175.414" cy="190.691" r="19.7278" fill="white" />
      <circle cx={rightPupil.cx} cy={rightPupil.cy} r="13.5501" fill="black" />
      {/* 左眼 */}
      <circle cx="232.851" cy="190.691" r="19.6927" fill="white" />
      <circle cx={leftPupil.cx} cy={leftPupil.cy} r="13.5501" fill="black" />

      {/* 尾巴 */}
      <rect x="219.159" y="297.206" width="185.171" height="35.2107" rx="17.6053" fill="black" />

      {/* 右耳 */}
      <path
        d="M156.6 141.834C157.049 136.716 162.666 133.803 167.097 136.39L186.057 147.461C190.818 150.242 190.64 157.191 185.742 159.731L164.859 170.56C159.961 173.1 154.194 169.234 154.677 163.733L156.6 141.834Z"
        fill="black"
      />
      {/* 左耳 */}
      <path
        d="M236.256 129.426C239.778 125.69 245.992 126.896 247.866 131.68L255.883 152.145C257.896 157.284 253.452 162.62 248.036 161.568L224.951 157.086C219.535 156.035 217.404 149.422 221.187 145.409L236.256 129.426Z"
        fill="black"
      />
    </svg>
  );
}

export default Cat;
