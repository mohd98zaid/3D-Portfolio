import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import HoverLinks from "./HoverLinks";

const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const SocialIcons = () => {
  useEffect(() => {
    // Skip mouse-follow animation on touch devices
    if (isTouchDevice()) return;

    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const cleanupFns: (() => void)[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      let animFrameId: number;
      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        animFrameId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      cleanupFns.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animFrameId);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  const [resumeData, setResumeData] = useState({
    url: "/Zaid_GenAI_CV.pdf",
    filename: "Zaid_GenAI_CV.pdf",
  });

  useEffect(() => {
    const CACHE_KEY = "country_code";
    const CACHE_TTL = 86400000; // 24 hours

    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { country, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        const gccCountries = ["SA", "AE", "QA", "KW", "BH", "OM"];
        if (gccCountries.includes(country)) {
          setResumeData({
            url: "/Zaid_GenAI_CV_Gulf_GCC.pdf",
            filename: "Zaid_GenAI_CV_Gulf_GCC.pdf",
          });
        }
        return;
      }
    }

    fetch("https://api.country.is/")
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ country: data.country, timestamp: Date.now() })
        );
        const gccCountries = ["SA", "AE", "QA", "KW", "BH", "OM"];
        if (gccCountries.includes(data.country)) {
          setResumeData({
            url: "/Zaid_GenAI_CV_Gulf_GCC.pdf",
            filename: "Zaid_GenAI_CV_Gulf_GCC.pdf",
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/mohd98zaid"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/mohd98zaid/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="mailto:mohd98zaid@gmail.com"
            aria-label="Email"
          >
            <MdEmail />
          </a>
        </span>
        <span>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </span>
      </div>
      <a className="resume-button" href={resumeData.url} target="_blank" rel="noreferrer" aria-label="Download Resume">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
