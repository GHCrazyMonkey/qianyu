# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

签语签缘 — a Chinese traditional culture entertainment website with random tools: fortune sticks (抽签), spinning wheel (转盘), dice roller (掷骰子), and random number generator (随机数). Monetized via ads (future). Pure static site, no backend, no auth, no database.

## Commands

```bash
npm run dev          # Dev server (localhost:3000)
npm run build        # Static export to out/
npm run lint         # ESLint
npx wrangler pages deploy out/ --project-name qianyu  # Deploy to Cloudflare Pages
```

## Architecture

- **Next.js 16 App Router** with static export (`output: 'export'` in next.config.ts)
- All pages are client components (`"use client"`) — no SSR, no API routes
- **TailwindCSS 4** with custom theme tokens defined in `app/globals.css` under `@theme inline`
- Shared layout in `app/layout.tsx`: header nav + main + footer
- Fortune stick data in `data/lottery.json` (100 entries, imported directly)

## Theme / Design Tokens

Chinese traditional aesthetic. Custom colors in globals.css: `primary` (red), `gold`, `background` (warm cream), `foreground` (dark brown), `card`, `muted`. Animations: `.animate-shake`, `.animate-dice-roll`, `.animate-fade-in`.

## Key Constraints

- Pure static export — no `getServerSideProps`, no API routes, no middleware
- Must run `images: { unoptimized: true }` — Cloudflare Pages doesn't support Next.js image optimization
- Content is Chinese; `lang="zh-CN"` on html element
- Fortune stick content must be framed as "traditional culture entertainment" — no predictive language, include disclaimer
