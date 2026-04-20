# Morgan K. Reed

Technology portfolio and consulting website built with React, TypeScript, and Vite.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Infrastructure**: AWS S3 + CloudFront (Terraform)
- **CI/CD**: GitHub Actions
- **Documentation**: LaTeX build system

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Development
```bash
cd code/site
npm install
npm run dev
```

### Production Build
```bash
cd code/site
npm run build
```

## Project Structure

```
morgankreed/
├── code/site/           # React/Vite portfolio app
├── context/             # AI system prompts
├── documents/
│   ├── latex/           # LaTeX documentation system
│   └── operational/     # Deployment and ops guides
├── infrastructure/
│   ├── docker/          # Local production preview
│   └── terraform/       # AWS S3 + CloudFront IaC
└── spoq/                # Epic/task management
```

## Deployment

Automated via GitHub Actions on merge to `main`. The pipeline builds the site and syncs to S3 with CloudFront cache invalidation.

See `documents/operational/DEPLOYMENT.md` for details.

## Documentation

- **Operational guides**: `documents/operational/`
- **LaTeX templates**: `documents/latex/` (styles, templates, build system)
- **Infrastructure**: `infrastructure/terraform/README.md`
