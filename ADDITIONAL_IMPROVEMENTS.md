# 🚀 Dodatni Predlozi za Sajt - Implementacija

## ✅ Upravo Implementirano (Januar 2026)

### 1. **GitHub Activity sa Godišnjom Statistikom**

- ✅ Prikazuje podatke za **poslednjih 12 meseci**
- ✅ **4 key metrike**:
  - Total Commits (ukupan broj commit-ova)
  - Active Repos (broj aktivnih repozitorijuma)
  - Active Days (koliko dana si bio aktivan)
  - Current Streak (trenutni niz uzastopnih dana)
- ✅ Procenat aktivnih dana u godini (npr. "45% of the year")
- ✅ Lista poslednjih 5 commit-ova sa datumima
- ✅ Skeleton loading states tokom učitavanja

### 2. **Kompletna SEO Optimizacija**

- ✅ **Open Graph tags** (Facebook, LinkedIn share)
- ✅ **Twitter Cards** (Twitter share preview)
- ✅ **Structured Data (JSON-LD)** - Schema.org Person markup
- ✅ **Sitemap.xml** - automatski generisan za sve stranice
- ✅ **Robots.txt** - SEO crawler konfiguracija
- ✅ **Dynamic OG Image** - auto-generated sa Next.js ImageResponse
- ✅ **Manifest.json** - PWA support
- ✅ **Meta keywords** za svaku stranicu
- ✅ **Canonical URLs** - duplicate content prevencija
- ✅ **Alternate language tags** (en, sr, sr-Cyrl)
- ✅ **Google verification placeholder**

### 3. **Middleware Popravka**

- ✅ Ispravljeno da pokrije sve rute (uključujući /contact)
- ✅ Dodao regex matcher za dinamičke rute
- ✅ Excluduje API routes, \_next, i static files

---

## 🎯 Top 10 Sledećih Poboljšanja (Prioritet)

### **1. Analytics i Tracking** 📊

#### Implementuj Google Analytics 4

```typescript
// app/layout.tsx
import Script from 'next/script'

// Dodaj u <head>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

**Šta da pratiš:**

- Page views (najpopularnije stranice)
- Contact form submissions
- Project card clicks
- GitHub activity widget interactions
- Average time on site
- Bounce rate po stranicama

---

### **2. Performance Optimization** ⚡

#### Image Optimization

```bash
# Instaluj sharp za optimizaciju slika
npm install sharp

# Kreiraj optimizovane verzije
/public/
  icon-192.png
  icon-512.png
  og-image.jpg (1200x630)
  favicon.ico
