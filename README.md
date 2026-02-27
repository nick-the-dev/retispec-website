# RetiSpec Website

Marketing website for RetiSpec — AI-Powered Retinal Imaging.

## Architecture

- **apps/web** — Next.js 16 (App Router, Tailwind v4, shadcn/ui)
- **apps/cms** — Strapi v5 (PostgreSQL, self-hosted)
- **packages/** — Shared TypeScript and ESLint configs

## Development

```bash
bun install
bun run dev
```

## Environment Variables

Copy `.env.example` and fill in values:

```bash
cp .env.example .env
```
