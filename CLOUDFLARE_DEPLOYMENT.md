# Cloudflare Pages Deployment Guide (OpenNext)

This project uses **@opennextjs/cloudflare** adapter for deploying Next.js to Cloudflare Pages.

## Prerequisites

- Node.js 18+ installed
- Cloudflare account
- Wrangler CLI (automatically installed as dev dependency)

## Deployment Methods

### Method 1: Using Wrangler CLI (Recommended for first deployment)

1. **Login to Cloudflare**

   ```bash
   npx wrangler login
   ```

2. **Build the project**

   ```bash
   npm run build
   npm run pages:build
   ```

3. **Deploy to Cloudflare Pages**

   ```bash
   npx wrangler pages deploy .open-next/worker --project-name=lakishadev-web
   ```

4. **Set environment variables**
   ```bash
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put GITHUB_USERNAME
   npx wrangler secret put GITHUB_TOKEN
   ```

### Method 2: Using npm Scripts

```bash
# Build for Cloudflare
npm run pages:build

# Deploy to Cloudflare Pages
npm run pages:deploy

# Or run local Cloudflare dev server
npm run pages:dev
```

### Method 3: GitHub Integration (Automated)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Select **Pages** → **Create a project**
   - Connect your GitHub repository
   - Configure build settings:
     - **Framework preset**: Next.js
     - **Build command**: `npm run build && npx @opennextjs/cloudflare`
     - **Build output directory**: `.open-next/worker`
     - **Root directory**: `/`
     - **Node version**: `18` or `20`

3. **Add environment variables in Cloudflare Dashboard**
   - Navigate to: Pages → Your Project → Settings → Environment variables
   - Add:
     - `RESEND_API_KEY` (for contact form)
     - `GITHUB_USERNAME` (your GitHub username)
     - `GITHUB_TOKEN` (optional, for higher rate limits)

4. **Redeploy**
   - Cloudflare will automatically redeploy on every push to main branch

## Environment Variables

### Required

- `RESEND_API_KEY` - For contact form email functionality
- `GITHUB_USERNAME` - For GitHub activity feed

### Optional

- `GITHUB_TOKEN` - GitHub personal access token for higher API rate limits

## Troubleshooting

### Build Errors

**Error: "Module not found: Can't resolve 'path'"**

- Solution: Don't use `runtime = "edge"` on pages that use Node.js built-in modules (fs, path)
- Pages using MDX (notes, blog) should NOT have `export const runtime = "edge"`

**Error: "Missing API key"**

- Solution: Environment variables are not available during build. Use lazy initialization:
  ```typescript
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
  ```

### Deployment Errors

**Error: "nodejs_compat compatibility flag required"**

- Solution: Add to `wrangler.toml`:
  ```toml
  compatibility_flags = ["nodejs_compat"]
  ```

**Error: "Route not configured for Edge Runtime"**

- Solution: Only add `export const runtime = "edge"` to routes that don't use Node.js APIs
- API routes and simple pages can use edge runtime
- Pages using fs/path (MDX) should use Node.js runtime

## Performance

Cloudflare Pages with OpenNext provides:

- ✅ Global CDN distribution (300+ cities)
- ✅ 0ms cold starts
- ✅ Automatic HTTPS
- ✅ Unlimited bandwidth (on Free plan)
- ✅ Built-in DDoS protection
- ✅ Analytics included

## Local Development

```bash
# Standard Next.js dev server
npm run dev

# Cloudflare Pages dev server (simulates production)
npm run pages:dev
```

## Continuous Deployment

Every push to `main` branch will trigger automatic deployment on Cloudflare Pages if GitHub integration is configured.

## Custom Domain

1. Go to Cloudflare Pages → Your Project → Custom domains
2. Add your domain
3. Update DNS records as instructed
4. SSL certificate will be automatically provisioned

## Monitoring

- **Analytics**: Available in Cloudflare Dashboard → Pages → Your Project → Analytics
- **Logs**: Use `wrangler tail` for real-time logs
  ```bash
  npx wrangler pages deployment tail
  ```

## Support

- [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Documentation](https://nextjs.org/docs)
