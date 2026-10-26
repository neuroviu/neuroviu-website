# NeuroViu GitHub Pages migration (draft)

This package adapts the recovered Netlify/TanStack Start source into a client-side Vite/TanStack Router build for GitHub Pages. It preserves original content, styling, media and route components.

**Not yet built or deployed.** This environment cannot access npm registry, so `npm ci`/`npm run build` could not be verified. GitHub Actions workflow will build after upload.

**Important:** Netlify form endpoints DO NOT work on GitHub Pages. Forms are intentionally prevented from reporting false success until a new form backend is configured. Use an approved Formspree endpoint or other backend before going live.

Recommended: create a NEW PUBLIC repository `neuroviu/neuroviu-website` (do not overwrite `neuroviu/neuroviu`, the existing profile repository), upload the contents of this archive (not the archive itself), and set Settings > Pages > Source to GitHub Actions. For testing under /neuroviu-website/, set Vite `base` to '/neuroviu-website/' and adjust absolute media paths, or test using the eventual custom domain.

After deployment and validation, configure `neuroviu.org` as the custom domain in GitHub Pages Settings, then update DNS. Keep current DNS unchanged until tested.
