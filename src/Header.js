import { Link, useLocation } from "react-router-dom";
import { useState ,useLayoutEffect} from "react";
import { Logo, User } from './picture/images.js';
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
    //選單文字標籤顏色<p>
    const [menuItemsColors, setMenuItemsColors] = useState(["black", "white", "white", "white", "white"]);
    //選單物件
    const menuItems = [
        { label: "首頁", link: "/side-project", style: { color: menuItemsColors } },
        { label: "吊飾", link: "/side-project1", style: { color: menuItemsColors } },
        { label: "貼紙", link: "/side-project2", style: { color: menuItemsColors } },
        { label: "玩偶", link: "/side-project3", style: { color: menuItemsColors } },
        { label: "燈飾", link: "/side-project4", style: { color: menuItemsColors } }
    ];

    //根據URL切換滑塊的位置，location.pathname表示當前 URL 的路徑部分。例如，如果當前 URL 是 http://localhost:3000/side-project1，則 location.pathname 將返回 /side-project1
    useLayoutEffect(() => {
        let newPosition = 0;
        switch (location.pathname) {
            case "/side-project1":
                newPosition = 1;
                break;
            case "/side-project2":
                newPosition = 2;
                break;
            case "/side-project3":
                newPosition = 3;
                break;
            case "/side-project4":
                newPosition = 4;
                break;
            default:
                break;
        }
        setTransition("none");
        setSliderTransform(newPosition);
        setSliderPosition(newPosition);
        setMenuItemsColors(prevColors => prevColors.map((_color, index) => index === newPosition ? "black" : "white"));
    }, [location.pathname, sliderPosition]);
    /*[location.pathname, sliderPosition] 是作為 useEffect 鉤子的第二個參數，用來指定 useEffect 鉤子的依賴項。當這些依賴項(location.pathname, sliderPosition)中的任何一個發生變化時，useEffect 中的回調函數就會被執行。*/


    /*將 handleClick、handleMouseEnter 和 handleMouseLeave 三個函數合併為 handleSliderEvent 函數，並根據事件的類型來執行相應的操作*/
    function handleSliderEvent(number, eventType) {
        switch (eventType) {
            case 'click':
                setTransition(".225s all ease-out");
                setSliderPosition(number);//紀錄當前頁面滑塊的位置
                setMenuItemsColors(prevColors => prevColors.map((_color, index) => index === number ? "black" : "white"));
                break;
            case 'mouseEnter':
                setTransition(".225s all ease-out");
                setSliderTransform(number);//移動滑塊
                setMenuItemsColors(prevColors => prevColors.map((_color, index) => index === number ? "black" : "white"));
                break;
            case 'mouseLeave':
                setTransition(".225s all ease-out");
                setSliderTransform(sliderPosition);//滑鼠離開時滑塊恢復到當前頁面的位置sliderPosition
                setMenuItemsColors(prevColors => prevColors.map((_color, index) => index === number ? "black" : "white"));
                break;
            default:
                break;
        }
    }

    return (
        <div className="nav-menu-container">
            <div className="logo-container">
                <Link to="/side-project" >
                    <img className="logo" src={Logo} alt="logo"></img>
                </Link>
            </div>
            <div className="menu-layer-container">
                <div className="menu-layer-bg">
                    <ul className="menu-layer" onMouseLeave={() => handleSliderEvent(sliderPosition, 'mouseLeave')}>
                        {menuItems.map((item, index) => (
                            <li key={index} className="menu-item" onMouseEnter={() => handleSliderEvent(index, 'mouseEnter')}>
                                <Link to={item.link}>
                                    <p onClick={() => handleSliderEvent(index, 'click')} className="menu-item-label" style={{ color: menuItemsColors[index] }}>{item.label}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div id="slider" style={{ transform: `translateX(${6.5 * sliderTransform}em)`, transition: transition }}></div>
                </div>
            </div>
            <div className="login-container" >
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