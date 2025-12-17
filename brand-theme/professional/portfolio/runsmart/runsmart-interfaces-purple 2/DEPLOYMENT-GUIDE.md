# RunSmart Cloudflare Pages Deployment Guide

## ✅ Current Status

**Live URL**: https://23fe460c.runsmart-prototype.pages.dev
**Project Name**: runsmart-prototype
**Deployment Date**: December 11, 2025
**Status**: ✅ Deployed and Live

---

## 🚀 Quick Redeploy (After Making Changes)

```bash
cd /Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system/brand-theme/professional/portfolio/runsmart/runsmart-interfaces-purple

# Option 1: Use npm script (recommended)
npm run deploy -- --commit-dirty=true

# Option 2: Use deployment script
./scripts/deploy-runsmart.sh

# Option 3: Direct wrangler command
npx wrangler pages deploy . --project-name=runsmart-prototype --branch=production --commit-dirty=true
```

---

## 🌐 Custom Domain Configuration

### Option 1: runsmart.9bitstudios.io (Recommended)

1. **Add Custom Domain in Cloudflare:**
   - Go to: https://dash.cloudflare.com/
   - Navigate to: **Workers & Pages** → **runsmart-prototype** → **Custom domains**
   - Click: **Set up a custom domain**
   - Enter: `runsmart.9bitstudios.io`
   - Click: **Continue**

2. **DNS Configuration:**
   Cloudflare will show you the required DNS records. Add these to your 9bitstudios.io domain:

   ```
   Type: CNAME
   Name: runsmart
   Target: runsmart-prototype.pages.dev
   Proxy: ✅ Proxied (orange cloud)
   ```

3. **Wait for DNS Propagation** (2-5 minutes)

4. **Verify**: Visit https://runsmart.9bitstudios.io

### Option 2: quantum-spatial-design-system.runsmart.io

If you want this subdomain instead:
- Same process as above
- But you'll need to configure DNS for the runsmart.io domain
- Contact domain registrar if you don't have access to runsmart.io DNS

---

## 📁 What Got Deployed

✅ **88 files uploaded** including:
- `index.html` - Main portfolio showcase
- `dashboard/` - 8 dashboard HTML files
- `mobile/` - 9 mobile app screens
- `watch/` - 2 Apple Watch screens
- `presentation/` - 1 presentation file
- `assets/` - Design system CSS, icons, images
- `documentation/` - All guides and docs
- `scripts/` - Deployment scripts

---

## ✨ Features Enabled

✅ **Fonts**: Apple fonts priority, Inter fallback for Windows/Linux
✅ **Design System**: Full CSS with design tokens
✅ **Responsive**: Mobile-first, works on all devices
✅ **Fast**: Cloudflare CDN, global edge network
✅ **HTTPS**: Automatic SSL certificates
✅ **Free**: Unlimited bandwidth on Cloudflare free tier

---

## 🔄 Deployment Workflow

### For Ongoing Development:

1. **Make Changes** to HTML/CSS files locally
2. **Test Locally** (optional):
   ```bash
   npm run dev  # Starts local server on http://localhost:8080
   ```
3. **Deploy**:
   ```bash
   npm run deploy -- --commit-dirty=true
   ```
4. **Verify** at live URL

### Automatic Updates:
- Each deployment creates a new version
- Production URL updates immediately
- Preview deployments available for testing

---

## 🛠️ Deployment Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run deploy` | Deploy to production |
| `npm run deploy:preview` | Deploy to preview branch |
| `npm run dev` | Run local dev server |
| `npx wrangler pages project list` | List all projects |
| `npx wrangler whoami` | Check login status |

---

## 📊 Cloudflare Dashboard

**Project URL**: https://dash.cloudflare.com/
Navigate to: **Workers & Pages** → **runsmart-prototype**

From here you can:
- View deployment history
- Configure custom domains
- Set up redirects
- View analytics
- Configure access policies

---

## 🎯 Next Steps

### Immediate:
- [ ] Test live URL: https://23fe460c.runsmart-prototype.pages.dev
- [ ] Verify all screens load correctly
- [ ] Check responsive design on mobile
- [ ] Test font rendering on Windows (if possible)

### Custom Domain:
- [ ] Decide on subdomain: `runsmart.9bitstudios.io` or `quantum-spatial-design-system.runsmart.io`
- [ ] Configure DNS in Cloudflare
- [ ] Wait for DNS propagation
- [ ] Update portfolio links

### Portfolio Integration:
- [ ] Add live demo link to resume
- [ ] Update cover letter with live URL
- [ ] Create LinkedIn post with screenshots
- [ ] Share with potential clients/employers

---

## 🐛 Troubleshooting

### Deployment Fails
```bash
# Check login status
npx wrangler whoami

# Re-authenticate if needed
npx wrangler login
```

### Files Not Updating
```bash
# Clear Cloudflare cache
# Cloudflare Dashboard > Caching > Purge Everything
```

### Custom Domain Not Working
- Check DNS propagation: https://dnschecker.org
- Verify CNAME points to: runsmart-prototype.pages.dev
- Ensure Cloudflare proxy is enabled (orange cloud)

---

## 💡 Tips

1. **Preview Deployments**: Use `--branch=preview` to test changes before production
2. **Rollback**: Use Cloudflare Dashboard to rollback to previous deployments
3. **Analytics**: Enable Web Analytics in Cloudflare for visitor stats
4. **Performance**: Images are external (Cloudinary), so site loads fast
5. **Cost**: Completely free on Cloudflare Pages free tier

---

## 🔒 Security

- ✅ HTTPS enabled by default
- ✅ Cloudflare DDoS protection
- ✅ No sensitive data in repo (images on Cloudinary)
- ✅ Static files only (no server-side vulnerabilities)

---

## ✅ Success Checklist

- [x] Wrangler installed
- [x] Cloudflare authenticated
- [x] Project created
- [x] Files deployed (88 files)
- [x] Live URL working
- [x] Fonts configured with Windows fallback
- [ ] Custom domain configured
- [ ] Shared in portfolio

---

**🎉 Your RunSmart prototype is live and ready to share!**

Visit: https://23fe460c.runsmart-prototype.pages.dev
