"use client";

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

  return (
    <div className={`overflow-hidden whitespace-nowrap py-6 ${className}`}>
      <div
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