```

#### Lazy Loading Components

```typescript
// Lazy load heavy components
const GitHubActivity = dynamic(() => import('@/components/GitHubActivity'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

#### Code Splitting

- Lazy load ContactForm (nije odmah potreban)
- Lazy load Stats komponenta
- Dynamic imports za MDX content

**Target Metrics:**

- Lighthouse Score: 95+ (trenutno ~85)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

---

### **3. Dark/Light Mode Toggle** 🌓

```typescript
// components/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg p-2 hover:bg-surface transition-colors"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
```

**Potrebno:**

```bash
npm install next-themes
```

Dodaj u Navbar i sačuvaj preference u localStorage.

---

### **4. Newsletter Subscription** 📧

#### Forma za Newsletter

```typescript
// components/NewsletterForm.tsx
'use client'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
    // Handle response
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button>Subscribe</button>
    </form>
  )
}
```

#### API Route

```typescript
// app/api/subscribe/route.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();

  // Dodaj u audience listu
  await resend.contacts.create({
    email,
    audienceId: "your-audience-id",
  });

  // Pošalji dobrodošlicu
  await resend.emails.send({
    from: "Lazar <hello@lakishadev.com>",
    to: email,
    subject: "Welcome to my newsletter!",
    html: "<p>Thanks for subscribing!</p>",
  });

  return Response.json({ success: true });
}
```

**Gde dodati:**

- Footer (glavni call-to-action)
- Contact stranica (ispod forme)
- Notes stranica (nakon svakog članka)

---

### **5. Search Functionality** 🔍

#### Global Search sa Keyboard Shortcuts

```typescript
// components/Search.tsx
'use client'

import { Command } from 'cmdk'
import { Search as SearchIcon } from 'lucide-react'

export default function Search() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Command.Dialog open={open} onOpenChange={setOpen}>
      <Command.Input
        placeholder="Search notes, projects..."
        value={search}
        onValueChange={setSearch}
      />
      <Command.List>
        {/* Search results */}
      </Command.List>
    </Command.Dialog>
  )
}
```

**Features:**

- Traži kroz notes, projects, tagove
- Instant results (bez debounce-a)
- Keyboard navigation
- Recent searches history

```bash
npm install cmdk
```

---

### **6. Blog Comments (Giscus)** 💬

#### Dodaj Comments na Notes

```typescript
// components/Comments.tsx
'use client'

import Giscus from '@giscus/react'

export default function Comments() {
  return (
    <Giscus
      repo="LakishaDev/lakishadev-web"
      repoId="your-repo-id"
      category="General"
      categoryId="your-category-id"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      theme="dark"
      loading="lazy"
    />
  )
}
```

**Setup:**

1. Enable GitHub Discussions na repo-u
2. Install Giscus app: https://github.com/apps/giscus
3. Get repo ID: https://giscus.app
4. Dodaj na dno svakog note-a

```bash
npm install @giscus/react
```

---

### **7. Page View Counter** 👁️

#### Real-time View Count

```typescript
// components/ViewCounter.tsx
'use client'

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState(0)

  useEffect(() => {
    // Increment view
    fetch(`/api/views/${slug}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => setViews(data.views))
  }, [slug])

  return (
    <span className="text-sm text-text-secondary">
      {views.toLocaleString()} views
    </span>
  )
}
```

#### API sa Edge KV Storage

```typescript
// app/api/views/[slug]/route.ts
export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  // Increment u KV storage ili database
  const views = await incrementViews(slug);

  return Response.json({ views });
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const views = await getViews(params.slug);
  return Response.json({ views });
}
```

---

### **8. RSS Feed** 📰

```typescript
// app/feed.xml/route.ts
import RSS from "rss";
import { getAllNotes } from "@/lib/mdx";

export async function GET() {
  const feed = new RSS({
    title: "Lazar — Engineering Notes",
    description: "Technical notes on IoT and backend systems",
    feed_url: "https://lakishadev-web.pages.dev/feed.xml",
    site_url: "https://lakishadev-web.pages.dev",
    language: "en",
  });

  const notes = await getAllNotes("en");

  notes.forEach((note) => {
    feed.item({
      title: note.title,
      description: note.description,
      url: `https://lakishadev-web.pages.dev/notes/${note.slug}`,
      date: note.date,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
```

```bash
npm install rss
```

Dodaj link u Footer:

```typescript
<a href="/feed.xml">RSS Feed</a>
```

---

### **9. Loading States & Skeletons** ⏳

#### Skeleton Components

```typescript
// components/Skeleton.tsx
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-6 animate-pulse">
      <div className="h-4 bg-text-secondary/10 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-text-secondary/10 rounded w-full mb-2"></div>
      <div className="h-3 bg-text-secondary/10 rounded w-5/6"></div>
    </div>
  )
}

export function NoteCardSkeleton() {
  return (
    <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-6 animate-pulse">
      <div className="h-6 bg-text-secondary/10 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-text-secondary/10 rounded w-full mb-2"></div>
      <div className="h-4 bg-text-secondary/10 rounded w-4/5 mb-4"></div>
      <div className="h-3 bg-text-secondary/10 rounded w-24"></div>
    </div>
  )
}
```

#### Loading.tsx files

```typescript
// app/[locale]/projects/loading.tsx
import { ProjectCardSkeleton } from '@/components/Skeleton'

export default function Loading() {
  return (
    <Section>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </Section>
  )
}
```

---

### **10. Toast Notifications** 🔔

```bash
npm install sonner
```

```typescript
// app/layout.tsx
import { Toaster } from 'sonner'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
```

```typescript
// components/ContactForm.tsx
import { toast } from "sonner";

const handleSubmit = async (e) => {
  e.preventDefault();

  toast.loading("Sending message...");

  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    toast.success("Message sent successfully!");
  } else {
    toast.error("Failed to send message");
  }
};
```

---

## 🎨 UI/UX Improvements

### 11. **Scroll Progress Bar**

```typescript
// components/ScrollProgress.tsx
'use client'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress((scrolled / height) * 100)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-accent z-50 transition-all"
      style={{ width: `${progress}%` }}
    />
  )
}
```

### 12. **Copy Code Button**

```typescript
// components/CodeBlock.tsx
'use client'

