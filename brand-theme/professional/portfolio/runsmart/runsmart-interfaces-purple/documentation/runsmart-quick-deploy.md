# RunSmart Prototype → Live in 10 Minutes

## Quick Decision Points

**URL Strategy (pick one):**
- [ ] Simple: `runsmart-prototype.pages.dev` (auto-generated, instant)
- [ ] Custom: `runsmart.9bitstudios.io` (requires DNS config, +5 min)
- [ ] Subpath: `9bitstudios.io/runsmart` (requires route config, +10 min)

**Recommendation:** Start with `runsmart-prototype.pages.dev`, add custom domain later if needed.

---

## Execution Steps

### 1. Prepare Files (2 min)
```bash
mkdir ~/Desktop/runsmart-prototype
cd ~/Desktop/runsmart-prototype

# Copy your HTML + CSS files here
# Ensure you have index.html as entry point
```

### 2. Deploy (3 min)
```bash
# Authenticate (if not already)
npx wrangler login

# Deploy entire directory
npx wrangler pages deploy . --project-name=runsmart-prototype

# That's it! URL will be displayed in terminal
```

### 3. Test (2 min)
- Open provided URL
- Click through all pages
- Verify images load from Cloudinary
- Test mobile view

### 4. Share (3 min)
- Add to portfolio page
- Update cover letter links
- Create LinkedIn post

---

## What Gets Deployed

**Static files only:**
- All `.html` files in directory
- `runsmart-design-system.css`
- Any other CSS/JS files present

**External assets (already handled):**
- Images from Cloudinary (no upload needed)
- Fonts from CDN (if using)

**No build step needed** - this is pure HTML/CSS

---

## Alternative: Via Git (if you want version control)

```bash
# 1. Create repo
cd ~/Desktop/runsmart-prototype
git init
git add .
git commit -m "Initial RunSmart prototype"

# 2. Push to GitHub (if desired)
# gh repo create runsmart-prototype --public --source=. --push

# 3. Connect to Cloudflare Pages
# Dashboard > Pages > Create project > Connect Git
# Select repo > Deploy

# Future updates: git push auto-deploys
```

---

## Post-Deployment Actions

**Immediate:**
- [ ] Test all navigation
- [ ] Verify responsive design
- [ ] Share URL with Steve (if appropriate)

**Portfolio Integration:**
- [ ] Add link to 9bitstudios.io portfolio section
- [ ] Update resume/CV with live demo link
- [ ] Reference in Creative Developer application

**Content Strategy:**
- [ ] Screenshot key screens for LinkedIn post
- [ ] Create short video walkthrough
- [ ] Write announcement post about case study

---

## Troubleshooting

**Issue: "index.html not found"**
→ Rename your main landing page to `index.html`

**Issue: "Images not loading"**
→ Check Cloudinary URLs are absolute (https://...)

**Issue: "CSS not applying"**
→ Verify CSS link paths in HTML files are relative: `<link href="./runsmart-design-system.css">`

**Issue: "Navigation broken"**
→ Update links to relative paths: `<a href="./dashboard.html">`

---

## Cost
**Free Tier:**
- Unlimited static requests
- 500 builds/month
- 20,000 files
- Custom domains included

Your prototype: Well within free tier limits.

---

## Timeline

| Task | Duration |
|------|----------|
| Organize files | 2 min |
| Deploy command | 3 min |
| DNS propagation (if custom) | 2-5 min |
| Testing | 2 min |
| Portfolio updates | 3 min |
| **Total** | **10-15 min** |

---

## Success = Live URL

Example output after deploy:
```
✨ Success! Uploaded 16 files (5.23 sec)

✨ Deployment complete! Take a peek over at
   https://runsmart-prototype.pages.dev
```

→ **This URL goes in your portfolio NOW**
