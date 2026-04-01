"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = ["about", "skills", "projects", "experience", "contact"];
    const triggers = sections.map((id) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActiveSection(id);
        },
      });
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
          scrolled
            ? "top-4 left-4 right-4 mx-auto max-w-4xl rounded-full glass px-6 py-3"
            : "px-6 md:px-12 py-5"
        }`}
      >
        <div
          className={`flex items-center justify-between ${scrolled ? "" : "max-w-7xl mx-auto"}`}
        >
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3] tracking-tight"
              data-cursor-label="Top"
            >
              RH<span className="text-[#6366f1]">.</span>
            </button>
          </MagneticButton>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <MagneticButton key={link.href} strength={0.15}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="relative px-4 py-2 text-sm tracking-wide text-[#8a8a8a] hover:text-[#e8e6e3] transition-colors duration-300"
                  data-cursor-label={link.label}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#6366f1]" />
                  )}
                </button>
              </MagneticButton>
            ))}
            <MagneticButton strength={0.2}>
              <a
                href="/Riliwan_Hassan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-5 py-2 text-sm border border-[#6366f1]/40 text-[#6366f1] rounded-full hover:bg-[#6366f1]/10 transition-colors duration-300"
                data-cursor-label="Resume"
              >
                Resume
              </a>
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-[#e8e6e3] transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#e8e6e3] transition-all duration-300 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-[85] bg-[#050505]/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3] tracking-tight"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.4s cubic-bezier(0.33, 1, 0.68, 1) ${0.1 + i * 0.06}s`,
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="/Riliwan_Hassan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 text-lg border border-[#6366f1]/40 text-[#6366f1] rounded-full"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.4s cubic-bezier(0.33, 1, 0.68, 1) ${0.1 + NAV_LINKS.length * 0.06}s`,
            }}
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
