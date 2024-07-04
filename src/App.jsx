import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import FrontPage from "./front_page";
import Test from "./test";
import Test2 from "./test2";
function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/side-project" exact element={<FrontPage></FrontPage>}></Route>
        <Route path="/side-project1" exact element={<Test></Test>}></Route>
        <Route path="/side-project2" exact element={<Test2></Test2>}></Route>
        <Route path="/side-project3" exact element={<p>測試3</p>}></Route>
        <Route path="/side-project4" exact element={<p>測試4</p>}></Route>
        <Route path="/login" exact element={<p>註冊登入</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
