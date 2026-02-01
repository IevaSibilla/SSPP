# AGENTS.md - Coding Agent Instructions

This file provides guidance for AI coding agents working on this project.

## Project Overview

**Ieva Sibilla Strupule - Pitch Authority** is a personal brand website for a pitch coach and startup mentor. It's a React + TypeScript single-page application with multiple routes (Home, About, Work, Contact) built with Vite.

### Tech Stack
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (utility-first)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** Custom hash-based router (`utils/router.tsx`)
- **Deployment:** Hostinger (static hosting)

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Start Express server (for server-side serving)
npm start
```

## Critical Build & Deployment Notes

### Static Assets and the Public Folder

**IMPORTANT:** All static assets (images, fonts, etc.) must be placed in the `/public/` folder. Vite automatically copies these to `/dist/` during build.

When adding or replacing images:
1. Place the image file in `/public/`
2. Reference it in code with an absolute path starting with `/` (e.g., `/OIWHost.jpeg`)
3. **Always run `npm run build` after adding new assets**
4. The built files in `/dist/` are what gets deployed - verify new assets appear there
5. Redeploy the updated `/dist/` folder to Hostinger

**Common Issue:** Images not rendering after deployment usually means:
- The build wasn't run after adding new images
- The `/dist/` folder wasn't redeployed to Hostinger

### Deployment to Hostinger

1. Run `npm run build` to generate production files
2. Upload the entire contents of the `/dist/` folder to Hostinger
3. Ensure `.htaccess` is included for proper SPA routing

## Project Structure

```
SS/
├── components/          # React components
│   ├── AboutPage.tsx   # About page
│   ├── ContactCTA.tsx  # Contact call-to-action
│   ├── Footer.tsx      # Site footer
│   ├── Hero.tsx        # Homepage hero section
│   ├── Navbar.tsx      # Navigation bar
│   ├── Portfolio.tsx   # Portfolio/work showcase
│   ├── Process.tsx     # Process section
│   ├── Services.tsx    # Services offered
│   ├── SocialProof.tsx # Testimonials/logos
│   └── WorkPage.tsx    # Work/portfolio page
├── utils/
│   └── router.tsx      # Custom hash-based router
├── public/             # Static assets (copied to dist/)
├── dist/               # Production build output
├── App.tsx             # Main app component with routing
├── index.tsx           # Entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
└── types.ts            # TypeScript type definitions
```

## Code Style Guidelines

### React Components
- Use functional components with TypeScript
- Use `React.FC` type for component definitions
- Keep components in the `/components/` directory
- Use Framer Motion for animations (import from `framer-motion`)

### Styling
- Use Tailwind CSS utility classes exclusively
- Custom brand colors are defined as `brand-*` (e.g., `brand-accent`, `brand-dark`, `brand-beige`, `brand-gray`)
- Maintain responsive design with Tailwind breakpoints (`sm:`, `md:`, `lg:`)

### Images
- Store in `/public/` folder
- Use descriptive filenames
- Reference with absolute paths: `src="/image-name.ext"`
- Always include `alt` attributes for accessibility
- Use `loading="lazy"` for below-the-fold images

## Testing Instructions

Since this is a static marketing site:
1. Run `npm run dev` and visually verify all pages
2. Test navigation between routes (/, /about, /work)
3. Verify all images load correctly
4. Test responsive design at mobile, tablet, and desktop breakpoints
5. Run `npm run build && npm run preview` to test production build locally

## Security Considerations

- No sensitive data or API keys in the codebase
- Contact forms should use external services (not handled in this repo)
- Keep dependencies updated to patch vulnerabilities

## Commit Message Guidelines

Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `style:` for styling changes
- `refactor:` for code refactoring
- `docs:` for documentation
- `chore:` for maintenance tasks (builds, deps)

Example: `feat: add new testimonial section to about page`

## Common Tasks

### Adding a New Page
1. Create component in `/components/`
2. Add route case in `App.tsx` switch statement
3. Update `Navbar.tsx` with new navigation link

### Updating Images
1. Add new image to `/public/`
2. Update the `src` attribute in the relevant component
3. Run `npm run build`
4. Verify image appears in `/dist/`
5. Redeploy to Hostinger

### Modifying Styles
- Brand colors are in Tailwind config (if customized) or use existing `brand-*` classes
- Keep the elegant, professional aesthetic consistent
