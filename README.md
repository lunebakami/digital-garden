# Luis Digital Garden

A retro terminal-style portfolio built with React, TypeScript, and Tailwind CSS.

![Portfolio Preview](https://lunebakami.github.io/digital-garden/favicon.png)

## Overview

This is a minimal, fast, and customizable portfolio website that mimics a vintage terminal interface. Content is managed through simple Markdown files, making it easy to update without touching code.

**Live Site:** https://lunebakami.github.io/digital-garden

## Features

- ⚡ **Lightning Fast** - Static site with no backend
- 📝 **Markdown Content** - Edit pages via `.md` files
- 🎨 **Terminal Aesthetic** - Retro CRT styling with monospace fonts
- 🖼️ **Random ASCII Logos** - Different logos on each page load
- 📱 **Responsive** - Works on desktop and mobile
- 🚀 **Auto Deploy** - GitHub Actions deploys on every push

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Markdown
- Wouter (routing)
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/lunebakami/digital-garden.git

# Navigate to project
cd digital-garden

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

Output will be in the `dist/` directory.

## Customization

### Adding/Editing Pages

Pages are Markdown files in the `content/` directory:

```markdown
---
slug: about
title: About
---

# About Me

Your content here...
```

**Frontmatter fields:**
- `slug` - URL path (e.g., `/about`)
- `title` - Page title shown in navigation

**File naming:** Use numerical prefixes to control sidebar order:
- `01-home.md` - Appears first
- `02-projects.md` - Appears second
- `03-contact.md` - Appears third

### Adding ASCII Logos

Drop `.txt` files into the `ascii/` folder. A random one is selected on each page load.

Example format:
```
    ____  ____  ____  ________  ____  __    ______  
   / __ \/ __ \/ __ \/_  __/ / / __ \/ /   /  _/ /  
  ...
```

### Styling

- Global styles: `client/src/index.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline Tailwind classes

### Meta Tags

Edit `client/index.html` to update:
- Page title
- Description
- Social sharing previews (Open Graph)
- Favicon

## Project Structure

```
├── client/
│   ├── index.html          # HTML template with meta tags
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Layout.tsx  # Main layout with sidebar
│   │   │   ├── AsciiArt.tsx    # Random logo component
│   │   │   └── MarkdownRenderer.tsx
│   │   ├── data/
│   │   │   └── pages.ts    # Markdown parser & data loader
│   │   ├── hooks/
│   │   │   └── use-pages.ts
│   │   ├── pages/          # Page components
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── public/
│       └── favicon.png
├── content/                # Markdown content files
│   ├── 01-home.md
│   ├── 02-projects.md
│   └── 03-contact.md
├── ascii/                  # ASCII art logos
│   └── logo1.txt
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

## Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions.

### Setup

1. Go to Repository Settings → Pages
2. Source: GitHub Actions
3. Push to main branch triggers deployment

### Manual Deployment

If needed, you can manually trigger deployment:
1. Go to Actions tab
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

## License

MIT

## Credits

Built by [Luis](https://github.com/lunebakami)
