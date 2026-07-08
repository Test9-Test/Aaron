import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Aaron | Cybersecurity Portfolio",
  description: "Premium cybersecurity portfolio featuring immersive 3D experiences, security projects, certifications, and blog.",
  keywords: [
    "cybersecurity",
    "penetration testing",
    "portfolio",
    "Aaron",
    "security engineer"
  ] as Array<string>,
  authors: {
    name: "Dhwanit Sukhadiya",
    url: "https://github.com/Aaron-2705",
  },
  openGraph: {
    title: "Aaron | Cybersecurity Portfolio",
    description: "Securing digital infrastructure with precision and purpose.",
    type: "website",
  },
} as const;
