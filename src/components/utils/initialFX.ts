import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  // Fade in the teal h2 block that will contain the rotating text
  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Split the three text strings
  var text1 = new SplitText(".landing-h2-1", TextProps); // "Architect"
  var text2 = new SplitText(".landing-h2-2", TextProps); // "Agentic AI"
  var text3 = new SplitText(".landing-h2-3", TextProps); // "LLM Engineer"
  
  // Immediately hide texts 2 and 3 so they start off-screen
  gsap.set(text2.chars, { y: 80, opacity: 0 });
  gsap.set(text3.chars, { y: 80, opacity: 0 });

  // Explicitly set text1 visible state
  gsap.set(text1.chars, { y: 0, opacity: 1 });

  // Start rotation
  LoopThreeTexts(text1, text2, text3);
}

/**
 * Animates three text elements in sync so they cycle sequentially.
 * Uses y-position + overflow:hidden (.split-h2) as a clipping mask,
 * combined with opacity transitions for clean fade-in and fade-out effects.
 */
function LoopThreeTexts(
  Text1: SplitText,
  Text2: SplitText,
  Text3: SplitText
) {
  const exitDuration = 0.5;
  const enterDuration = 0.7;
  const holdDuration  = 4.0;  // seconds each text stays visible
  const gapDuration   = 0.15; // brief blank gap between exit and enter

  const maxExitChars1 = Text1.chars.length;
  const maxExitChars2 = Text2.chars.length;
  const maxExitChars3 = Text3.chars.length;

  const totalExitTime1 = exitDuration + maxExitChars1 * 0.04;
  const totalExitTime2 = exitDuration + maxExitChars2 * 0.04;
  const totalExitTime3 = exitDuration + maxExitChars3 * 0.04;

  const t1 = holdDuration;
  const t2 = t1 + totalExitTime1 + gapDuration;
  const t3 = t2 + holdDuration;
  const t4 = t3 + totalExitTime2 + gapDuration;
  const t5 = t4 + holdDuration;
  const t6 = t5 + totalExitTime3 + gapDuration;

  const tl = gsap.timeline({ repeat: -1, delay: 3 });

  // Ensure initial states are locked in at the very start of the timeline loop
  tl.set(Text1.chars, { y: 0, opacity: 1, immediateRender: false }, 0)
    .set(Text2.chars, { y: 80, opacity: 0, immediateRender: false }, 0)
    .set(Text3.chars, { y: 80, opacity: 0, immediateRender: false }, 0)

  // ── Exit Text 1 ──────
  tl.to(Text1.chars, { y: -80, opacity: 0, duration: exitDuration, ease: "power2.in", stagger: 0.04 }, t1)
    .set(Text2.chars, { y: 80, opacity: 0, immediateRender: false }, t2 - 0.01)

  // ── Enter Text 2 ──────
    .to(Text2.chars, { y: 0, opacity: 1, duration: enterDuration, ease: "power3.out", stagger: 0.05 }, t2)

  // ── Exit Text 2 ──────
    .to(Text2.chars, { y: -80, opacity: 0, duration: exitDuration, ease: "power2.in", stagger: 0.04 }, t3)
    .set(Text3.chars, { y: 80, opacity: 0, immediateRender: false }, t4 - 0.01)

  // ── Enter Text 3 ──────
    .to(Text3.chars, { y: 0, opacity: 1, duration: enterDuration, ease: "power3.out", stagger: 0.05 }, t4)

  // ── Exit Text 3 ──────
    .to(Text3.chars, { y: -80, opacity: 0, duration: exitDuration, ease: "power2.in", stagger: 0.04 }, t5)
    .set(Text1.chars, { y: 80, opacity: 0, immediateRender: false }, t6 - 0.01)

  // ── Enter Text 1 ──────
    .to(Text1.chars, { y: 0, opacity: 1, duration: enterDuration, ease: "power3.out", stagger: 0.05 }, t6);
}

