import React, { useEffect, useRef } from "react";

function Test2() {
    const horizonRef = useRef(null);

    useEffect(() => {
        function getProgress(element) {
            var rect = element.getBoundingClientRect();
            var progress = -(rect.top / (element.clientHeight - window.innerHeight));
            if (progress <= 0) {
                progress = 0;
            } else if (progress >= 1) {
                progress = 1;
            }
            return progress;
        }

        function handleScroll() {
            console.log("Scroll event triggered!");
            if (horizonRef.current) {
                horizonRef.current.children[0].scrollLeft = getProgress(horizonRef.current) * window.innerWidth * 4;
            }
        }

        console.log("Adding scroll event listener...");
        window.addEventListener("scroll", handleScroll);

        return () => {
            console.log("Removing scroll event listener...");
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <section className="section -a">
                <div className="section__text">👇 SCROLL DOWN 👇</div>
            </section>
            <section className="section -b -horizon" ref={horizonRef}>
                <div className="section__horizon">
                    <div className="section__horizon-block"><span>HORIZONTAL 👉</span></div>
                    <div className="section__horizon-block"><span>HORIZONTAL 🥰</span></div>
                    <div className="section__horizon-block"><span>HORIZONTAL 😘</span></div>
                    <div className="section__horizon-block"><span>HORIZONTAL 🎉</span></div>
                    <div className="section__horizon-block"><div>🏄 OH YA BABY 🏄</div></div>
                </div>
            </section>
            <section className="section -c">
                <div className="section__text">
                    ES Design Loves Egg<br />
                    <a href="https://e-s.tw">Made by ES Design</a>
                </div>
            </section>
        </>
    );
}

export default Test2;
