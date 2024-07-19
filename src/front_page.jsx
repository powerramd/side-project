import { useEffect, useRef, useState } from "react";
import Cat from "./Cat";
import FrontPageSlogan from "./FrontPageSlogan";
import Marquee from "./Marquee";

function FrontPage() {
  const [scale, setScale] = useState(1);
  const showProductRef = useRef(null)

  useEffect(() => {
    function sticky() {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
      const newScrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
console.log(newScrollPercentage)

      if (newScrollPercentage < 10) {
        setScale(1);
      } else if (newScrollPercentage > 10) { 
        setScale(0.8);
      }
    }

    window.addEventListener("scroll", sticky);
    return () => {
      window.removeEventListener("scroll", sticky);
    };
  }, []);
  const introduceContainerStyle = {
    transform: `matrix(${scale}, 0, 0, ${scale}, 0, 0)`,
    transition: `0.4s all ease-in-out`,
  };

  return (
    <>
      <main className="home-container">
        <section className="introduce">
          <figure className="introduce-container" style={introduceContainerStyle}>
            <Cat />
            <FrontPageSlogan />
          </figure>
        </section>
        <section className="show-product" ref={ showProductRef}>
          <Marquee prpos={ showProductRef}></Marquee>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default FrontPage;
