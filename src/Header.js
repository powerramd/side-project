import { Link } from "react-router-dom";
import Logo from "./picture/logo.png";
import User from "./picture/user.png";
import { useState } from "react";


function Header() {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [sliderTransform, setSliderTransform] = useState(0)
    const menuItems = [
        { label: "首頁", link: "/side-project" },
        { label: "吊飾", link: "/side-project1" },
        { label: "貼紙", link: "/side-project2" },
        { label: "玩偶", link: "/side-project3" },
        { label: "燈飾", link: "/side-project4" }
    ];

    /*滑快也可以使用以下方式進行移動，但因為直接操作了DOM，違反了Recat的開發原則，所以我改使用react virtual dom。
    function getSliderElement() {
        return document.getElementById('slider')
    }

    function moveSlider(number) {
        const slider = getSliderElement()
        slider.style.transform = `translateX(calc(var(--menu-width) * ${number}))`
        console.log(parseFloat(window.getComputedStyle(slider).transform.match(/matrix\((.+)\)/)[1].split(', ')[4]))
        console.log(window.getComputedStyle(slider).transform.match(/matrix\((.+)\)/)[1].split(', '))
        console.log(window.getComputedStyle(slider).transform)
    
    */

    function handleClick(number) {
        setSliderTransform(number)
        setSliderPosition(number)
        //moveSlider(number)
    };
    function handleMouseEnter(number) {
        setSliderTransform(number)
        //moveSlider(number)

    };
    function handleMouseLeave() {
        setSliderTransform(sliderPosition)
        //moveSlider(sliderPosition)
    };

    return (
        <div className="nav-menu-container">
            <div className="logo-container">
                <Link to="/side-project" >
                    <img className="logo" src={Logo} alt="logo"></img>
                </Link>
            </div>
            <div className="menu-layer-container">
                <div className="menu-layer-bg">
                    <ul className="menu-layer" onMouseLeave={handleMouseLeave}>
                        {menuItems.map((item, index) => (
                            <li key={index} className="menu-item" onMouseEnter={() => handleMouseEnter(index)}>
                                <Link to={item.link}>
                                    <p onClick={() => handleClick(index)} className="menu-item-label">{item.label}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div id="slider" style={{ transform: `translateX(${6.5 * sliderTransform}em)` }}></div>
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
