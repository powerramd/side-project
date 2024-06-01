import { Link } from "react-router-dom";
import Logo from "./picture/logo.png";
import User from "./picture/user.png";
import { useState } from "react";


function Header() {
    const [SliderTransform, setSliderTransform] = useState(0);

    function HandleClick(number) {
        let slider = document.getElementById('slider');
        slider.style.transform= "translateX(calc(var(--menu-background-width) * (" + number +")))";
        setSliderTransform(number);
    };
    function HandleMouseEnter (number){
        let slider = document.getElementById('slider');
        slider.style.transform= "translateX(calc(var(--menu-background-width) * (" + number +")))";

    };
    function HandleMouseLeave(){
        let slider = document.getElementById('slider');
        slider.style.transform="translateX(calc(var(--menu-background-width) * (" + SliderTransform +")))";
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
                    <li className="navigation-menu-item" onMouseEnter={() => HandleMouseEnter("0")} onMouseLeave={HandleMouseLeave}>
                        <Link to="/side-project" >
                        <p onClick={() => HandleClick("0")} className="navigation-menu-item-label"> 吊飾</p>
                        </Link>
                    </li>
                    <li className="navigation-menu-item" onMouseEnter={() => HandleMouseEnter("1")} onMouseLeave={HandleMouseLeave}>
                        <Link to="/side-project">
                        <p onClick={() => HandleClick("1")} className="navigation-menu-item-label">貼紙</p>
                        </Link>
                    </li>
                    <li className="navigation-menu-item" onMouseEnter={() => HandleMouseEnter("2")} onMouseLeave={HandleMouseLeave}>
                        <Link to="/side-project">
                        <p onClick={() => HandleClick("2")} className="navigation-menu-item-label">玩偶</p>
                        </Link>
                    </li>
                    <li className="navigation-menu-item" onMouseEnter={() => HandleMouseEnter("3")} onMouseLeave={HandleMouseLeave}>
                        <Link to="/side-project">
                        <p onClick={() => HandleClick("3")} className="navigation-menu-item-label">燈飾</p>
                        </Link>
                    </li>
                </ul>
                <div id="slider"></div>
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
