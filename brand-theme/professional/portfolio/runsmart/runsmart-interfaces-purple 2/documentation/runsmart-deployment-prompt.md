# Deploy RunSmart HTML Prototype to Cloudflare Pages

## Context
I have a complete interactive HTML prototype for RunSmart case study:
- CSS design system file
- ~15 HTML pages/screens
- Images hosted on Cloudinary (external URLs)
- Low file size, straightforward static site
- Already have Cloudflare account configured

## Goal
Deploy this prototype to Cloudflare Pages so it's live at a URL I can share in portfolio presentations.

## Current File Structure
```
runsmart-prototype/
├── runsmart-design-system.css
├── index.html (or similar entry point)
├── dashboard.html
├── mobile-coach-dashboard.html
├── mobile-app-today.html
└── [~11 more HTML files]
```

## Deployment Strategy: Cloudflare Pages via Git

**Approach:** Direct deploy via Wrangler CLI (fastest path)

### Step 1: Organize Files
```bash
# Create project directory
mkdir runsmart-prototype
cd runsmart-prototype

# Move all HTML files and CSS into this directory
# Ensure there's an index.html as the entry point
```

### Step 2: Create pages project config
```bash
# Create wrangler.toml for Pages
cat > wrangler.toml << 'EOF'
name = "runsmart-prototype"
compatibility_date = "2025-01-01"
pages_build_output_dir = "./"

[site]
bucket = "./"
EOF
```

### Step 3: Deploy to Cloudflare Pages
```bash
# Login if not already authenticated
npx wrangler login

# Deploy directly from directory
npx wrangler pages deploy . --project-name=runsmart-prototype
```

### Step 4: Verify
- Pages will auto-generate URL: `runsmart-prototype.pages.dev`
- Test all navigation links work
- Verify Cloudinary images load correctly

## Alternative: Custom Subdomain
If I want custom domain like `runsmart.9bitstudios.io`:

```bash
# Deploy with production branch
npx wrangler pages deploy . --project-name=runsmart-prototype --branch=main

# Then configure custom domain in Cloudflare dashboard:
# Pages > runsmart-prototype > Custom domains > Add domain
```

## Expected Output
Live URL accessible for:
- Portfolio presentations
- Cover letter links
- LinkedIn showcase posts
- Interview discussions

## Success Criteria
- ✅ All HTML pages accessible
- ✅ CSS styling renders correctly
- ✅ Cloudinary images load
- ✅ Navigation between pages works
- ✅ Mobile responsive (if applicable)
- ✅ Fast load times (<2s)

## Questions to Answer:
1. What's my preferred URL structure?
   - Option A: `runsmart-prototype.pages.dev`
   - Option B: `runsmart.9bitstudios.io` (custom subdomain)
   - Option C: `9bitstudios.io/runsmart` (subpath)

2. Is there an existing index.html or do I need to create a landing page?

3. Do all HTML files link to each other correctly or need path fixes?

## Execute This:
1. Organize files into single directory
2. Verify index.html exists as entry point
3. Run `npx wrangler pages deploy . --project-name=runsmart-prototype`
4. Share the live URL

**Timeline:** 10-15 minutes from start to live URL
