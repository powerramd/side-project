import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { CursorContext } from "./CursorContext";
import {  useLocation } from "react-router-dom";

function FrontPageSlogan() {
  //獲取當前URL的位置，useLocation()是react-router-dom的一個hook，包括 pathname、search、hash、state 等屬性。
  const location = useLocation();
  //這個是CursorFollow.jsx的共享狀態
  const { dispatch } = useContext(CursorContext);

  function handleMouseEnter() {
    dispatch({ type: "SET_SCALE", payload: 2 });
    dispatch({ type: "SET_ALPHA", payload: 0.6 });
    dispatch({ type: "SET_FILTER", payload: "" });
  }
  function handleMouseLeave() {
    dispatch({ type: "SET_FILTER", payload: "gooey" });
    dispatch({ type: "SET_SCALE", payload: 1 });
    dispatch({ type: "SET_ALPHA", payload: 1 });
  }

  const [scrollProgress, setScrollProgresst] = useState(0);
  const sloganStyle = {
    height: `calc(${100}% - ${scrollProgress*1.5}%)`,
 
  };
  console.log(scrollProgress)

  useEffect(() => {
    function sticky() {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
      const newScrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;



      if (newScrollPercentage < 50) {
        setScrollProgresst( newScrollPercentage);
        
      }
    }

    window.addEventListener("scroll", sticky);
    return () => {
      window.removeEventListener("scroll", sticky);
    };
  }, []);

  //刷新載入的時候重新抓取滾動條
  useLayoutEffect(() => {
    const scrollY = window.scrollY;
    // setScrollProgresst(100 - scrollY);
    
  }, [location.pathname]);

  return (
    <h1 className="slogan" style={sloganStyle}>
      This cat will sell something
      <p>這隻貓有賣一些小物</p>
      <svg onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="34" cy="34" r="33.5" stroke="black" />
        <path
          d="M32.2881 50.113C33.0616 50.9015 34.3279 50.9136 35.1163 50.1401L47.9655 37.5345C48.7539 36.761 48.7661 35.4947 47.9925 34.7062C47.219 33.9177 45.9527 33.9056 45.1642 34.6791L33.7428 45.8841L22.5378 34.4627C21.7643 33.6742 20.498 33.6621 19.7095 34.4356C18.9211 35.2091 18.9089 36.4754 19.6825 37.2639L32.2881 50.113ZM32.0001 18.9809L31.7158 48.6933L35.7156 48.7315L35.9999 19.0191L32.0001 18.9809Z"
          fill="black"
        />
      </svg>
    </h1>
  );
}

export default FrontPageSlogan;
