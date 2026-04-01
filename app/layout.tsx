import type { Metadata } from "next";
import { Inter, Fira_Code, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const siteUrl = "https://riliwanhassan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Riliwan Hassan | Frontend Engineer",
  description:
    "Front-end Engineer with 4+ years of experience building scalable web applications using React, Next.js, and TypeScript.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "Riliwan Hassan",
    "Lagos",
    "Software Engineer",
  ],
  authors: [{ name: "Riliwan Hassan" }],
  creator: "Riliwan Hassan",
  openGraph: {
    title: "Riliwan Hassan | Frontend Engineer",
    description:
      "Front-end Engineer building scalable web applications with React, Next.js, and TypeScript.",
    url: siteUrl,
    siteName: "Riliwan Hassan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riliwan Hassan | Frontend Engineer",
    description:
      "Front-end Engineer building scalable web applications with React, Next.js, and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Riliwan Hassan",
              url: siteUrl,
              jobTitle: "Frontend Engineer",
              description:
                "Front-end Engineer with 4+ years of experience building scalable web applications using React, Next.js, and TypeScript.",
              email: "mailto:riliwanhazzan@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lagos",
                addressCountry: "NG",
              },
              sameAs: ["https://github.com/worldsalt3"],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS",
                "Frontend Development",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#050505] text-[#e8e6e3] font-[family-name:var(--font-inter)] antialiased overflow-x-hidden">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#6366f1] focus:text-white focus:rounded-lg focus:text-sm"
        >
          Skip to main content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
