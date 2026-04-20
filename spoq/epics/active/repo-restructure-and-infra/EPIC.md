# Epic: Repo Restructure and Infrastructure

## Overview
Restructure the morgankreed portfolio website repository to match the pinpoint reference architecture layout, port the LaTeX documentation system, and establish S3+CloudFront hosting with GitHub Actions CI/CD. This transforms a flat single-project repo into a well-organized monorepo pattern with proper infrastructure-as-code, automated deployments, and professional documentation tooling.

## Architecture

```
morgankreed/
├── .claude/                  # Claude Code config + SPOQ skills (unchanged)
├── .github/
│   └── workflows/
│       ├── ci.yml            # PR validation (lint, typecheck, build)
│       └── deploy.yml        # Main branch deploy (S3 sync + CF invalidate)
├── code/
│   └── site/                 # React/Vite portfolio app (moved from root)
│       ├── src/
│       ├── public/
│       ├── api/              # Legacy PHP (reference only)
│       ├── index.html
│       ├── package.json
│       ├── vite.config.ts
│       └── ...configs
├── context/                  # AI system prompts
├── documents/
│   ├── latex/                # Ported from pinpoint
│   │   ├── styles/
│   │   ├── templates/
│   │   ├── scripts/
│   │   └── Makefile.template
│   └── operational/          # Consolidated markdown docs
├── infrastructure/
│   ├── docker/               # Local dev (Dockerfile + compose)
│   └── terraform/            # S3 + CloudFront + ACM + IAM
│       └── modules/
├── spoq/                     # Epic/task management (unchanged)
├── CLAUDE.md                 # Project guidelines
├── README.md                 # Project-specific README
├── journal.md                # Session tracking
└── package.json              # Workspace root
```

## Components

1. **Directory Restructure** - Move site code into `code/site/`, fix paths, create workspace root
2. **Documentation Consolidation** - Move scattered markdown into `documents/operational/`, prompts into `context/`
3. **LaTeX System** - Port Makefile.template, styles, templates, version manager from pinpoint
4. **Terraform Modules** - S3 bucket, CloudFront distribution, ACM cert, IAM deploy role
5. **Docker Local Dev** - Multi-stage Dockerfile, docker-compose for local preview
6. **GitHub Actions CI/CD** - PR validation pipeline, deploy-on-merge pipeline
7. **Project Metadata** - CLAUDE.md, journal.md, README.md rewrite

## Success Criteria

- [ ] `cd code/site && npm run build` produces working dist/ output
- [ ] `cd documents/latex && make -f Makefile.template test` compiles without errors
- [ ] `terraform -chdir=infrastructure/terraform plan` runs without errors (no apply needed)
- [ ] `docker compose -f infrastructure/docker/docker-compose.yml build` succeeds
- [ ] GitHub Actions workflow files pass `actionlint` validation
- [ ] Root directory contains only expected files (no stray configs or docs)
- [ ] All moved files are reachable from their new locations

## Task Dependencies

```
01-restructure-dirs ─┬─► 03-fix-build-paths
                     ├─► 02-consolidate-docs
                     │
04-port-latex ───────┤   (independent)
                     │
05-terraform ────────┤   (independent)
                     │
03-fix-build-paths ──┼─► 06-docker-setup
                     │
                     ├─► 07-github-actions-ci
                     │
03 + 05 ─────────────┼─► 08-github-actions-deploy
                     │
01 + 02 ─────────────┼─► 09-project-metadata
                     │
ALL ─────────────────┴─► 10-root-cleanup
```

## Dispatch Strategy

- **Wave 0** (Parallel, 3 tasks): Directory restructure, LaTeX port, Terraform modules - all independent foundation work
- **Wave 1** (Parallel, 4 tasks): Fix build paths, consolidate docs, Docker setup, CI workflow - depend on Wave 0
- **Wave 2** (Parallel, 2 tasks): Deploy workflow, project metadata - depend on Wave 1
- **Wave 3** (Sequential, 1 task): Root cleanup and final verification - depends on everything

## Estimated Effort

| Wave | Tasks | Parallel Agents | Duration |
|------|-------|----------------|----------|
| 0    | 3     | 3              | ~1.5h    |
| 1    | 4     | 4              | ~1h      |
| 2    | 2     | 2              | ~45m     |
| 3    | 1     | 1              | ~30m     |
| **Total** | **10** | — | **~3.75h wall, ~9h effort** |
