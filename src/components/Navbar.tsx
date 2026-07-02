import { useEffect, useState, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }, []);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: isTouchDevice() ? 1 : 1.7,
      speed: isTouchDevice() ? 1 : 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });

    // Mobile nav links
    const mobileLinks = document.querySelectorAll(".nav-mobile-overlay a");
    mobileLinks.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, [closeMobileMenu]);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <img src="/images/profile.jpg" alt="MZ Profile" className="navbar-profile-pic" />
        </a>
        <a
          href="https://www.linkedin.com/in/mohd98zaid/"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/mohd98zaid
        </a>

        {/* Hamburger button - mobile only */}
        <button
          className={`navbar-hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop nav */}
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile nav overlay */}
      <div className={`nav-mobile-overlay ${mobileMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#about" onClick={closeMobileMenu}>ABOUT</a>
          </li>
          <li>
            <a href="#work" onClick={closeMobileMenu}>WORK</a>
          </li>
          <li>
            <a href="#contact" onClick={closeMobileMenu}>CONTACT</a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/mohd98zaid/"
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
