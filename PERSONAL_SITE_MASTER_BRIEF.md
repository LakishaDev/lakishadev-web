# Personal Website – Master Brief & Agent Context (Next.js)

## PURPOSE
This document is the single source of truth for designing and implementing a
professional, system-oriented personal website.

The website must present the owner as a serious full‑stack / IoT engineer focused on
real systems, reliability, and architecture — not as a generic online CV.

Target audience:
- Senior engineers
- Technical clients
- Potential investors

Tone:
- Precise
- Confident
- Engineering-driven
- No marketing fluff

---

## AGENT DEFINITIONS (FOR MULTI-AGENT SETUPS)

### 1. UI_DESIGN_AGENT
Role:
Senior UI/UX Designer

Responsibilities:
- Define layout, spacing, typography, and visual hierarchy
- Enforce minimalist, dark-first design
- Ensure credibility and senior-level aesthetics

Hard constraints:
- No flashy UI
- No trend-chasing visuals
- No unnecessary animations

---

### 2. FRONTEND_IMPLEMENTATION_AGENT
Role:
Senior Frontend Engineer (Next.js)

Responsibilities:
- Implement the website using Next.js App Router
- Write clean, production-ready TypeScript
- Maintain reusable, scalable component architecture

Hard constraints:
- Next.js + TypeScript + Tailwind only
- No unnecessary libraries
- Vercel-ready output

---

### 3. CONTENT_COPY_AGENT
Role:
Technical Copywriter with engineering background

Responsibilities:
- Write concise, technical, system-focused copy
- Avoid generic portfolio language
- Emphasize trade-offs, reliability, and reasoning

Hard constraints:
- No buzzwords
- No motivational or marketing language
- Short, direct sentences

---

### 4. REVIEW_AGENT
Role:
Senior Engineer / Architect Reviewer

Responsibilities:
- Critically review design, copy, and code
- Remove anything that looks junior or templated
- Enforce simplicity and credibility

Authority:
- Can reject or rewrite any part of the site
- Has final approval

---

## TECH STACK (MANDATORY)

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion (minimal, purposeful only)
- Fonts:
  - UI: Inter or IBM Plex Sans
  - Code: JetBrains Mono
- Hosting: Vercel

---

## VISUAL STYLE SYSTEM

### Theme
- Dark-first
- Minimalist
- Professional
- Subtle glassmorphism allowed (low opacity, low blur)

### Color Palette
- Background: #0B0F14
- Surface / cards: #121826
- Primary: #1165A3
- Accent: #38BDF8 or #22D3EE
- Text primary: #E5E7EB
- Text secondary: #9CA3AF

### UI Rules
- Strong typographic hierarchy
- Large spacing
- Calm, readable layouts
- No skill bars
- No decorative charts
- No gimmicks

---

## SITE STRUCTURE & CONTENT

### HERO SECTION
Headline:
Building reliable software systems — from embedded devices to cloud APIs.

Subheadline:
Full-stack developer focused on IoT, real-time data pipelines, and backend system design.

CTAs:
- View Projects
- Contact

Rules:
- No selfies unless explicitly requested later
- Typography over visuals

---

### WHAT I BUILD (NOT “SKILLS”)

#### IoT & Embedded Systems
Designing and integrating embedded devices that reliably collect and transmit real-world data.
Tech: ESP32, sensors, edge processing

#### Backend Systems
Building maintainable backend services with real-time communication and secure APIs.
Tech: Node.js, TypeScript, REST, WebSockets

#### Data & Integration
Structuring reliable data flows between devices, services, and dashboards.
Tech: SQLite, PostgreSQL, device-to-cloud pipelines

---

### PROJECTS (MOST IMPORTANT SECTION)

Rules:
- 3–5 projects maximum
- Each project must show real-world value

Example Project: eVagaHub
Description:
Industrial measurement platform connecting hardware scales to cloud dashboards in real time.

Stack:
Node.js, TypeScript, WebSockets, SQLite/PostgreSQL, Flutter

Links:
- GitHub
- Case Study (preferred over empty demo)

---

### ENGINEERING NOTES

Purpose:
Demonstrate reasoning and architectural thinking.

Examples:
- Designing a reconnect-safe WebSocket layer
- Why SQLite was the right choice for edge devices
- What I would change at 10× scale

Rules:
- Short
- Technical
- No blogging tone

---

### CONTACT

- Email
- GitHub
- LinkedIn

No contact form unless backend is explicitly added.

---

## NEXT.JS PROJECT STRUCTURE

app/
  layout.tsx
  page.tsx
  globals.css
  projects/page.tsx
  notes/page.tsx

components/
  Hero.tsx
  Section.tsx
  ProjectCard.tsx
  NoteCard.tsx
  Navbar.tsx
  Footer.tsx

lib/
  data.ts

public/
  fonts/

---

## WHAT MUST BE AVOIDED (CRITICAL)

- “Passionate developer” language
- Long skill lists
- Progress bars
- Heavy animations
- Trend-driven UI
- Template-looking sections

---

## SUCCESS CRITERIA

The site should feel like:
“This person designs and builds real systems.”

Not:
“This is a nice-looking portfolio.”

END OF MASTER BRIEF
