import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import CursorFollow from "./CursorFollow";
import Header from "./Header";
import FrontPage from "./front_page";
import Test from "./Test";
import Test3 from "./Test3";
import HorizontalScroll from "./HorizontalScroll";
import Test4 from "./Test4";

function App() {
  const [cursorEliminateSwitch, setCursorEliminateSwitch] = useState("rgba(139, 0, 0,0.7)");

  function updatecursorEliminate(isHover) {
    if (isHover) {
      // console.log(isHover)
      setCursorEliminateSwitch("rgba(139, 0, 0,0)");
    } else {
      setCursorEliminateSwitch("rgba(139, 0, 0,0.7)");
      // console.log(isHover)
    }
  }

  return (
    <BrowserRouter>
      <Header onUpdatecursorEliminate={updatecursorEliminate} />
      <CursorFollow propsSetcursorEliminateSwitch={cursorEliminateSwitch} />
      <Routes>
        <Route path="/side-project" exact element={<FrontPage />}></Route>
        <Route path="/side-project1" exact element={<Test />}></Route>
        <Route path="/side-project2" exact element={<HorizontalScroll />}></Route>
        <Route path="/side-project3" exact element={<Test3 />}></Route>
        <Route path="/side-project4" exact element={<Test4 />}></Route>
        <Route path="/side-project5" exact element={<p>測試5</p>}></Route>
        <Route path="/login" exact element={<p>註冊登入</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
