"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" });
    const xRing = gsap.quickTo(ring, "x", {
      duration: 0.35,
      ease: "power2.out",
    });
    const yRing = gsap.quickTo(ring, "y", {
      duration: 0.35,
      ease: "power2.out",
    });

    function onMouseMove(e: MouseEvent) {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    }

    function onMouseEnterInteractive(e: Event) {
      const target = e.currentTarget as HTMLElement;
      const cursorLabel = target.dataset.cursorLabel || "";

      gsap.to(ring, {
        width: 64,
        height: 64,
        borderColor: "rgba(99, 102, 241, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });

      if (cursorLabel && label) {
        label.textContent = cursorLabel;
        gsap.to(label, { opacity: 1, duration: 0.2 });
      }
    }

    function onMouseLeaveInteractive() {
      gsap.to(ring, {
        width: 36,
        height: 36,
        borderColor: "rgba(232, 230, 227, 0.4)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    }

    function onMouseDown() {
      gsap.to(dot, { scale: 2.5, duration: 0.1 });
      gsap.to(ring, { scale: 0.85, duration: 0.1 });
    }

    function onMouseUp() {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.5)" });
      gsap.to(ring, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.5)" });
    }

    function onMouseLeave() {
      visibleRef.current = false;
      setIsVisible(false);
    }

    function onMouseEnterPage() {
      visibleRef.current = true;
      setIsVisible(true);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnterPage);

    function attachInteractables() {
      const els = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], [data-cursor]",
      );
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    }

    attachInteractables();
    const observer = new MutationObserver(attachInteractables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener(
        "mouseenter",
        onMouseEnterPage,
      );
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#e8e6e3",
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[199] flex items-center justify-center mix-blend-difference"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(232, 230, 227, 0.4)",
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        <span
          ref={labelRef}
          className="text-[10px] font-medium uppercase tracking-widest text-[#e8e6e3] opacity-0"
        />
      </div>
    </>
  );
}
