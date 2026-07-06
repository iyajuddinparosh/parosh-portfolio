# Iyaj Uddin Parosh — Portfolio

A premium, dark-themed personal portfolio built with **plain HTML, CSS, and JavaScript** —
no frameworks, no build step. Uses the [AOS](https://michalsnik.github.io/aos/) library for
scroll animations and [Font Awesome](https://fontawesome.com/) for icons (both loaded via CDN).

## Design

- **Dark theme** — background `#0B1120`, primary `#38BDF8`, secondary `#8B5CF6`, accent `#10B981`.
- **Glassmorphism** cards throughout (`.glass` class in `styles.css`).
- **Signature element** — an animated network/particle canvas in the hero, a nod to the
  cybersecurity / AI / networking themes Iyaj is exploring.
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels, terminal-style text).

## Folder structure

```
index.html              all 12 sections, in order
assets/
  css/styles.css        one file, organised by section with comments
  js/script.js           one file, one small function per feature
  images/                empty — no fake photos or project screenshots included
```

Everything lives in two files (`styles.css`, `script.js`) with clear section comments, so it's
easy to find and edit any part of the site.

## Features

- Sticky, blurred navbar with active-section highlighting
- Mobile navigation menu
- Scroll progress bar
- Back-to-top button
- Typing effect in the hero
- Animated counters (using real counts only — languages, projects, research interests;
  no fabricated statistics or percentages)
- Bookshelf-style Books section with hover tilt
- AOS scroll-reveal animations on every section
- Fully responsive (desktop, tablet, mobile)
- Respects `prefers-reduced-motion`

## Run locally

No build tools needed — just open `index.html` in a browser, or serve the folder with any
static server, e.g.:

```bash
npx serve .
```

## Deploy to GitHub Pages

1. Create a new GitHub repository and push this project's contents to it (this `index.html`
   should be at the **root** of the repo, not inside a subfolder).
2. In your repository, go to **Settings → Pages**.
3. Under **Source**, choose the branch you pushed to (usually `main`) and folder `/ (root)`.
4. Click **Save**. GitHub will give you a URL like:
   `https://your-username.github.io/your-repo-name/`
5. It can take a minute or two to go live the first time.

That's it — no build step, no dependencies to install. Any time you push a change to that
branch, GitHub Pages will redeploy automatically.

## Before you publish

- Everything under Contact (email, GitHub, LinkedIn, Facebook) already points to Iyaj's real
  accounts — double check they're correct before publishing.
- The Projects section intentionally has no GitHub/demo links, since those projects don't have
  public repos yet — add real links there once they do (in `index.html`, inside `#projects`).
