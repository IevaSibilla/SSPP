---
name: deploy-changes
description: Guides deployment of this React/Vite site to Hostinger via GitHub. Use when the user wants to deploy, push changes live, rebuild the dist folder, or asks how to get changes showing on the website.
---

# Deploy Changes to Hostinger

This project deploys to Hostinger via GitHub. Hostinger reads the built `dist/` folder directly from the repository — so after any source code change, you must rebuild `dist/` and commit it before the live site updates.

## Deployment Steps

Run these commands in order after pulling or making changes:

```bash
# 1. Rebuild the production dist/ folder
npm run build

# 2. Stage the built files
git add dist/

# 3. Commit with a descriptive message
git commit -m "build: rebuild dist"

# 4. Push to GitHub — Hostinger auto-deploys from main
git push origin main
```

## Key Rules

- **Always rebuild after source changes.** Editing `.tsx` files alone is not enough — Hostinger serves `dist/`, not the source.
- **Always commit `dist/`.** Both the source files (`components/`) and the built files (`dist/`) must be committed together.
- **The bundle filename changes on each build.** Vite hashes the JS filename (e.g. `index-XXXXX.js`). This is normal — git will show the old file deleted and a new one created.

## What `npm run build` Does

Runs `vite build` which:
- Compiles TypeScript/React → plain JavaScript
- Bundles all components into `dist/assets/index-XXXXX.js`
- Copies everything in `public/` → `dist/` (images, logos, `.htaccess`)
- Updates `dist/index.html` with the correct asset references

## Verify Before Pushing

```bash
npm run preview   # Test the production build locally at http://localhost:4173
```

## Common Issue: Changes Not Showing on Live Site

If the website still shows old content after redeploying:
1. Check that `dist/` was rebuilt and committed (not just the source files)
2. Wait 1–5 minutes for Hostinger to finish deploying
3. Hard refresh the browser: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
