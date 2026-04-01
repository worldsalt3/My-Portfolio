"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Animate percentage counter
    const counter = { value: 0 };
    tl.to(
      counter,
      {
        value: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.textContent = `${Math.floor(counter.value)}`;
          }
        },
      },
      0,
    );

    // Draw horizontal line across center
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
      0,
    );

    // Fade in monogram
    tl.fromTo(
      monogramRef.current,
      { opacity: 0, y: 10, letterSpacing: "0.5em" },
      {
        opacity: 1,
        y: 0,
        letterSpacing: "0.3em",
        duration: 0.8,
        ease: "power2.out",
      },
      0.4,
    );

    // Fade in name
    tl.fromTo(
      nameRef.current,
      { opacity: 0 },
      { opacity: 0.4, duration: 0.6, ease: "power2.out" },
      0.8,
    );

    // Collapse line to center
    tl.to(
      lineRef.current,
      {
        scaleX: 0,
        duration: 0.4,
        ease: "power3.in",
      },
      2.1,
    );

    // Fade out monogram and name
    tl.to(
      [monogramRef.current, nameRef.current, percentRef.current?.parentElement],
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      2.1,
    );

    // Split screen apart
    tl.to(
      topHalfRef.current,
      {
        yPercent: -100,
        duration: 0.7,
        ease: "power3.inOut",
      },
      2.4,
    );

    tl.to(
      bottomHalfRef.current,
      {
        yPercent: 100,
        duration: 0.7,
        ease: "power3.inOut",
      },
      2.4,
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300]"
      aria-hidden="true"
    >
      {/* Top half */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#050505]"
      />
      {/* Bottom half */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050505]"
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Monogram */}
        <div
          ref={monogramRef}
          className="text-3xl md:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3] tracking-[0.3em] opacity-0"
        >
          RH
        </div>

        {/* Horizontal line */}
        <div
          ref={lineRef}
          className="w-[120px] md:w-[200px] h-[1px] bg-[#e8e6e3]/40 mt-4 origin-center"
          style={{ transform: "scaleX(0)" }}
        />

        {/* Name */}
        <div
          ref={nameRef}
          className="mt-4 text-[10px] md:text-xs font-[family-name:var(--font-space-grotesk)] tracking-[0.4em] uppercase text-[#e8e6e3]/40 opacity-0"
        >
          Riliwan Hassan
        </div>
      </div>

      {/* Percentage counter */}
      <div className="absolute bottom-8 right-8 z-10 font-[family-name:var(--font-fira-code)] text-xs text-[#e8e6e3]/30">
        <span ref={percentRef}>0</span>
      </div>
    </div>
  );
}
