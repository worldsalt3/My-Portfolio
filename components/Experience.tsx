"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Frontend Developer",
    company: "Immigify Inc",
    period: "2025 Jan — 2025 Nov",
    location: "Remote",
    description:
      "Led frontend development for an immigration services platform, architecting scalable UI systems with Next.js and React.",
    highlights: [
      "Architected a reusable component library that accelerated feature delivery by 40% across the product",
      "Drove automated testing strategy and CI/CD pipelines, reducing production bugs by 60%",
      "Identified and resolved critical performance bottlenecks, improving Core Web Vitals scores across key pages",
    ],
  },
  {
    role: "Software Engineer",
    company: "Genese (previously GetZing AI)",
    period: "2022 Dec — 2024 Dec",
    location: "Remote",
    description:
      "Owned frontend architecture for an AI-powered product, driving technical decisions and shipping features end-to-end.",
    highlights: [
      "Led frontend architecture decisions, establishing component patterns and state management standards adopted team-wide",
      "Mentored 3 junior engineers through code reviews, pair programming, and technical documentation",
      "Spearheaded migration to modern build tooling and CI/CD, cutting deploy times by 50%",
    ],
  },
  {
    role: "Frontend Development Lead / Tutor",
    company: "National Youth Service Corps",
    period: "2021 May — 2022 Apr",
    location: "Nigeria",
    description:
      "Designed and led a frontend development training program, mentoring 20+ aspiring developers from fundamentals to production-ready skills.",
    highlights: [
      "Built and delivered a structured curriculum covering HTML, CSS, JavaScript, and React fundamentals",
      "Mentored 20+ students, with several securing frontend roles within 6 months of completing the program",
      "Introduced project-based learning methodology that increased student engagement and completion rates",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Grazac Technology",
    period: "2021 Mar — 2021 Aug",
    location: "Lagos, Nigeria",
    description:
      "Delivered pixel-perfect frontend implementations for client projects, translating Figma designs into performant Next.js applications.",
    highlights: [
      "Transformed complex Figma designs into responsive, pixel-perfect UIs with Next.js and React",
      "Refactored legacy codebases improving maintainability and establishing consistent coding standards",
      "Collaborated with designers and backend engineers to define API contracts and component interfaces",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Timeline line draw
  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
        },
      },
    );
  }, []);

  // Cards fade in
  useEffect(() => {
    if (!cardsRef.current) return;

    const items = cardsRef.current.querySelectorAll("[data-exp-card]");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: i % 2 === 0 ? -30 : 30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        },
      );
    });
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[#6366f1] font-[family-name:var(--font-fira-code)] text-sm">
            04
          </span>
          <span className="text-sm uppercase tracking-[0.3em] text-[#8a8a8a]">
            Experience
          </span>
          <span className="flex-1 h-[1px] bg-[#1a1a1a]" />
        </div>

        {/* Background number */}
        <span className="absolute top-20 left-8 text-[15vw] font-[family-name:var(--font-space-grotesk)] font-bold text-outline pointer-events-none select-none leading-none opacity-40">
          04
        </span>

        {/* Timeline */}
        <div ref={cardsRef} className="relative">
          {/* Center line – md+ only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px]">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-[#6366f1] via-[#a855f7] to-transparent origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {/* Mobile left line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-[1px] bg-[#1a1a1a]" />

          {EXPERIENCES.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={exp.company + exp.period}
                data-exp-card
                className={`relative flex mb-12 last:mb-0 opacity-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-10 w-3 h-3 rounded-full bg-[#6366f1] border-2 border-[#050505] ring-4 ring-[#050505]" />
                {/* Mobile dot */}
                <div className="md:hidden absolute left-4 -translate-x-1/2 top-6 z-10 w-3 h-3 rounded-full bg-[#6366f1] border-2 border-[#050505]" />

                {/* Card */}
                <div
                  className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] glass rounded-2xl p-6 hover:border-[#6366f1]/20 transition-colors duration-300 ${
                    isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  {/* Period badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-[family-name:var(--font-fira-code)] text-[#6366f1]">
                      {exp.period}
                    </span>
                    <span className="text-xs text-[#8a8a8a]">
                      • {exp.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3] mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-[#6366f1]/80 mb-3">
                    {exp.company}
                  </p>
                  <p className="text-sm text-[#8a8a8a] leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-[#8a8a8a]"
                      >
                        <span className="text-[#6366f1] mt-1 text-xs">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
