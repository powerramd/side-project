import { Link } from "react-router-dom";
import Logo from "./picture/logo.png";
import User from "./picture/user.png";
import { useState } from "react";


function Header() {
    const [SliderTransform, setSliderTransform] = useState(0);
    const [MoveSlider, setMoveSlider] = useState(0)

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
    }
    */

    function HandleClick(number) {
        setMoveSlider(number)
        setSliderTransform(number)
        //moveSlider(number)
    };
    function HandleMouseEnter(number) {
        setMoveSlider(number)
        //moveSlider(number)

    };
    function HandleMouseLeave() {
        setMoveSlider(SliderTransform)
        //moveSlider(SliderTransform)
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
                    <ul className="menu-layer" onMouseLeave={HandleMouseLeave}>
                        <li className="menu-item" onMouseEnter={() => HandleMouseEnter("0")}>
                            <Link to="/side-project" >
                            <p onClick={() => HandleClick("0")} className="menu-item-label">首頁</p>
                            </Link>
                        </li>
                        <li className="menu-item" onMouseEnter={() => HandleMouseEnter("1")}>
                            <Link to="/side-project" >
                            <p onClick={() => HandleClick("1")} className="menu-item-label">吊飾</p>
                            </Link>
                        </li>
                        <li className="menu-item" onMouseEnter={() => HandleMouseEnter("2")}>
                            <Link to="/side-project">
                            <p onClick={() => HandleClick("2")} className="menu-item-label">貼紙</p>
                            </Link>
                        </li>
                        <li className="menu-item" onMouseEnter={() => HandleMouseEnter("3")}>
                            <Link to="/side-project">
                            <p onClick={() => HandleClick("3")} className="menu-item-label">玩偶</p>
                            </Link>
                        </li>
                        <li className="menu-item" onMouseEnter={() => HandleMouseEnter("4")}>
                            <Link to="/side-project">
                            <p onClick={() => HandleClick("4")} className="menu-item-label">燈飾</p>
                            </Link>
                        </li>
                    </ul>
                    <div id="slider" style={{ transform: "translateX(" + 6.5 * (MoveSlider) + "em)" }}></div>
                </div>
            </div>
            <div className="login-container" >
                <Link to="/sing">
                    <img className="user-icon" src={User} alt="user"></img>
                </Link>
            </div>
        </div>
    );
}

export default Header;
