import { useContext } from "react";
import Cat from "./Cat";
import Marquee from "./Marquee";
import { CursorContext } from "./CursorContext";

function FrontPage() {
  //這個是CursorFollow.jsx的共享狀態
  const { dispatch } = useContext(CursorContext);

  function handleMouseEnter() {
    dispatch({ type: "SET_SCALE", payload: 2 });
    dispatch({ type: "SET_ALPHA", payload: 0.6 });
    dispatch({ type: "SET_FILTER", payload: "" });
  }
  function handleMouseLeave() {
    dispatch({ type: "SET_FILTER", payload: "gooey" });
    dispatch({ type: "SET_SCALE", payload: 1 });
    dispatch({ type: "SET_ALPHA", payload: 1 });
  }

  return (
    <>
      <main className="home-container">
        <section className="introduce">
          <figure className="introduce-container">
            <Cat />
            <h1 className="slogan">
              This cat will sell something
              <p>這隻貓有賣一些小物</p>
              <svg onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="34" cy="34" r="33.5" stroke="black" />
                <path
                  d="M32.2881 50.113C33.0616 50.9015 34.3279 50.9136 35.1163 50.1401L47.9655 37.5345C48.7539 36.761 48.7661 35.4947 47.9925 34.7062C47.219 33.9177 45.9527 33.9056 45.1642 34.6791L33.7428 45.8841L22.5378 34.4627C21.7643 33.6742 20.498 33.6621 19.7095 34.4356C18.9211 35.2091 18.9089 36.4754 19.6825 37.2639L32.2881 50.113ZM32.0001 18.9809L31.7158 48.6933L35.7156 48.7315L35.9999 19.0191L32.0001 18.9809Z"
                  fill="black"
                />
              </svg>
            </h1>
          </figure>
        </section>
        <section className="show-product">
          <Marquee></Marquee>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default FrontPage;
