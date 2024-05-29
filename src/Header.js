/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import Logo from "./picture/logo.png";
import User from "./picture/user.png";

//取得選單滑塊
function handleClick(number) {
    const slider = document.getElementById('navigation-menu-top-layer-container-backgroundColor-after');
    slider.style.transform= "translateX(calc(var(--menu-background-width) * (" + number +"))";
}

function Header() {
    
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
                    <li className="navigation-menu-item" >
                        <Link to="/side-project" >
                        <a onClick={() => handleClick("0")} className="navigation-menu-item-label"> 吊飾</a>
                        </Link>
                    </li>
                    <li className="navigation-menu-item">
                        <Link to="/side-project">
                        <a onClick={() => handleClick("1")} className="navigation-menu-item-label">貼紙</a>
                        </Link>
                    </li>
                    <li className="navigation-menu-item">
                        <Link to="/side-project">
                        <a onClick={() => handleClick("2")} className="navigation-menu-item-label">玩偶</a>
                        </Link>
                    </li>
                    <li className="navigation-menu-item">
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
