# Overview

This is a retro/brutalist-themed personal portfolio website built as a full-stack TypeScript application. It serves markdown-based content pages with a Y2K/terminal aesthetic — black background, monospace fonts, CRT scanline effects, and ASCII art. Content is stored in a single `portfolio.md` file at the project root, parsed into sections that become individual pages served via an API.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Project Structure
The project follows a three-directory monorepo pattern:
- `client/` — React frontend (SPA)
- `server/` — Express backend (API + static file serving)
- `shared/` — Code shared between client and server (schema, route definitions)

## Frontend
- **Framework**: React with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming. The theme is a dark monochrome brutalist design with zero border-radius, Fira Code and Courier Prime fonts
- **Markdown Rendering**: `react-markdown` renders page content from the API
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

The app has two main routes: `/` (home page) and `/:slug` (dynamic pages). Both use a shared `PageViewer` component that fetches a page by slug and renders its markdown content.

## Backend
- **Framework**: Express 5 running on Node.js via tsx
- **API Pattern**: RESTful JSON API under `/api/` prefix
  - `GET /api/pages` — list all pages
  - `GET /api/pages/:slug` — get a single page by slug
- **Route Definitions**: Centralized in `shared/routes.ts` with Zod schemas for response validation, shared between client and server
- **Storage**: `FileStorage` class reads and parses `portfolio.md` from the project root. The file is split by `---` separators, with each section containing a title (h1) and slug metadata line

## Database Schema
- Drizzle ORM is configured with PostgreSQL dialect (`drizzle.config.ts`, `server/db.ts`)
- A `pages` table is defined in `shared/schema.ts` with columns: `id`, `slug`, `title`, `content`, `updatedAt`
- **Important**: The database schema exists but the current storage implementation (`FileStorage`) reads from `portfolio.md` instead of PostgreSQL. The `IStorage` interface is defined and could be swapped to a database-backed implementation
- Run `npm run db:push` to push schema to the database

## Build & Development
- **Dev**: `npm run dev` runs the server with tsx, Vite middleware handles HMR for the frontend
- **Build**: `npm run build` runs a custom build script that uses Vite for the client and esbuild for the server, outputting to `dist/`
- **Production**: `npm start` serves the built app from `dist/`
- In development, Vite is set up as middleware on the Express server (`server/vite.ts`). In production, static files are served from `dist/public` (`server/static.ts`)

## Content Model
Portfolio content lives in `portfolio.md` at the project root. Sections are separated by `---`. Each section has:
- A markdown `# Title` line
- A `slug: value` metadata line
- The rest is markdown content

The `FileStorage` class parses this file and returns `Page` objects matching the database schema shape.

# External Dependencies

- **PostgreSQL**: Required via `DATABASE_URL` environment variable. Used by Drizzle ORM for schema management, though current runtime storage reads from a file
- **Google Fonts**: Courier Prime, Fira Code, DM Sans, and Architects Daughter loaded from Google Fonts CDN
- **Replit Plugins**: Development-only Vite plugins for runtime error overlay, cartographer, and dev banner (conditionally loaded when `REPL_ID` is set)
- **No authentication**: The app has no auth system — it's a public read-only portfolio
- **No external APIs**: All content is self-contained in the markdown file