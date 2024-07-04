import { Link, useLocation } from "react-router-dom";
import { useState, useLayoutEffect, useEffect, useCallback } from "react";
import { Logo, User } from "./picture/images.js";
// /*import Logo from "./picture/logo.png";
// import User from "./picture/user.png";*/

function Header() {
  //獲取當前URL的位置，useLocation()是react-router-dom的一個hook，包括 pathname、search、hash、state 等屬性。
  const location = useLocation();
  //設置滑塊動畫過度的初始值
  const [transition, setTransition] = useState("none");
  //紀錄當前頁面滑塊的位置
  const [sliderPosition, setSliderPosition] = useState(0);
  //隨著滑鼠懸停而移動滑塊，在滑鼠離開時恢復到當前頁面的位置sliderPosition
  const [sliderTransform, setSliderTransform] = useState(0);
  //設定header預設顏色
  const [containerColor, setContainerColor] = useState("gray");
  //選單物件
  const [menuItems, setMenuItems] = useState([
    {
      label: "首頁",
      link: "/side-project",
      color: "black",
      containerColor: "burlywood",
    },
    {
      label: "吊飾",
      link: "/side-project1",
      color: "white",
      containerColor: "red",
    },
    {
      label: "貼紙",
      link: "/side-project2",
      color: "white",
      containerColor: "#CCFF66",
    },
    {
      label: "玩偶",
      link: "/side-project3",
      color: "white",
      containerColor: "gray",
    },
    {
      label: "燈飾",
      link: "/side-project4",
      color: "white",
      containerColor: "blue",
    },
  ]);
  //setContainerColor[getUrlPosition(location.pathname)].containerColor

  //根據路徑名稱獲取選單物件的索引
  const getMenuItemIndexFromPathname = useCallback((pathname) => {
    switch (pathname) {
      case "/side-project1":
        return 1;
      case "/side-project2":
        return 2;
      case "/side-project3":
        return 3;
      case "/side-project4":
        return 4;
      default:
        return 0;
    }
  }, []);

  //根據回傳過來的位置更新滑塊位置、選單文字顏色
  const updateSliderAndMenu = useCallback((position) => {
    setTransition("none"); // 移除過渡動畫
    setSliderTransform(position); // 變更滑塊位置
    setSliderPosition(position); // 儲存滑塊位置
    setMenuItems((prevItems) =>
      prevItems.map((item, index) => ({
        ...item,
        color: index === position ? "black" : "white",
      }))
    ); // 更新選單文字顏色
  }, []);

  /*將 handleClick、handleMouseEnter 和 handleMouseLeave 三個函數合併為 handleSliderEvent 函數，並根據事件的類型來執行相應的操作*/
  const handleSliderEvent = useCallback(
    (number, eventType) => {
      // 變更選單文字顏色
      const newMenuItems = menuItems.map((item, index) => ({
        ...item,
        color: index === number ? "black" : "white",
      }));

      setTransition(".225s all ease-out"); // 添加過渡動畫
      switch (eventType) {
        case "click":
          setSliderPosition(number);
          setContainerColor(menuItems[number].containerColor); //更新header背景顏色
          // console.log((window.scrollY));
          window.scrollTo(0, 0); //頁面跳轉的話將垂直滾度條進度設置為0
          break;
        case "mouseEnter":
          setSliderTransform(number);
          break;
        case "mouseLeave":
          setSliderTransform(sliderPosition);
          break;
        default:
          break;
      }
      setMenuItems(newMenuItems); // 更新選單文字顏色
    },
    [menuItems, sliderPosition]
  );

  //======================================================================================================================================================================================================================
  useEffect(() => {
    //這段函數是垂直滾動的時候將header的背景顏色變成毛玻璃樣式
    function handleScroll() {
      if (window.scrollY > 80) {
        //當垂直滾動條滾動大於80的時候結果為true
        document.body.classList.add("scrolling"); //新增.scrolling樣式類別到body
        setContainerColor("rgba(107, 129, 140, 0.3)"); //將顏色些改為灰色並透明
      } else {
        document.body.classList.remove("scrolling"); //移除body的.scrolling樣式類別
        setContainerColor(
          menuItems[getMenuItemIndexFromPathname(location.pathname)]
            .containerColor
        ); //更新header背景顏色
      }
    }

    window.addEventListener("scroll", handleScroll); //新增事件監聽器，垂直滾動的時候觸發上方函數
    return () => {
      window.removeEventListener("scroll", handleScroll); //移除事件監聽
    };
  }, [getMenuItemIndexFromPathname, location.pathname, menuItems]);

  //----------------------------------------------------------------------------------------------------------------

  //根據URL切換滑塊的位置和選單文字顏色，並切換header背景顏色
  useLayoutEffect(() => {
    const newPosition = getMenuItemIndexFromPathname(location.pathname); //設定URL位置
    if (newPosition !== sliderPosition) {
      updateSliderAndMenu(newPosition);
      setContainerColor(menuItems[newPosition].containerColor);
    }
  }, [
    getMenuItemIndexFromPathname,
    updateSliderAndMenu,
    sliderPosition,
    location.pathname,
    menuItems,
  ]);
  /*[location.pathname,....] 是作為 useLayoutEffect 鉤子的第二個參數，用來指定 useLayoutEffect 鉤子的依賴項。當這些依賴項(location.pathname,....)中的任何一個發生變化時，useLayoutEffect 中的回調函數就會被執行。*/

  //======================================================================================================================================================================================================================
  return (
    <div
      className="nav-menu-container"
      style={{ backgroundColor: containerColor }}
    >
      <div className="logo-container">
        <Link to="/side-project">
          <img className="logo" src={Logo} alt="logo"></img>
        </Link>
      </div>
      <div className="menu-layer-container">
        <div className="menu-layer-bg">
          <ul
            className="menu-layer"
            onMouseLeave={() => handleSliderEvent(sliderPosition, "mouseLeave")}
          >
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="menu-item"
                onMouseEnter={() => handleSliderEvent(index, "mouseEnter")}
              >
                <Link to={item.link}>
                  <p
                    onClick={() => handleSliderEvent(index, "click")}
                    className="menu-item-label"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div
            id="slider"
            style={{
              transform: `translateX(${6.5 * sliderTransform}em)`,
              transition: transition,
            }}
          ></div>
        </div>
      </div>
      <div className="login-container">
        <Link to="/login">
          <img className="user-icon" src={User} alt="user"></img>
        </Link>
      </div>
    </div>
  );
}

