export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
}

export interface Note {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content?: string;
}

export interface Skill {
  category: string;
  description: string;
  technologies: string;
}

export const projects: Project[] = [
  {
    id: "evagahub",
    title: "eVaga Hub",
    description:
      "Industrial measurement platform connecting hardware scales to cloud dashboards in real time. Handles data collection, WebSocket communication, and multi-device orchestration.",
    stack: [
      "Node.js",
      "TypeScript",
      "WebSockets",
      "SQLite",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/LakishaDev/eVagaHub",
    caseStudyUrl: "/projects/evagahub",
  },
  {
    id: "evagamobile",
    title: "eVaga Mobile",
    description:
      "",
    stack: ["Flutter", "Dart"],
    githubUrl: "https://github.com/yourusername/iot-pipeline",
  },
  {
    id: "evagadesktop",
    title: "eVaga Desktop",
    description:
      "",
    stack: ["C# Windows Forms", "SQL Server"],
    githubUrl: "https://github.com/yourusername/device-api",
  },
];

export const skills: Skill[] = [
  {
    category: "IoT & Embedded Systems",
    description:
      "Designing and integrating embedded devices that reliably collect and transmit real-world data.",
    technologies: "ESP32, sensors, edge processing",
  },
  {
    category: "Backend Systems",
    description:
      "Building maintainable backend services with real-time communication and secure APIs.",
    technologies: "Node.js, TypeScript, REST, WebSockets",
  },
  {
    category: "Data & Integration",
    description:
      "Structuring reliable data flows between devices, services, and dashboards.",
    technologies: "SQLite, PostgreSQL, device-to-cloud pipelines",
  },
];

export const notes: Note[] = [
  {
    slug: "websocket-reconnection-strategy",
    title: "Designing a reconnect-safe WebSocket layer",
    excerpt:
      "How to build a resilient WebSocket connection manager that handles disconnects, message queuing, and state synchronization without data loss.",
    date: "2026-01-10",
  },
  {
    slug: "sqlite-for-edge-devices",
    title: "Why SQLite was the right choice for edge devices",
    excerpt:
      "Trade-offs in choosing SQLite over cloud-first databases for IoT gateway devices with intermittent connectivity.",
    date: "2026-01-05",
  },
  {
    slug: "scaling-iot-systems",
    title: "What I would change at 10× scale",
    excerpt:
      "Architectural decisions that work at 100 devices but break at 1,000. Message brokers, time-series databases, and distributed tracing.",
    date: "2025-12-20",
  },
];
