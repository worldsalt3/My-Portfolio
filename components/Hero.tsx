"use client";

import { useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const FIRST_NAME = "RILIWAN";
const LAST_NAME = "HASSAN";
const ROLES = [
  "Senior Frontend Engineer",
  "React Architect",
  "Technical Lead",
  "UI/UX Engineer",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const roleIndex = useRef(0);

  // Mouse parallax
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textLayer = section.querySelector("[data-parallax]") as HTMLElement;
    if (!textLayer) return;

    const xTo = gsap.quickTo(textLayer, "x", {
      duration: 0.5,
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(textLayer, "y", {
      duration: 0.5,
      ease: "power2.out",
    });

    function onMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      xTo(x);
      yTo(y);
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.2 }); // After preloader

    // Animate first name letters
    if (firstNameRef.current) {
      const chars = firstNameRef.current.querySelectorAll("span");
      tl.fromTo(
        chars,
        { opacity: 0, y: 80, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
        },
        0,
      );
    }

    // Animate last name letters
    if (lastNameRef.current) {
      const chars = lastNameRef.current.querySelectorAll("span");
      tl.fromTo(
        chars,
        { opacity: 0, y: 80, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
        },
        0.15,
      );
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.6,
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1,
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Role typewriter
  useEffect(() => {
    const el = roleRef.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout>;

    function typeRole() {
      const role = ROLES[roleIndex.current % ROLES.length];
      el!.textContent = "";
      let i = 0;

      function typeChar() {
        if (i < role.length) {
          el!.textContent += role[i];
          i++;
          timeout = setTimeout(typeChar, 60);
        } else {
          timeout = setTimeout(eraseRole, 2000);
        }
      }

      function eraseRole() {
        if (el!.textContent && el!.textContent.length > 0) {
          el!.textContent = el!.textContent.slice(0, -1);
          timeout = setTimeout(eraseRole, 30);
        } else {
          roleIndex.current++;
          timeout = setTimeout(typeRole, 400);
        }
      }

      typeChar();
    }

    const startTimeout = setTimeout(typeRole, 4000); // Start after entrance anim

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, []);

  // Fade scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        const opacity = Math.max(0, 1 - window.scrollY / 300);
        scrollIndicatorRef.current.style.opacity = String(opacity);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const firstNameChars = useMemo(
    () =>
      FIRST_NAME.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block opacity-0"
          style={{ perspective: "600px" }}
        >
          {char}
        </span>
      )),
    [],
  );

  const lastNameChars = useMemo(
    () =>
      LAST_NAME.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block opacity-0"
          style={{ perspective: "600px" }}
        >
          {char}
        </span>
      )),
    [],
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <Scene3D />

      {/* Text Layer */}
      <div data-parallax className="relative z-10 text-center px-6">
        {/* Name */}
        <div className="mb-2">
          <div
            ref={firstNameRef}
            className="text-[clamp(3rem,10vw,8rem)] font-[family-name:var(--font-space-grotesk)] font-bold leading-[0.9] tracking-tighter text-[#e8e6e3]"
          >
            {firstNameChars}
          </div>
          <div
            ref={lastNameRef}
            className="text-[clamp(3rem,10vw,8rem)] font-[family-name:var(--font-space-grotesk)] font-bold leading-[0.9] tracking-tighter text-[#e8e6e3] ml-[0.05em]"
          >
            {lastNameChars}
          </div>
        </div>

        {/* Subtitle with typewriter */}
        <div ref={subtitleRef} className="mt-6 opacity-0">
          <div className="inline-flex items-center gap-3 text-lg md:text-xl text-[#8a8a8a] font-[family-name:var(--font-space-grotesk)]">
            <span className="w-8 h-[1px] bg-[#8a8a8a]/40" />
            <span ref={roleRef} className="font-light" />
            <span className="w-[2px] h-5 bg-[#6366f1] animate-pulse" />
          </div>
        </div>

        {/* Status badge */}
        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1a1a1a] bg-[#0f0f0f]/50">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs text-[#8a8a8a] tracking-wide">
            Available for opportunities
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-[#6366f1] text-white text-sm font-medium rounded-full hover:bg-[#5558e6] transition-colors duration-300"
            data-cursor-label="View"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-[#e8e6e3]/20 text-[#e8e6e3] text-sm font-medium rounded-full hover:border-[#e8e6e3]/40 transition-colors duration-300"
            data-cursor-label="Contact"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#8a8a8a]/60">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#8a8a8a]/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