export default Header;

/*
---滑快也可以使用以下方式進行移動，但因為直接操作了DOM，違反了Recat的開發原則，所以我改使用react virtual dom。---
function getSliderElement() {
    return document.getElementById('slider')
}
function moveSlider(number) {
    const slider = getSliderElement()
    slider.style.transform = `translateX(calc(var(--menu-width) * ${number}))`
    console.log(parseFloat(window.getComputedStyle(slider).transform.match(/matrix\((.+)\)/)[1].split(', ')[4]))
    console.log(window.getComputedStyle(slider).transform.match(/matrix\((.+)\)/)[1].split(', '))
    console.log(window.getComputedStyle(slider).transform)

----這三個函數我把它合併成handleSliderEvent函數---    
function handleClick(number) {
    setSliderTransform(number);
    setSliderPosition(number);
    setTransition(".225s all ease-out");
    //moveSlider(number)
};
function handleMouseEnter(number) {
    setSliderTransform(number);
    setTransition(".225s all ease-out");
    //moveSlider(number)

};
function handleMouseLeave() {
    setSliderTransform(sliderPosition);
    setTransition(".225s all ease-out");
    //moveSlider(sliderPosition)
};*/

//根據URL更新header背景顏色
/*const updateContainerColor = useCallback((pathname) => {
  switch (pathname) {
    case "/side-project1":
      setContainerColor("red");
      break;
    case "/side-project3":
      setContainerColor("blue");
      break;
    case "/side-project4":
      setContainerColor("gray");
      break;
    case "/side-project2":
      setContainerColor("#CCFF66");
      break;
    default:
      setContainerColor("burlywood");
      break;
  }
}, []);*/
