import Color from "./picture/Color.svg";
import pendant1 from "./picture/pendant1.jpg";

function Test2() {
  return (
    <svg width="400" height="650" viewBox="0 0 400 650" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 定義裁剪路徑 */}
      <defs>
        <clipPath id="clipPath">
          <path d="M400 200.122C400 89.5978 310.457 0 200 0C89.543 0 0 89.5978 0 200.122V649.036H400V200.122Z" />
        </clipPath>
      </defs>

      {/* 可選：在底部顯示原始 path */}
      <path d="M400 200.122C400 89.5978 310.457 0 200 0C89.543 0 0 89.5978 0 200.122V649.036H400V200.122Z" fill="rgb(56, 90, 66)" />

      {/* 使用裁剪路徑 */}
      <g clipPath="url(#clipPath)">
        <image href={pendant1} x="50" y="50" width="400" height="300" />
      </g>
    </svg>
  );
}

export default Test2;
