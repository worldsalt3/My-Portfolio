"use client";

import { useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import Marquee from "./Marquee";
import GrainOverlay from "./GrainOverlay";

gsap.registerPlugin(ScrollTrigger);

export default function PageWrapper() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
    // Reveal main content
    gsap.fromTo(
      "[data-main-content]",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
    );
    // Refresh ScrollTrigger after content is visible
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {!isMobile && <CustomCursor />}
      <GrainOverlay />
      <ScrollProgress />
      <Navbar />

      <div data-main-content style={{ opacity: loading ? 0 : 1 }}>
        <main>
          <Hero />
          <Marquee text="ABOUT ME • ABOUT ME • ABOUT ME •" speed={25} />
          <About />
          <Marquee
            text="SKILLS & TOOLS • SKILLS & TOOLS •"
            direction="right"
            speed={20}
          />
          <Skills />
          <Marquee text="SELECTED WORK • SELECTED WORK •" speed={30} />
          <Projects />
          <Marquee
            text="EXPERIENCE • EXPERIENCE •"
            direction="right"
            speed={22}
            outlined
          />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
