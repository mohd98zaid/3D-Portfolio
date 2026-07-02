import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import setSplitText from "./utils/splitText";

const About = lazy(() => import("./About"));
const Career = lazy(() => import("./Career"));
const Contact = lazy(() => import("./Contact"));
const WhatIDo = lazy(() => import("./WhatIDo"));
const Work = lazy(() => import("./Work"));
const TechStack = lazy(() => import("./TechStack"));

const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [isTouch, setIsTouch] = useState<boolean>(isTouchDevice());

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
      setIsTouch(isTouchDevice());
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <Suspense fallback={<div className="fallback-loader">Loading content...</div>}>
              <About />
              <WhatIDo />
              <Career />
              <Work />
              {/* Hide TechStack on mobile - heavy for touch devices */}
              {isDesktopView && !isTouch && <TechStack />}
              <Contact />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
