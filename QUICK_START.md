# Quick Deployment Reference

## ⚡ Deploy Now

```bash
# 1. Build Next.js
npm run build

# 2. Build for Cloudflare
npm run pages:build

# 3. Login (first time only)
npx wrangler login

# 4. Deploy
npx wrangler pages deploy .open-next/worker --project-name=lakishadev-web

# 5. Set environment variables
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put GITHUB_USERNAME
npx wrangler secret put GITHUB_TOKEN  # Optional
```

## 📦 What Changed

| File/Folder                | Change                                                  |
| -------------------------- | ------------------------------------------------------- |
| `package.json`             | Added `@opennextjs/cloudflare`, `wrangler`, new scripts |
| `next.config.mjs`          | Added `output: "standalone"`                            |
| `wrangler.toml`            | **NEW** - Cloudflare configuration                      |
| `.gitignore`               | Added `/.open-next/`                                    |
| All `[locale]` pages       | Removed `runtime = "edge"`, added `setRequestLocale()`  |
| Notes pages                | Added `dynamic = "force-dynamic"`                       |
| `app/api/contact/route.ts` | Kept `runtime = "edge"` (API routes work on Edge)       |

## 🎯 New npm Scripts

```bash
npm run pages:build   # Build for Cloudflare Pages
npm run pages:deploy  # Build + Deploy in one command
npm run pages:dev     # Local Cloudflare Workers dev server
```

## ⚠️ Important Notes

- **MDX pages** (notes) use Node.js runtime (not Edge) because they read files
- **API routes** can still use Edge Runtime
- **OpenNext** handles Node.js compatibility on Cloudflare Workers
- **Dynamic rendering** is enabled for pages that need it

## 🔑 Environment Variables

Set in Cloudflare Dashboard or via Wrangler CLI:

- `RESEND_API_KEY` - Contact form emails
- `GITHUB_USERNAME` - GitHub activity feed
- `GITHUB_TOKEN` - Optional, for higher API rate limits

## 📚 Full Documentation

- [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) - All changes explained
- [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) - Complete deployment guide
- [README.md](./README.md) - Updated with Cloudflare instructions

## ✅ Verification

```bash
# Test local build
npm run build

# Test Cloudflare build
npm run pages:build

# Verify output created
ls -la .open-next/worker
```

## 🚀 Deployment Options

1. **Wrangler CLI** (shown above) - Best for manual deployments
2. **GitHub Actions** - Connect repo to Cloudflare Pages for auto-deploy
3. **npm script** - `npm run pages:deploy` combines build + deploy

## 💡 Pro Tips

- Use `npm run pages:dev` to test Cloudflare Workers locally
- Check [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) for troubleshooting
- Monitor deployment at `dash.cloudflare.com`
- View real-time logs with `npx wrangler pages deployment tail`

## 🎉 Benefits

✅ Global CDN (300+ locations)  
✅ 0ms cold starts  
✅ Unlimited bandwidth (Free tier)  
✅ Automatic HTTPS  
✅ Built-in DDoS protection  
✅ Free analytics included
