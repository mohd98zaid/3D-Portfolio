import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip cursor on touch devices - no mouse, wastes battery
    if (isTouchDevice()) return;

    let hover = false;
    const cursor = cursorRef.current!;
    if (!cursor) return;

    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    let animFrameId: number;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      animFrameId = requestAnimationFrame(loop);
    };
    animFrameId = requestAnimationFrame(loop);

    const cleanupHover: (() => void)[] = [];
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      const onMouseOver = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const onMouseOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };
      element.addEventListener("mouseover", onMouseOver);
      element.addEventListener("mouseout", onMouseOut);
      cleanupHover.push(() => {
        element.removeEventListener("mouseover", onMouseOver);
        element.removeEventListener("mouseout", onMouseOut);
      });
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrameId);
      cleanupHover.forEach((fn) => fn());
    };
  }, []);

  // Don't render cursor element on touch devices
  if (isTouchDevice()) return null;

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
