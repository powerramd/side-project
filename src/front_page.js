import { pendant1 } from './picture/images.js';
// import pendant1 from "./picture/pendant1.jpg";
function FrontPage() {
return(
    <div className="CustomPage">
        <div className="Grid-row-wrapper">
            <div className="Grid-row-wrapper-div">
                <img className="Grid-row-wrapper-img" src={pendant1} alt=""></img>
            </div>
            <div className="Grid-row-wrapper-div">
                <img className="Grid-row-wrapper-img" src={pendant1} alt=""></img>
            </div>
            <div className="Grid-row-wrapper-div">
                <img className="Grid-row-wrapper-img" src={pendant1} alt=""></img>
            </div>
            <div className="Grid-row-wrapper-div">
                <img className="Grid-row-wrapper-img" src={pendant1} alt=""></img>
            </div>
            <div className="Grid-row-wrapper-div">
                <img className="Grid-row-wrapper-img" src={pendant1} alt=""></img>
            </div>
            {/* <a href="/">我出門買吃的，沒帶手機，等等回來</a> */}
        </div>
    </div>
    )
}

export default FrontPage;