"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BIO_TEXT = `I'm a senior frontend engineer who architects and ships production-grade web applications at scale. Over 4+ years I've led frontend development across fintech platforms, logistics dashboards, and SaaS products — owning technical decisions from component architecture to deployment pipelines. I specialize in React and Next.js, with deep expertise in TypeScript, state management patterns, and performance optimization. I mentor junior developers, drive code quality standards, and bridge the gap between design vision and engineering execution.`;

const STATS = [
  { value: "4+", label: "Years Experience" },
  { value: "10+", label: "Projects Delivered" },
  { value: "4", label: "Engineering Teams" },
  { value: "20+", label: "Developers Mentored" },
];

const QUICK_INFO = [
  { label: "Location", value: "Lagos, Nigeria" },
  { label: "Education", value: "B.Sc. Statistics" },
  { label: "Focus", value: "Frontend Architecture" },
  { label: "Languages", value: "English, Yoruba" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // Scroll-scrubbed word reveal
  useEffect(() => {
    if (!wordsRef.current) return;

    const words = wordsRef.current.querySelectorAll("span");

    gsap.fromTo(
      words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: wordsRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1,
        },
      },
    );

    const trigger = wordsRef.current;
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === trigger) t.kill();
      });
    };
  }, []);

  // Stats counter animation
  useEffect(() => {
    if (!statsRef.current) return;

    const statEls = statsRef.current.querySelectorAll("[data-stat-value]");

    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        statEls.forEach((el) => {
          const target = el.getAttribute("data-stat-value") || "0";
          const numericPart = parseFloat(target.replace(/[^0-9.]/g, ""));
          const suffix = target.replace(/[0-9.]/g, "");
          const counter = { value: 0 };

          gsap.to(counter, {
            value: numericPart,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              if (target.includes(".")) {
                el.textContent = counter.value.toFixed(1) + suffix;
              } else {
                el.textContent = Math.floor(counter.value) + suffix;
              }
            },
          });
        });
      },
    });
  }, []);

  // Info cards stagger
  useEffect(() => {
    if (!infoRef.current) return;

    const cards = infoRef.current.querySelectorAll("[data-info-card]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );
  }, []);

  const bioWords = BIO_TEXT.split(" ");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[#6366f1] font-[family-name:var(--font-fira-code)] text-sm">
            01
          </span>
          <span className="text-sm uppercase tracking-[0.3em] text-[#8a8a8a]">
            About
          </span>
          <span className="flex-1 h-[1px] bg-[#1a1a1a]" />
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Bio text — scroll reveal */}
          <div className="md:col-span-3 relative">
            {/* Large background number */}
            <span className="absolute -top-16 -left-4 text-[15vw] font-[family-name:var(--font-space-grotesk)] font-bold text-outline pointer-events-none select-none leading-none">
              01
            </span>

            <div
              ref={wordsRef}
              className="relative z-10 text-xl md:text-2xl lg:text-3xl leading-relaxed font-light text-[#e8e6e3]"
            >
              {bioWords.map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-[0.3em] opacity-[0.15]"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="md:col-span-2" ref={statsRef}>
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-6 text-center hover:border-[#6366f1]/20 transition-colors duration-300"
                >
                  <div
                    data-stat-value={stat.value}
                    className="text-3xl md:text-4xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3] mb-1"
                  >
                    0
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#8a8a8a]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick info row */}
        <div
          ref={infoRef}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {QUICK_INFO.map((info) => (
            <div
              key={info.label}
              data-info-card
              className="flex items-center gap-3 px-5 py-4 rounded-xl border border-[#1a1a1a] bg-[#0f0f0f]/50 opacity-0"
            >
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#8a8a8a]">
                  {info.label}
                </div>
                <div className="text-sm text-[#e8e6e3] font-medium">
                  {info.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
