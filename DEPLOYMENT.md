# Deployment Guide

Complete guide for deploying your portfolio website to Vercel.

## Prerequisites

1. GitHub account
2. Vercel account (free tier is sufficient)
3. Resend account (for contact form) - [resend.com](https://resend.com)
4. GitHub Personal Access Token (optional, for GitHub Activity Feed)

## Step 1: Prepare Your Repository

### 1.1 Update Personal Information

Before deploying, customize these files:

**lib/data.ts** - Update your projects:

```typescript
export const projects: Project[] = [
  {
    id: "your-project",
    title: "Your Project Title",
    description: "Your project description...",
    stack: ["Tech1", "Tech2", "Tech3"],
    githubUrl: "https://github.com/yourusername/project",
  },
];
```

**components/Footer.tsx & Hero.tsx** - Update contact info:

- Replace `your.email@example.com` with your email
- Replace GitHub URL: `https://github.com/yourusername`
- Replace LinkedIn URL: `https://linkedin.com/in/yourprofile`

**app/api/github/activity/route.ts** - Update:

```typescript
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "yourusername";
```

### 1.2 Commit Changes

```bash
git add .
git commit -m "Customize portfolio with personal information"
git push origin main
```

## Step 2: Set Up External Services

### 2.1 Resend (Email Service)

1. Go to [resend.com](https://resend.com) and sign up
2. Navigate to API Keys section
3. Create a new API key
4. Copy the API key (starts with `re_`)
5. (Optional) Add and verify your custom domain for professional emails

### 2.2 GitHub Personal Access Token (Optional)

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scope: `public_repo`
4. Copy the token (starts with `ghp_`)

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Select the repository from GitHub

### 3.2 Configure Project

Vercel will auto-detect Next.js settings:

- **Framework Preset:** Next.js
- **Root Directory:** ./
- **Build Command:** `npm run build`
- **Output Directory:** .next
- **Install Command:** `npm install`

Click "Deploy" (it will fail first time due to missing env variables - this is expected)

### 3.3 Add Environment Variables

After initial deployment attempt:

1. Go to Project Settings → Environment Variables
2. Add the following variables:

| Variable Name          | Value                        | Environment                      |
| ---------------------- | ---------------------------- | -------------------------------- |
| `RESEND_API_KEY`       | Your Resend API key          | Production, Preview, Development |
| `GITHUB_USERNAME`      | Your GitHub username         | Production, Preview, Development |
| `GITHUB_TOKEN`         | Your GitHub token (optional) | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | https://yourdomain.com       | Production                       |

3. Click "Save"

### 3.4 Redeploy

1. Go to "Deployments" tab
2. Click "..." on the latest deployment
3. Click "Redeploy"

Your site should now deploy successfully!

## Step 4: Configure Custom Domain (Optional)

### 4.1 Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `yourdomain.com`)
3. Vercel will provide DNS records

### 4.2 Update DNS Records

Add these records to your domain provider:

**A Record:**

```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record:**

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 4.3 Wait for DNS Propagation

- Usually takes 1-24 hours
- Vercel will auto-generate SSL certificate

### 4.4 Update Resend Domain (If using custom domain for emails)

1. In Resend, go to Domains
2. Add your domain
3. Update the `from` field in `app/api/contact/route.ts`:

```typescript
from: "Contact Form <contact@yourdomain.com>",
```

4. Redeploy on Vercel

## Step 5: Post-Deployment Checks

### 5.1 Test All Features

- ✅ Navigate between pages (Home, Projects, Notes, Contact)
- ✅ Switch languages (EN, SR Latin, SR Cyrillic)
- ✅ Submit contact form
- ✅ Check GitHub activity feed loads
- ✅ Open MDX blog post
- ✅ Check console for easter egg (F12)

### 5.2 Test Contact Form

1. Go to /contact page
2. Fill out form
3. Check your email for received message
4. Verify reply-to is correct

### 5.3 Monitor Analytics

- Go to Vercel Dashboard → Analytics
- Check visitor data after a few hours

## Step 6: Continuous Deployment

Every push to `main` branch will auto-deploy:

```bash
git add .
git commit -m "Update content"
git push origin main
```

Vercel will automatically:

1. Build your site
2. Run tests
3. Deploy to production
4. Notify you of status

## Troubleshooting

### Build Fails

**Check logs:**

1. Go to Vercel → Deployments → Click failed deployment
2. View build logs
3. Fix errors locally and push again

**Common issues:**

- Missing environment variables
- TypeScript errors
- Missing dependencies in package.json

### Contact Form Not Working

**Check:**

- Resend API key is correct
- Email sender domain is verified
- Check Vercel logs for API errors

### GitHub Activity Not Showing

**Check:**

- `GITHUB_USERNAME` is set correctly
- GitHub API rate limit not exceeded
- Add `GITHUB_TOKEN` for higher rate limits

### i18n Not Working

**Check:**

- Middleware is configured correctly
- Locale files exist in `messages/` folder
- All translated strings are present

## Performance Optimization

### Enable Vercel Speed Insights

1. Go to Project Settings → Speed Insights
2. Enable Speed Insights
3. Add to layout:

```typescript
import { SpeedInsights } from "@vercel/speed-insights/next";

// In layout
<SpeedInsights />
```

### Enable Image Optimization

Images are auto-optimized. To use Next.js Image:

```tsx
import Image from "next/image";

<Image src="/your-image.jpg" alt="Description" width={800} height={600} />;
```

## Security Best Practices

1. **Never commit .env files** - Already in .gitignore
2. **Rotate API keys** if exposed
3. **Use environment variables** for all secrets
4. **Enable** Vercel Deployment Protection if needed
5. **Review** Vercel Security settings

## Monitoring

### Set Up Monitoring

1. **Vercel Analytics** - Already integrated
2. **Sentry** (optional) - For error tracking
3. **Uptime monitoring** - Use UptimeRobot or similar

### Check Performance

- Lighthouse score: Should be 90+
- Core Web Vitals in Vercel dashboard
- Monitor build times

## Updating Content

### Add New Project

1. Edit `lib/data.ts`
2. Add project to `projects` array
3. Commit and push

### Add New Blog Post

1. Create MDX file in `content/notes/{locale}/`
2. Add frontmatter
3. Write content
4. Commit and push

### Update Translations

1. Edit files in `messages/` folder
2. Keep keys consistent across languages
3. Commit and push

## Backup Strategy

1. **Code:** GitHub (automatic)
2. **Environment Variables:** Document in password manager
3. **Content:** MDX files are in Git
4. **Analytics Data:** Export from Vercel monthly

## Next Steps

- Add more MDX blog posts
- Create case studies for projects
- Add project images
- Implement search functionality
- Add RSS feed
- Create sitemap.xml

## Support

If you encounter issues:

1. Check Vercel documentation
2. Review Next.js App Router docs
3. Check next-intl documentation
4. Review error logs in Vercel dashboard

## Checklist

- [ ] Updated personal information in all files
- [ ] Set up Resend account and API key
- [ ] Created GitHub token (optional)
- [ ] Deployed to Vercel
- [ ] Added environment variables
- [ ] Tested contact form
- [ ] Verified GitHub activity feed
- [ ] Checked all language versions
- [ ] Configured custom domain (optional)
- [ ] Tested on mobile devices
- [ ] Verified SEO meta tags
- [ ] Enabled analytics
- [ ] Set up monitoring

## Congratulations! 🎉

Your portfolio is now live and production-ready!
