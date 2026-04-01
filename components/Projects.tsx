"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  github?: string;
  year: string;
  category: string;
}

const PROJECTS: Project[] = [
  {
    title: "Flotom Logistics",
    description:
      "A comprehensive logistics dashboard for fleet management, shipment tracking, and operational analytics.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    image: "/projects/flotom.jpg",
    link: "https://dashboard.flotomlogistics.com/",
    year: "2024",
    category: "Full Stack",
  },
  {
    title: "Finovapath",
    description:
      "Financial technology platform delivering innovative fintech solutions with modern, responsive interfaces.",
    tech: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    image: "/projects/finovapath.jpg",
    link: "https://www.finovapath.com/",
    year: "2024",
    category: "Frontend",
  },
  {
    title: "Immigify",
    description:
      "Immigration services platform streamlining visa applications and document management with an intuitive user experience.",
    tech: ["Next.js", "React", "Framer Motion", "REST APIs"],
    image: "/projects/immigify.jpg",
    link: "https://immigify.com/",
    year: "2025",
    category: "Full Stack",
  },
  {
    title: "Daz Inn",
    description:
      "Hospitality and booking platform featuring seamless reservation flows and a polished, user-friendly design.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
    image: "/projects/dazinn.jpg",
    link: "https://www.dazinn.com/",
    year: "2024",
    category: "Frontend",
  },
  {
    title: "Crowplus",
    description:
      "Crowdfunding and community platform enabling users to create, manage, and support campaigns with real-time updates.",
    tech: ["React", "Next.js", "Node.js", "MongoDB"],
    image: "/projects/crowplus.jpg",
    link: "https://www.crowplus.com/",
    year: "2024",
    category: "Full Stack",
  },
  {
    title: "Venity",
    description:
      "Lifestyle and social application with sleek mobile-first design, user profiles, and interactive features.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Redux"],
    image: "/projects/venity.jpg",
    link: "https://www.venityapp.com/",
    year: "2023",
    category: "Frontend",
  },
  {
    title: "Adeyinka Aare Foundation",
    description:
      "Non-profit organization website showcasing programs, events, and donation capabilities with an accessible UI.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: "/projects/adeyinka.jpg",
    link: "https://www.adeyinkaare.org/",
    year: "2023",
    category: "Frontend",
  },
  {
    title: "AfriSplash Remotely",
    description:
      "Open-source platform connecting African talent with remote job opportunities worldwide.",
    tech: ["React", "JavaScript", "CSS3", "REST APIs"],
    image: "/projects/afrisplash.jpg",
    github: "https://github.com/AfriSplash-Remotely/Afrisplash-Frontend",
    year: "2023",
    category: "Open Source",
  },
];

