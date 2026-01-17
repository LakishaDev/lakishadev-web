# Lazar — Personal Website

Professional, multilingual portfolio website showcasing full-stack and IoT engineering work with advanced features.

## ✨ Features

- **🌍 Multilingual Support (i18n):** English, Serbian (Latin), Serbian (Cyrillic)
- **📝 MDX Blog/Notes:** Write technical articles with syntax highlighting
- **📬 Contact Form:** Serverless contact form with Resend API
- **🔥 GitHub Activity Feed:** Real-time GitHub contribution display
- **🎨 Dark-First Design:** Minimalist, professional aesthetic
- **⚡ Performance Optimized:** Loading states, image optimization
- **📊 Analytics:** Vercel Analytics integration
- **🎯 SEO Optimized:** Meta tags, Open Graph, sitemap
- **🎭 Easter Egg:** Console message for developers

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **i18n:** next-intl
- **Content:** MDX with next-mdx-remote
- **Email:** Resend API
- **Analytics:** Vercel Analytics
- **Fonts:** Inter, JetBrains Mono
- **Icons:** Lucide React
- **Deployment:** Cloudflare Pages (with OpenNext adapter)

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd lakishadev-web
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

- `RESEND_API_KEY` - Get from [Resend](https://resend.com)
- `GITHUB_USERNAME` - Your GitHub username
- `GITHUB_TOKEN` - GitHub personal access token (optional, for higher rate limits)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
lakishadev-web/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── page.tsx           # Home page
│   │   ├── projects/          # Projects page
│   │   ├── notes/             # Engineering notes
│   │   │   └── [slug]/        # Individual note pages
│   │   ├── contact/           # Contact page
│   │   └── layout.tsx         # Locale layout
│   ├── api/
│   │   ├── contact/           # Contact form API
│   │   └── github/activity/   # GitHub activity API
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── Hero.tsx               # Hero section
│   ├── Navbar.tsx             # Navigation with language switcher
│   ├── Footer.tsx             # Footer
│   ├── Section.tsx            # Reusable section wrapper
│   ├── ProjectCard.tsx        # Project display card
│   ├── NoteCard.tsx           # Note display card
│   ├── ContactForm.tsx        # Contact form with validation
│   ├── GitHubActivity.tsx     # GitHub activity feed
│   └── ConsoleEasterEgg.tsx   # Developer easter egg
├── content/notes/
│   ├── en/                    # English notes
│   ├── sr/                    # Serbian (Latin) notes
│   └── sr-Cyrl/               # Serbian (Cyrillic) notes
├── messages/
│   ├── en.json                # English translations
│   ├── sr.json                # Serbian (Latin) translations
│   └── sr-Cyrl.json           # Serbian (Cyrillic) translations
├── lib/
│   ├── data.ts                # Static content data
│   └── mdx.ts                 # MDX utilities
├── i18n.ts                    # i18n configuration
├── i18n-config.ts             # next-intl setup
└── middleware.ts              # Locale detection middleware
```

## Customization

### Update Personal Information

1. **Content:** Edit [lib/data.ts](lib/data.ts) - Update projects and skills
2. **Contact:** Update email, GitHub, LinkedIn URLs in:
   - [components/Footer.tsx](components/Footer.tsx)
   - [components/Hero.tsx](components/Hero.tsx)
   - [app/[locale]/contact/page.tsx](app/[locale]/contact/page.tsx)
3. **Metadata:** Edit [app/[locale]/layout.tsx](app/[locale]/layout.tsx)
4. **GitHub:** Set `GITHUB_USERNAME` in `.env.local`

### Add New Blog Posts

Create MDX files in `content/notes/{locale}/`:

```mdx
---
title: "Your Post Title"
excerpt: "Brief description"
date: "2026-01-17"
tags: ["tag1", "tag2"]
---

# Your Content Here

Write your technical article using MDX...
```

### Translations

Edit translation files in `messages/`:

- `en.json` - English
- `sr.json` - Serbian (Latin)
- `sr-Cyrl.json` - Serbian (Cyrillic)

### Color Scheme

Colors are in [tailwind.config.ts](tailwind.config.ts):

```ts
colors: {
  background: "#0B0F14",
  surface: "#121826",
  primary: "#1165A3",
  accent: "#38BDF8",
  "accent-alt": "#22D3EE",
  "text-primary": "#E5E7EB",
  "text-secondary": "#9CA3AF",
}
```

## API Endpoints

### Contact Form

`POST /api/contact`

```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

### GitHub Activity

`GET /api/github/activity`

Returns recent GitHub events

## Design Principles

- **Dark-first:** Optimized for dark mode
- **Minimalist:** Clean, focused layouts
- **Professional:** No gimmicks, strong hierarchy
- **System-oriented:** Technical language
- **Accessible:** ARIA labels, keyboard navigation
- **Performant:** Optimized images, loading states

## Deployment

### Cloudflare Pages (Recommended)

**Quick Deploy:**

```bash
npm run build
npm run pages:build
npx wrangler pages deploy .open-next/worker --project-name=lakishadev-web
```

**GitHub Integration:**

1. Push to GitHub
2. Connect repository in [Cloudflare Pages](https://dash.cloudflare.com)
3. Build settings:
   - **Build command:** `npm run build && npx @opennextjs/cloudflare`
   - **Build output directory:** `.open-next/worker`
4. Add environment variables in dashboard

**Environment variables needed:**

- `RESEND_API_KEY`
- `GITHUB_USERNAME`
- `GITHUB_TOKEN` (optional)

**Set secrets via Wrangler:**

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put GITHUB_USERNAME
```

📖 **Full deployment guide:** See [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)

### Vercel (Alternative)

Also compatible with Vercel:

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

Build command for Vercel: `npm run build`

## Performance

- **Lighthouse Score:** 95+ on all metrics
- **Loading States:** Skeleton screens for async content
- **Image Optimization:** Next.js automatic optimization
- **Code Splitting:** Automatic with App Router
- **Analytics:** Privacy-friendly Vercel Analytics

## Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use.

## License

MIT
