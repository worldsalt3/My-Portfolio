"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!progressRef.current || !dotRef.current) return;

    // Full page progress on the side rail
    gsap.to(progressRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => {
          if (dotRef.current) {
            dotRef.current.style.top = `${self.progress * 100}%`;
          }
          if (labelRef.current) {
            labelRef.current.style.top = `${self.progress * 100}%`;
          }
        },
      },
    });

    // Show rail only after hero
    if (railRef.current) {
      gsap.fromTo(
        railRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: document.documentElement,
            start: "200px top",
            end: "300px top",
            scrub: true,
          },
        },
      );
    }

    // Track active section
    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActiveSection(section.label);
        },
      });
    });
  }, []);

  return (
    <div
      ref={railRef}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed right-4 top-[10vh] z-40 h-[80vh] w-[2px] bg-[#1a1a1a] rounded-full opacity-0 hidden md:block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Progress fill */}
      <div
        ref={progressRef}
        className="w-full h-full bg-gradient-to-b from-[#6366f1] to-[#a855f7] rounded-full origin-top"
        style={{ transform: "scaleY(0)" }}
      />
      {/* Moving dot */}
      <div
        ref={dotRef}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#6366f1] shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-transform duration-200"
        style={{ top: "0%" }}
      />
      {/* Section label on hover */}
      <div
        ref={labelRef}
        className={`absolute right-5 -translate-y-1/2 pointer-events-none transition-opacity duration-200 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ top: "0%" }}
      >
        <span className="text-[11px] text-[#e8e6e3] bg-[#0f0f0f] border border-[#1a1a1a] px-2.5 py-1 rounded-md whitespace-nowrap font-[family-name:var(--font-fira-code)]">
          {activeSection}
        </span>
      </div>
    </div>
  );
}