const FILTER_CATEGORIES = ["All", "Full Stack", "Frontend", "Open Source"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const projectUrl = project.link || project.github;

  return (
    <a
      data-project-card
      href={projectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-[60vh] relative group block cursor-pointer"
      data-cursor-label="View"
    >
      {/* Card */}
      <div className="relative h-full rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden flex flex-col">
        {/* Image area with clip-path reveal */}
        <div className="relative h-[50%] overflow-hidden bg-[#111]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/90 z-10" />
          {/* Image/gradient with clip-path reveal */}
          <div
            ref={imageRef}
            data-project-image
            className="absolute inset-0 opacity-40 transition-all duration-700 group-hover:opacity-60 group-hover:scale-[1.05]"
            style={{
              background: `linear-gradient(${135 + index * 30}deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)`,
            }}
          />
          {/* Category & year */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="px-3 py-1 text-[10px] uppercase tracking-wider border border-[#333] rounded-full bg-[#0a0a0a]/60 backdrop-blur-sm text-[#e8e6e3]">
              {project.category}
            </span>
            <span className="text-xs text-[#8a8a8a] font-[family-name:var(--font-fira-code)]">
              {project.year}
            </span>
          </div>
          {/* Index number */}
          <span className="absolute bottom-4 right-4 z-20 text-6xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3]/5">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between relative z-20">
          <div>
            <h3 className="text-xl md:text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3] mb-2 group-hover:text-[#6366f1] transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-[#8a8a8a] leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-[#1a1a1a] text-[#8a8a8a] font-[family-name:var(--font-fira-code)]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Link indicator */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#e8e6e3] group-hover:text-[#6366f1] transition-colors flex items-center gap-1">
                {project.link ? "View Live ↗" : "View Code ↗"}
              </span>
              {project.link && project.github && (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(
                      project.github,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="text-sm text-[#8a8a8a] hover:text-[#e8e6e3] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Code ↗
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hover border glow */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#6366f1]/20 transition-colors duration-500 pointer-events-none" />
      </div>
    </a>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileGridRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (isMobile || !trackRef.current || !sectionRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth - window.innerWidth;

    // Horizontal scroll
    const tl = gsap.to(track, {
      x: () => -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    // Card clip-path reveal + entrance animations
    const cards = track.querySelectorAll("[data-project-card]");
    cards.forEach((card) => {
      const img = card.querySelector("[data-project-image]");

      gsap.fromTo(
        card,
        { opacity: 0.3, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left 80%",
            end: "left 40%",
            scrub: true,
          },
        },
      );

      // Clip-path wipe reveal on images
      if (img) {
        gsap.fromTo(
          img,
          { opacity: 0.2, scale: 1.1 },
          {
            opacity: 0.4,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 75%",
              end: "left 35%",
              scrub: true,
            },
          },
        );
      }
    });

    const trigger = sectionRef.current;
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === trigger) t.kill();
      });
    };
  }, [isMobile, activeFilter]);

  // Mobile: staggered entrance for vertical cards
  useEffect(() => {
    if (!isMobile || !mobileGridRef.current) return;

    const cards = mobileGridRef.current.querySelectorAll("[data-project-card]");
    const imgs = mobileGridRef.current.querySelectorAll("[data-project-image]");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mobileGridRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );

    imgs.forEach((img) => {
      gsap.fromTo(
        img,
        { opacity: 0.2, scale: 1.1 },
        {
          opacity: 0.4,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            once: true,
          },
        },
      );
    });
  }, [isMobile, activeFilter]);

  return (
    <section id="projects" ref={sectionRef} className="relative">
      {/* Header */}
      <div className="pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#6366f1] font-[family-name:var(--font-fira-code)] text-sm">
              03
            </span>
            <span className="text-sm uppercase tracking-[0.3em] text-[#8a8a8a]">
              Projects
            </span>
            <span className="flex-1 h-[1px] bg-[#1a1a1a]" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3]">
              Selected Work
            </h2>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 text-xs rounded-full border transition-all duration-300 ${
                    activeFilter === cat
                      ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]"
                      : "border-[#1a1a1a] text-[#8a8a8a] hover:border-[#333] hover:text-[#e8e6e3]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {!isMobile && (
            <span className="block mt-4 text-sm text-[#8a8a8a]">
              Scroll to explore →
            </span>
          )}
        </div>
      </div>

      {/* Desktop: Horizontal track */}
      {!isMobile && (
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 pl-6 md:pl-12 pr-[15vw] py-8 will-change-transform"
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile: Vertical grid fallback */}
      {isMobile && (
        <div ref={mobileGridRef} className="px-6 pb-16 flex flex-col gap-6">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      )}

      {/* Progress bar (desktop only) */}
      {!isMobile && (
        <>
          <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 h-[2px] bg-[#1a1a1a]">
            <div
              ref={progressRef}
              className="h-full bg-[#6366f1] origin-left"
              style={{ transform: "scaleX(0)" }}
            />
            {/* Progress dots */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
              {filteredProjects.map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#333]" />
              ))}
            </div>
          </div>
          <div className="absolute bottom-8 right-6 md:right-12 text-xs text-[#8a8a8a] font-[family-name:var(--font-fira-code)]">
            {filteredProjects.length} projects
          </div>
        </>
      )}
    </section>
  );
}
