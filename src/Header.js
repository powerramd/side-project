/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import Logo from "./picture/logo.png";
import User from "./picture/user.png";
import { useState } from "react";


function Header() {
    const [SliderTransform, setSliderTransform] = useState(0);

    function handleClick(number) {
        let slider = document.getElementById('navigation-menu-top-layer-container-backgroundColor-after');
        slider.style.transform= "translateX(calc(var(--menu-background-width) * (" + number +"))";
        setSliderTransform(number);
    };
    function handleMouseEnter (number){
        let slider = document.getElementById('navigation-menu-top-layer-container-backgroundColor-after');
        slider.style.transform= "translateX(calc(var(--menu-background-width) * (" + number +"))";

    };
    function handleMouseLeave(){
        let slider = document.getElementById('navigation-menu-top-layer-container-backgroundColor-after');
        slider.style.transform="translateX(calc(var(--menu-background-width) * (" + SliderTransform +"))";
    };
    
  return (
    <div className="avigationBar-menu-container">
        <div className="header_logo-container"> 
             <Link to="/side-project" >
            <img className="header_logo_png" src={Logo} alt="logo"></img> 
            </Link>
        </div>
        <div className="navigation-menu-top-layer-container">
            <div className="navigation-menu-top-layer-container-backgroundColor">
                <ul className="navigation-menu-top-layer">
                    <li className="navigation-menu-item" onMouseEnter={() => handleMouseEnter("0")} onMouseLeave={handleMouseLeave}>
                        <Link to="/side-project" >
                        <a onClick={() => handleClick("0")} className="navigation-menu-item-label"> 吊飾</a>
                        </Link>
                    </li>
                    <li className="navigation-menu-item" onMouseEnter={() => handleMouseEnter("1")} onMouseLeave={handleMouseLeave}>
                        <Link to="/side-project">
                        <a onClick={() => handleClick("1")} className="navigation-menu-item-label">貼紙</a>
                        </Link>
                    </li>
                    <li className="navigation-menu-item" onMouseEnter={() => handleMouseEnter("2")} onMouseLeave={handleMouseLeave}>
                        <Link to="/side-project">
                        <a onClick={() => handleClick("2")} className="navigation-menu-item-label">玩偶</a>
                        </Link>
                    </li>
                    <li className="navigation-menu-item" onMouseEnter={() => handleMouseEnter("3")} onMouseLeave={handleMouseLeave}>
                        <Link to="/side-project">
                        <a onClick={() => handleClick("3")} className="navigation-menu-item-label">燈飾</a>
                        </Link>
                    </li>
                </ul>
                <div id="navigation-menu-top-layer-container-backgroundColor-after"></div>
            </div>
        </div>
        <div className="header_login-container">
            <Link to="/sing">
            <img className="header_logo_png" src={User} alt="user"></img>
            </Link>
        </div>
    </div>
  );
}

export default Header;
