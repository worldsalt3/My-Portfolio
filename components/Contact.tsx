"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!headingRef.current) return;

    const lines = headingRef.current.querySelectorAll("[data-reveal-line]");
    gsap.fromTo(
      lines,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, []);

  useEffect(() => {
    if (!formRef.current) return;

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(formState.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const mailtoLink = `mailto:riliwanhazzan@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(`From: ${formState.name} (${formState.email})\n\n${formState.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-[#6366f1]/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#a855f7]/[0.03] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[#6366f1] font-[family-name:var(--font-fira-code)] text-sm">
            05
          </span>
          <span className="text-sm uppercase tracking-[0.3em] text-[#8a8a8a]">
            Contact
          </span>
          <span className="flex-1 h-[1px] bg-[#1a1a1a]" />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left — CTA text */}
          <div ref={headingRef}>
            <div className="overflow-hidden">
              <h2
                data-reveal-line
                className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3] mb-2"
              >
                Let&apos;s build
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                data-reveal-line
                className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#6366f1] mb-2"
              >
                something
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                data-reveal-line
                className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3]"
              >
                together.
              </h2>
            </div>

            <p
              data-reveal-line
              className="mt-8 text-lg text-[#8a8a8a] leading-relaxed max-w-md"
            >
              Got a project in mind? I&apos;m always open to discussing new
              opportunities and interesting ideas.
            </p>

            {/* Direct contact links */}
            <div className="mt-12 space-y-4">
              <MagneticButton>
                <a
                  href="mailto:riliwanhazzan@gmail.com"
                  className="group flex items-center gap-3 text-[#e8e6e3] hover:text-[#6366f1] transition-colors"
                  data-cursor-label="Email"
                >
                  <span className="w-10 h-10 rounded-full border border-[#1a1a1a] flex items-center justify-center group-hover:border-[#6366f1]/30 transition-colors">
                    <MailIcon />
                  </span>
                  <span className="text-sm">riliwanhazzan@gmail.com</span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://github.com/worldsalt3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-[#e8e6e3] hover:text-[#6366f1] transition-colors"
                  data-cursor-label="GitHub"
                >
                  <span className="w-10 h-10 rounded-full border border-[#1a1a1a] flex items-center justify-center group-hover:border-[#6366f1]/30 transition-colors">
                    <GitHubIcon />
                  </span>
                  <span className="text-sm">github.com/worldsalt3</span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="tel:+2349061493039"
                  className="group flex items-center gap-3 text-[#e8e6e3] hover:text-[#6366f1] transition-colors"
                  data-cursor-label="Call"
                >
                  <span className="w-10 h-10 rounded-full border border-[#1a1a1a] flex items-center justify-center group-hover:border-[#6366f1]/30 transition-colors">
                    <PhoneIcon />
                  </span>
                  <span className="text-sm">+234 906 149 3039</span>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right — Form */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#e8e6e3]">
                Message Sent!
              </h3>
              <p className="text-sm text-[#8a8a8a] max-w-xs">
                Your email client should have opened with the message. I&apos;ll
                get back to you soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm text-[#6366f1] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-8 opacity-0"
              noValidate
            >
              {/* Name */}
              <div className="relative">
                <label
                  htmlFor="contact-name"
                  className={`absolute left-0 transition-all duration-300 text-sm ${
                    focusedField === "name" || formState.name
                      ? "top-0 text-xs text-[#6366f1]"
                      : "top-6 text-[#8a8a8a]"
                  }`}
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => {
                    setFormState((s) => ({ ...s, name: e.target.value }));
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pt-6 pb-3 bg-transparent border-b ${errors.name ? "border-red-500" : "border-[#1a1a1a]"} text-[#e8e6e3] focus:border-[#6366f1] outline-none transition-colors duration-300`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-1 text-xs text-red-400"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="contact-email"
                  className={`absolute left-0 transition-all duration-300 text-sm ${
                    focusedField === "email" || formState.email
                      ? "top-0 text-xs text-[#6366f1]"
                      : "top-6 text-[#8a8a8a]"
                  }`}
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => {
                    setFormState((s) => ({ ...s, email: e.target.value }));
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pt-6 pb-3 bg-transparent border-b ${errors.email ? "border-red-500" : "border-[#1a1a1a]"} text-[#e8e6e3] focus:border-[#6366f1] outline-none transition-colors duration-300`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-1 text-xs text-red-400"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="relative">
                <label
                  htmlFor="contact-message"
                  className={`absolute left-0 transition-all duration-300 text-sm ${
                    focusedField === "message" || formState.message
                      ? "top-0 text-xs text-[#6366f1]"
                      : "top-6 text-[#8a8a8a]"
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  value={formState.message}
                  onChange={(e) => {
                    setFormState((s) => ({ ...s, message: e.target.value }));
                    if (errors.message)
                      setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className={`w-full pt-6 pb-3 bg-transparent border-b ${errors.message ? "border-red-500" : "border-[#1a1a1a]"} text-[#e8e6e3] focus:border-[#6366f1] outline-none transition-colors duration-300 resize-none`}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-1 text-xs text-red-400"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <MagneticButton strength={0.2}>
                <button
                  type="submit"
                  className="group relative px-8 py-4 rounded-full border border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-[#050505] transition-all duration-300 text-sm uppercase tracking-wider"
                >
                  Send Message
                  <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
