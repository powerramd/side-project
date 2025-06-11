import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import FrontPage from "./front_page";
import SvgPathDrawing from "./Test/SvgPathDrawing";
import Test from "./Test/Test";
import HorizontalScroll from "./HorizontalScroll";
import { CursorProvider } from "./CursorContext.jsx";
import InfiniteCarousel from "./Test/InfiniteCarousel.jsx";
import Inventory from "./InventoryTable.tsx";


function App() {
  return (
    <BrowserRouter>
      <CursorProvider>
        <Header />
        <Routes>
          <Route path="/side-project" exact element={<FrontPage />}></Route>
          <Route path="/side-project1" exact element={<HorizontalScroll />}></Route>
          <Route path="/side-project2" exact element={<SvgPathDrawing />}></Route>
          <Route path="/side-project3" exact element={<Test />}></Route>
          <Route path="/side-project4" exact element={<InfiniteCarousel />}></Route>
          <Route path="/side-project5" exact element={<p>123</p>}></Route>
          <Route path="/side-project6" exact element={<><Inventory /><Inventory /><Inventory /><Inventory /><Inventory /></>}></Route>
          <Route path="/login" exact element={<p>login</p>}></Route>
        </Routes>
      </CursorProvider>
    </BrowserRouter>
  );
}

export default App;