import { Check, Copy } from 'lucide-react'

export default function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <button
        onClick={copy}
        className="absolute top-2 right-2 p-2 rounded bg-surface hover:bg-surface/80"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <pre><code className={`language-${language}`}>{code}</code></pre>
    </div>
  )
}
```

### 13. **Reading Time Estimate**

```typescript
// lib/reading-time.ts
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
```

```typescript
// components/NoteCard.tsx
<span className="text-sm text-text-secondary">
  {calculateReadingTime(note.content)} min read
</span>
```

### 14. **Back to Top Button**

```typescript
// components/BackToTop.tsx
'use client'

import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/80 transition-all"
    >
      <ArrowUp size={20} />
    </button>
  )
}
```

---

## 📱 Mobile Improvements

### 15. **Mobile Navigation Menu**

- Hamburger menu za mobile (trenutno možda nema)
- Swipe gestures za navigation
- Touch-friendly button sizes (minimum 44x44px)

### 16. **Mobile Performance**

- Reduce bundle size za mobile
- Lazy load images below the fold
- Reduce animation complexity on mobile

---

## 🔐 Security & Privacy

### 17. **Content Security Policy (CSP)**

```typescript
// next.config.mjs
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-insights.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
    `
      .replace(/\\s{2,}/g, " ")
      .trim(),
  },
];

export default {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};
```

### 18. **Rate Limiting na Contact Form**

```typescript
// app/api/contact/route.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"), // 3 poruke po satu
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  // Process form...
}
```

---

## 📊 Monitoring & Error Tracking

### 19. **Sentry Error Tracking**

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### 20. **Uptime Monitoring**

Koristi:

- **UptimeRobot** (free tier)
- **BetterStack** (advanced)
- **Cloudflare Analytics** (već imaš ako si na Cloudflare)

---

## 🚀 Deployment Checklist

Pre production launcha proveri:

- [ ] Google Search Console setup
- [ ] Bing Webmaster Tools setup
- [ ] Custom domain setup (lakishadev.com?)
- [ ] SSL certificate valid
- [ ] All environment variables set
- [ ] Error monitoring setup (Sentry)
- [ ] Analytics tracking code
- [ ] Sitemap submitted to search engines
- [ ] robots.txt validiran
- [ ] Social media cards tested (Twitter Card Validator)
- [ ] Mobile responsiveness test
- [ ] Lighthouse score 90+
- [ ] Accessibility audit (WCAG AA)
- [ ] Performance budget set
- [ ] Backup strategy
- [ ] Database backups (ako imaš)

---

## 🎓 Content Strategy

### Nedeljni Plan:

- **Ponedeljak**: Brainstorm ideja za notes
- **Sreda**: Piši novi note (minimum 500 reči)
- **Petak**: Optimize SEO i share na social media
- **Nedelja**: Review analytics i plan za sledeću nedelju

### Topics da pokriješ:

1. "How I Built a Scalable IoT Platform with ESP32"
2. "WebSocket Best Practices for Production"
3. "PostgreSQL vs SQLite for IoT Data"
4. "TypeScript Patterns I Use Every Day"
5. "Debugging Real-Time Systems"
6. "From Monolith to Microservices: My Journey"
7. "ESP32 Battery Optimization Techniques"
8. "Building a CI/CD Pipeline for Embedded Devices"
9. "Security Considerations for IoT Devices"
10. "My Development Setup and Tools"

---

**Cilj za Q1 2026:**

- ✅ 10+ quality notes objavljeno
- ✅ 500+ monthly visitors
- ✅ 20+ contact form submissions
- ✅ 100+ newsletter subscribers
- ✅ Top 10 Google rezultat za "IoT engineer portfolio"

Srećno sa razvojem! 🚀
