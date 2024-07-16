import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { Logo, User } from "./picture/images.js";
import CursorFollow from "./CursorFollow.jsx";
// /*import Logo from "./picture/logo.png";
// import User from "./picture/user.png";*/

function Header() {
  //獲取當前URL的位置，useLocation()是react-router-dom的一個hook，包括 pathname、search、hash、state 等屬性。
  const location = useLocation();
  //設置滑塊動畫過度的初始值
  const [transition, setTransition] = useState("none");
  //紀錄當前滑塊的位置
  const [sliderPosition, setSliderPosition] = useState(0);
  //隨著滑鼠懸停而移動滑塊，在滑鼠離開時恢復到當前頁面的位置sliderPosition
  const [sliderTransform, setSliderTransform] = useState(0);
  //設定header預設顏色初始值
  const [containerColor, setContainerColor] = useState("gray");
  //切換header的className
  const [containerClass, setContainerClass] = useState("");
  //選單物件(如果有新增或刪除物件請修改getMenuItemIndexFromPathname()函數，並在App.jsx裡面新增對應的路由) Link和ID 應為唯一值
  const [menuItems, setMenuItems] = useState([
    {
      ID: 0,
      link: "/side-project",
      label: "首頁",
      color: "black",
      containerColor: "rgba(252, 247, 248, 1)",
    },
    {
      ID: 1,
      link: "/side-project1",
      label: "吊飾",
      color: "white",
      containerColor: "#CCFF66",
    },
    {
      ID: 2,
      link: "/side-project2",
      label: "貼紙",
      color: "white",
      containerColor: "red",
    },
    {
      ID: 3,
      link: "/side-project3",
      label: "玩偶",
      color: "white",
      containerColor: "gray",
    },
    {
      ID: 4,
      link: "/side-project4",
      label: "燈飾",
      color: "white",
      containerColor: "blue",
    },
    {
      ID: 5,
      link: "/side-project5",
      label: "測試",
      color: "white",
      containerColor: "yellow",
    },
  ]);
  //設定菜單背景層(綠色圓角)的寬度初始值
  const [menuLayerBgWidth] = useState(`calc(var(--menu-width) * ${menuItems.length})`);
  //======================================================================================================================================================================================================================
  //用來讓其他元件互動的hook，useRef可以讓其他元件方便取用元素的屬性，這裡是鉤到菜單背景層(綠色圓角).menu-layer-bg
  const [menuContainerWidth, setMenuContainerWidth] = useState(0);
  const menuContainerRef = useRef(null);
  function updateWidth() {
    if (menuContainerRef.current) {
      setMenuContainerWidth(menuContainerRef.current.offsetWidth);
    }
  }
  useEffect(() => {
    updateWidth(); // 初始化宽度
    window.addEventListener("resize", updateWidth); //視窗大小變化的監聽器
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  //======================================================================================================================================================================================================================

  //根據路徑名稱獲取選單物件的索引
  const getMenuItemIndexFromPathname = useCallback(
    (pathname) => {
      switch (pathname) {
        case menuItems[1].link:
          return menuItems[1].ID;
        case menuItems[2].link:
          return menuItems[2].ID;
        case menuItems[3].link:
          return menuItems[3].ID;
        case menuItems[4].link:
          return menuItems[4].ID;
        case menuItems[5].link:
          return menuItems[5].ID;
        default:
          return menuItems[0].ID;
      }
    },
    [menuItems]
  );

  //根據回傳過來的位置更新滑塊位置、選單文字顏色
  const updateSliderAndMenu = useCallback((position) => {
    setTransition("none"); // 移除過渡動畫
    setSliderTransform(position); //更新滑塊位置
    setSliderPosition(position); // 儲存滑塊位置
    setMenuItems((prevItems) =>
      prevItems.map((item, index) => ({
        ...item,
        color: index === position ? "black" : "white",
      }))
    ); // 更新選單文字顏色
  },[]);

  /*將 handleClick、handleMouseEnter 和 handleMouseLeave 三個函數合併為 handleSliderEvent 函數，並根據事件的類型來執行相應的操作*/
  const handleEvent = useCallback(
    (number, eventType) => {
      // 變更選單文字顏色
      const newMenuItems = menuItems.map((item, index) => ({
        ...item,
        color: index === number ? "black" : "white",
      }));

      setTransition(".225s all ease-out"); // 添加過渡動畫
      switch (eventType) {
        case "click":
          setSliderPosition(number); //更新滑塊位置
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

  //滾動事件
  useEffect(() => {
    //這段函數是垂直滾動的時候將header的背景顏色變成毛玻璃樣式
    function handleScroll() {
      
      if (window.scrollY > 80) {
        //當垂直滾動條滾動大於80的時候結果為true
        setContainerClass("scrolling"); //切換成毛玻璃的效果
        setContainerColor("rgba(107, 129, 140, 0.3)"); //將顏色些改為灰色並透明
      } else {
        setContainerClass(""); //移除毛玻璃的效果
        setContainerColor(menuItems[getMenuItemIndexFromPathname(location.pathname)].containerColor); //更新header背景顏色
      }
    }
    window.addEventListener("scroll", handleScroll); //新增事件監聽器，垂直滾動的時候觸發上方函數
    return () => {
      window.removeEventListener("scroll", handleScroll); //移除事件監聽
    };
  },[getMenuItemIndexFromPathname, location.pathname, menuItems]);

  //----------------------------------------------------------------------------------------------------------------

  //根據URL(重新整理時)切換滑塊的位置和選單文字顏色，並切換header背景顏色
  useLayoutEffect(() => {
    const newPosition = getMenuItemIndexFromPathname(location.pathname); //根據URL位置回傳菜單物件對應的ID
    updateSliderAndMenu(newPosition); //更新滑塊位置、移除過渡動畫、更新選單文字顏色
    setContainerColor(menuItems[newPosition].containerColor); //更新header背景顏色
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  /*[location.pathname] 是作為 useLayoutEffect 鉤子的第二個參數，用來指定 useLayoutEffect 鉤子的依賴項。當這些依賴項(location.pathname)中的任何一個發生變化時，useLayoutEffect 中的回調函數就會被執行。*/

  //======================================================================================================================================================================================================================
  return (
    <div className={`nav-menu-container ${containerClass}`} style={{ backgroundColor: containerColor }} ref={menuContainerRef}>
      <div className="logo-container">
        <Link to="/side-project">
          <img className="logo" src={Logo} alt="logo"></img>
        </Link>
      </div>
      <div className="menu-layer-container">
        <div className="menu-layer-bg" style={{ width: menuLayerBgWidth }}>
          <CursorFollow props={{ memenuContainerWidth: menuContainerWidth, memenuLayerBgWidth: menuLayerBgWidth }} />
          <ul className="menu-layer" onMouseLeave={() => handleEvent(sliderPosition, "mouseLeave")}>
            {menuItems.map((item) => (
              <li key={item.ID} className="menu-item" onMouseEnter={() => handleEvent(item.ID, "mouseEnter")}>
                <Link to={item.link}>
                  <p onClick={() => handleEvent(item.ID, "click")} className="menu-item-label" style={{ color: item.color }}>
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
/*
//根據URL更新header背景顏色
const updateContainerColor = useCallback((pathname) => {
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
