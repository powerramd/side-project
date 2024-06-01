import { Link } from "react-router-dom";
import Logo from "./picture/logo.png";
import User from "./picture/user.png";
import { useState } from "react";


function Header() {
    const [SliderTransform, setSliderTransform] = useState(0);

    function getSliderElement() {
        return document.getElementById('slider')
    }

    function moveSlider(number) {
        const slider = getSliderElement()
        slider.style.transform = `translateX(calc(var(--menu-width) * ${number}))`
       /* console.log(parseFloat(window.getComputedStyle(slider).transform.match(/matrix\((.+)\)/)[1].split(', ')[4]))
        console.log(window.getComputedStyle(slider).transform.match(/matrix\((.+)\)/)[1].split(', '))
        console.log(window.getComputedStyle(slider).transform)*/
    }

    function HandleClick(number) {
        moveSlider(number)
        setSliderTransform(number)
    };
    function HandleMouseEnter (number){
        moveSlider(number)

    };
    function HandleMouseLeave(){
        moveSlider(SliderTransform)
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
                <ul className="menu-layer">
                    <li className="menu-item" onMouseEnter={() => HandleMouseEnter("0")} onMouseLeave={HandleMouseLeave}>
                        <Link to="/side-project" >
                        <p onClick={() => HandleClick("0")} className="menu-item-label"> 吊飾</p>
                        </Link>
                    </li>
                    <li className="menu-item" onMouseEnter={() => HandleMouseEnter("1")} onMouseLeave={HandleMouseLeave}>
                        <Link to="/side-project">
                        <p onClick={() => HandleClick("1")} className="menu-item-label">貼紙</p>
                        </Link>
                    </li>
                    <li className="menu-item" onMouseEnter={() => HandleMouseEnter("2")} onMouseLeave={HandleMouseLeave}>
                        <Link to="/side-project">
                        <p onClick={() => HandleClick("2")} className="menu-item-label">玩偶</p>
                        </Link>
                    </li>
                    <li className="menu-item" onMouseEnter={() => HandleMouseEnter("3")} onMouseLeave={HandleMouseLeave}>
                        <Link to="/side-project">
                        <p onClick={() => HandleClick("3")} className="menu-item-label">燈飾</p>
                        </Link>
                    </li>
                </ul>
                <div id="slider"></div>
            </div>
        </div>
        <div className="login-container">
            <Link to="/sing">
            <img className="user-icon" src={User} alt="user"></img>
            </Link>
        </div>
    </div>
  );
}

export default Header;
