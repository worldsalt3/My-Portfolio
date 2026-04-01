"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

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
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let velocity = 1;
    let lastScroll = window.scrollY;

    const onTick = () => {
      const current = window.scrollY;
      const delta = Math.abs(current - lastScroll);
      lastScroll = current;

      // Gentle boost: max 1.8x, with soft easing back to 1
      const target = 1 + Math.min(delta * 0.015, 0.8);
      velocity += (target - velocity) * 0.06;

      track.style.setProperty("--marquee-duration", `${speed / velocity}s`);
    };

    gsap.ticker.add(onTick);
    return () => {
      gsap.ticker.remove(onTick);
    };
  }, [speed]);

  return (
    <div className={`overflow-hidden whitespace-nowrap py-6 ${className}`}>
      <div
        ref={trackRef}
        className={`inline-flex ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
        style={
          {
            "--marquee-duration": `${speed}s`,
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
