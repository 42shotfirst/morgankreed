# CLAUDE.md — Project Guidelines

## Project
Morgan K. Reed — technology portfolio and consulting website.

## Architecture
- `code/site/` — React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- `documents/latex/` — LaTeX documentation system (styles, templates, Makefile)
- `documents/operational/` — Deployment, server setup, and ops guides
- `infrastructure/terraform/` — S3 + CloudFront hosting (Terraform modules)
- `infrastructure/docker/` — Local production preview (Docker + nginx)
- `context/` — AI system prompts for chat and fit-check features
- `spoq/` — Epic and task management (SPOQ methodology)

## Build Commands
```bash
cd code/site
npm install        # install dependencies
npm run dev        # start dev server (Vite)
npm run build      # production build
npm run lint       # ESLint
npx tsc --noEmit   # typecheck
```

## Coding Conventions
- TypeScript strict mode, no `any`
- React functional components with hooks
- Tailwind utility-first CSS, shadcn/ui components
- Path alias: `@/` maps to `code/site/src/`
- Imports: group by external → internal → relative

## Rules
- Do NOT auto-commit or auto-push
- Update journal.md for significant work sessions
- Use SPOQ epics for multi-task planning (`/epic-planning`)
- Verify builds pass before considering tasks complete
