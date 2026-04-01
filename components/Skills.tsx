"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category = "Frontend" | "State & Data" | "Backend" | "Tools & DevOps";

interface Skill {
  name: string;
  level: number;
  category: Category;
  featured?: boolean;
}

const SKILLS: Skill[] = [
  { name: "React", level: 95, category: "Frontend", featured: true },
  { name: "Next.js (SSR)", level: 92, category: "Frontend", featured: true },
  { name: "TypeScript", level: 90, category: "Frontend", featured: true },
  { name: "JavaScript (ES6+)", level: 95, category: "Frontend" },
  { name: "HTML5/CSS3", level: 95, category: "Frontend" },
  { name: "Tailwind CSS", level: 92, category: "Frontend" },
  { name: "Framer Motion", level: 85, category: "Frontend" },
  { name: "GSAP", level: 80, category: "Frontend" },
  { name: "Redux", level: 85, category: "State & Data" },
  { name: "Zustand", level: 85, category: "State & Data" },
  { name: "REST APIs", level: 90, category: "State & Data" },
  { name: "JSON", level: 92, category: "State & Data" },
  { name: "Node.js", level: 75, category: "Backend" },
  { name: "Express", level: 70, category: "Backend" },
  { name: "NestJS", level: 65, category: "Backend" },
  { name: "PostgreSQL", level: 68, category: "Backend" },
  { name: "MongoDB", level: 68, category: "Backend" },
  { name: "Git", level: 92, category: "Tools & DevOps" },
  { name: "CI/CD Pipelines", level: 75, category: "Tools & DevOps" },
  { name: "Automated Testing", level: 78, category: "Tools & DevOps" },
  { name: "GitHub Copilot", level: 85, category: "Tools & DevOps" },
  { name: "Figma", level: 80, category: "Tools & DevOps" },
];

const CATEGORIES: Category[] = [
  "Frontend",
  "State & Data",
  "Backend",
  "Tools & DevOps",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("Frontend");

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll("[data-skill-card]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );
  }, [activeCategory]);

  const filteredSkills = SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[#6366f1] font-[family-name:var(--font-fira-code)] text-sm">
            02
          </span>
          <span className="text-sm uppercase tracking-[0.3em] text-[#8a8a8a]">
            Skills
          </span>
          <span className="flex-1 h-[1px] bg-[#1a1a1a]" />
        </div>

        {/* Background number */}
        <span className="absolute top-20 right-8 text-[15vw] font-[family-name:var(--font-space-grotesk)] font-bold text-outline pointer-events-none select-none leading-none opacity-40">
          02
        </span>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]"
                  : "border-[#1a1a1a] text-[#8a8a8a] hover:border-[#333] hover:text-[#e8e6e3]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento grid */}
        <div
          ref={gridRef}
          key={activeCategory}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              data-skill-card
              className={`glass rounded-2xl p-5 group hover:-translate-y-1 hover:border-[#6366f1]/20 transition-all duration-300 ${
                skill.featured
                  ? "col-span-2 md:col-span-1 lg:col-span-2 row-span-1"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-medium text-[#e8e6e3] group-hover:text-[#6366f1] transition-colors duration-300">
                  {skill.name}
                </h3>
                <span className="text-xs text-[#8a8a8a] font-[family-name:var(--font-fira-code)]">
                  {skill.level}%
                </span>
              </div>

              {/* Skill bar */}
              <div className="w-full h-[3px] bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {skill.featured && (
                <span className="mt-3 inline-block text-[10px] uppercase tracking-wider text-[#6366f1]/60">
                  Core Skill
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Tech orbit */}
        <div className="relative mt-20 flex items-center justify-center">
          <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8a8a8a]">
                Tech Stack
              </span>
            </div>
            {/* Orbit ring */}
            <div className="absolute inset-0 rounded-full border border-[#1a1a1a]" />
            {/* Orbiting logos */}
            <div className="absolute inset-0 animate-[spin_30s_linear_infinite]">
              {[
                "React",
                "Next.js",
                "TS",
                "Tailwind",
                "Node",
                "Redux",
                "GSAP",
                "Zustand",
              ].map((tech, i, arr) => {
                const angle = (360 / arr.length) * i;
                return (
                  <div
                    key={tech}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translateX(140px) rotate(-${angle}deg)`,
                    }}
                  >
                    <span className="block -translate-x-1/2 -translate-y-1/2 text-[11px] font-[family-name:var(--font-fira-code)] text-[#8a8a8a] bg-[#0a0a0a] px-2 py-1 rounded-md border border-[#1a1a1a] whitespace-nowrap animate-[spin_30s_linear_infinite_reverse]">
                      {tech}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
