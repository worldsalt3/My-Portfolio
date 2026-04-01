"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TagName = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

interface TextRevealProps {
  children: string;
  as?: TagName;
  mode?: "lines" | "words" | "chars";
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  scrub?: boolean;
}

export default function TextReveal({
  children,
  as = "div",
  mode = "words",
  className = "",
  stagger,
  delay = 0,
  once = true,
  scrub = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const defaultStagger =
    mode === "chars" ? 0.02 : mode === "words" ? 0.04 : 0.08;
  const actualStagger = stagger ?? defaultStagger;

  const elements = useMemo(() => {
    if (mode === "chars") {
      return children.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }
    if (mode === "words") {
      return children.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em]"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          {word}
        </span>
      ));
    }
    // lines mode — split by newlines or treat as single line
    const lines = children.split("\n").filter(Boolean);
    return lines.map((line, i) => (
      <span key={i} className="block overflow-hidden">
        <span
          className="block"
          style={{ opacity: 0, transform: "translateY(100%)" }}
        >
          {line}
        </span>
      </span>
    ));
  }, [children, mode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const targets = containerRef.current.querySelectorAll(
      mode === "lines" ? "span > span" : "span",
    );

    if (targets.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: scrub ? "bottom 20%" : undefined,
        once: once && !scrub,
        scrub: scrub ? 1 : false,
        toggleActions: scrub ? undefined : "play none none none",
      },
      delay,
    });

    tl.fromTo(
      targets,
      {
        opacity: 0,
        y: mode === "lines" ? "100%" : 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: mode === "lines" ? 0.6 : 0.5,
        stagger: actualStagger,
        ease: "power3.out",
      },
    );

    return () => {
      tl.kill();
    };
  }, [mode, actualStagger, delay, once, scrub]);

  const Tag = as;
  return (
    <Tag ref={containerRef as React.Ref<never>} className={className}>
      {elements}
    </Tag>
  );
}
