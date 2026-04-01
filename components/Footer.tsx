"use client";

import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Africa/Lagos",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[#1a1a1a] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-start">
        {/* Col 1 — Branding */}
        <div>
          <div className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3] mb-2">
            RH<span className="text-[#6366f1]">.</span>
          </div>
          <p className="text-sm text-[#8a8a8a] leading-relaxed max-w-xs">
            Senior frontend engineer architecting scalable web applications with
            React, Next.js, and TypeScript.
          </p>
        </div>

        {/* Col 2 — Links */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-center">
          {NAV_LINKS.map((link) => (
            <MagneticButton key={link.label} strength={0.15}>
              <a
                href={link.href}
                className="text-sm text-[#8a8a8a] hover:text-[#e8e6e3] transition-colors duration-200"
              >
                {link.label}
              </a>
            </MagneticButton>
          ))}
        </div>

        {/* Col 3 — Clock & back to top */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="text-xs text-[#8a8a8a] font-[family-name:var(--font-fira-code)]">
            Lagos, Nigeria — {time}
          </div>
          <MagneticButton>
            <button
              onClick={scrollToTop}
              className="text-sm text-[#8a8a8a] hover:text-[#6366f1] transition-colors duration-200 flex items-center gap-2"
            >
              Back to top ↑
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#1a1a1a] flex flex-wrap items-center justify-between text-xs text-[#8a8a8a]">
        <span>
          © {new Date().getFullYear()} Riliwan Hassan. All rights reserved.
        </span>
        <span className="font-[family-name:var(--font-fira-code)]">
          Designed & Built by Riliwan Hassan
        </span>
      </div>
    </footer>
  );
}
