"use client";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lazar",
    jobTitle: "Full-Stack & IoT Engineer",
    description:
      "Building reliable software systems — from embedded devices to cloud APIs",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://lakisha.dev",
    sameAs: [
      "https://github.com/LakishaDev",
      "https://linkedin.com/in/lazar-dev",
    ],
    knowsAbout: [
      "IoT Systems",
      "Embedded Devices",
      "Backend Development",
      "Real-time Systems",
      "ESP32",
      "Node.js",
      "TypeScript",
      "WebSockets",
      "MQTT",
      "PostgreSQL",
    ],
    email: "lazar@lakisha.dev",
    alumniOf: {
      "@type": "Organization",
      name: "Your University",
    },
    worksFor: {
      "@type": "Organization",
      name: "LakishaDev",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
