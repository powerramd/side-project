
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import FrontPage from "./front_page";
function App() {
  return (
    <BrowserRouter>
        <Header></Header>
        <Routes>
            <Route path="/" exact element={<FrontPage></FrontPage>}></Route>
            <Route path="/sing" exact element={<p>註冊登入</p>}></Route>
        </Routes>
    </BrowserRouter>    
 );
}

export default App;
