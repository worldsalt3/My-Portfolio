"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  outlined?: boolean;
  className?: string;
}

export default function Marquee({
  text,
  speed = 30,
  direction = "left",
  outlined = false,
  className = "",
}: MarqueeProps) {
  const repeats = 6;
  const repeated = Array(repeats).fill(text).join(" ");
  const containerRef = useRef<HTMLDivElement>(null);
  const [velocity, setVelocity] = useState(1);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let raf: number;
    let target = 1;

    const tick = () => {
      const current = window.scrollY;
      const delta = Math.abs(current - lastScroll);
      lastScroll = current;
      // Boost speed based on scroll velocity, max 4x
      target = 1 + Math.min(delta * 0.03, 3);
      setVelocity((prev) => prev + (target - prev) * 0.1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const effectiveDuration = speed / velocity;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap py-6 ${className}`}
    >
      <div
        className={`inline-flex ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
        style={
          {
            "--marquee-duration": `${effectiveDuration}s`,
          } as React.CSSProperties
        }
      >
        <span
          className={`text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight ${
            outlined ? "text-outline" : "text-[#e8e6e3]/10"
          }`}
        >
          {repeated}
        </span>
        <span
          className={`text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight ${
            outlined ? "text-outline" : "text-[#e8e6e3]/10"
          }`}
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
