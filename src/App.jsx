import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import FrontPage from "./front_page";
import SvgPathDrawing from "./Test/SvgPathDrawing";
import Test from "./Test/Test";
import HorizontalScroll from "./HorizontalScroll";
import BlobAnimation from "./Test/BlobAnimation";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/side-project" exact element={<FrontPage />}></Route>
        <Route path="/side-project1" exact element={<HorizontalScroll />}></Route>
        <Route path="/side-project2" exact element={<SvgPathDrawing />}></Route>
        <Route path="/side-project3" exact element={<Test />}></Route>
        <Route path="/side-project4" exact element={<BlobAnimation />}></Route>
        <Route path="/side-project5" exact element={<></>}></Route>
        <Route path="/login" exact element={<p>login</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
