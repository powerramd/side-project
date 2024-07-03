function Test() {
  return (
    <>
      <svg width="400" height="200">
        {/* <!-- 小弧，順時針 --> */}
        <path d="M 50 150 A 40 75 200 0 1 150 150" fill="none" stroke="black" />
        {/* <!-- 大弧，順時針 --> */}
        <path d="M 50 150 A 75 75 0 1 1 150 150" fill="none" stroke="red" />
        {/* <!-- 小弧，逆時針 --> */}
        <path d="M 200 150 A 75 75 0 0 0 300 150" fill="none" stroke="blue" />
        {/* <!-- 大弧，逆時針 --> */}
        <path d="M 200 150 A 75 75 0 1 0 300 150" fill="none" stroke="green" />
      </svg>
      <svg width="300" height="200" viewBox="0 0 300 100">
        {/* <!-- 水平線 --> */}
        <path d="M 10 10 H 300" stroke="black" strokewidt="2" fill="none" />
        {/* <!-- 垂直線 --> */}
        <path d="M 10 10 V 100" stroke="red" strokewidt="2" fill="none" />
      </svg>
      <svg width="300" height="100" viewBox="0 0 300 100">
        <path
          d="M 10 80 C 40 10, 65 10, 95 80"
          stroke="blue"
          strokewidt="2"
          fill="none"
        />
      </svg>
      <svg width="300" height="190" viewBox="0 0 300 100">
        <path
          d="M 10 80 C 40 10, 65 20, 90 0 S 150 150, 180 80"
          stroke="green"
          strokewidt="2"
          fill="none"
        />
      </svg>
    </>
  );
}

export default Test;
