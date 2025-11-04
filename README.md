# AdMaster AI - Frontend Monorepo

> **"AI that thinks like a marketer."**

AI-powered marketing automation platform that helps brands generate, manage, and optimize ads across Google, Meta, LinkedIn, and Microsoft Ads — automatically.

## 🎯 What is AdMaster?

AdMaster introduces an **AI Intelligence Layer** that understands your business, target audience, competitors, and market context — then feeds that knowledge into the ad generation engine to create highly relevant, high-performing campaigns.

**The Flow:**

```
Website Input → Crawler → AI Intelligence → Creative Generation → Publishing → Analytics
```

## 📦 Monorepo Structure

This is a [Turborepo](https://turbo.build) monorepo containing all frontend applications and shared packages.

### Apps

- **`web`** - Main dashboard application (Next.js 16 + ShadCN UI)
- **`docs`** - Documentation site (Next.js)
- **`www`** - Marketing website _(coming soon)_

### Packages

- **`@repo/ui`** - Shared React component library
- **`@repo/eslint-config`** - ESLint configurations
- **`@repo/typescript-config`** - Shared TypeScript configs

### Planned Packages

- `@repo/utils` - Shared utilities and helpers
- `@repo/types` - Shared TypeScript types
- `@repo/api-client` - API client for backend services
- `@repo/auth` - Authentication utilities
- `@repo/config` - Configuration management

All packages are 100% [TypeScript](https://www.typescriptlang.org/).

## 🏗️ Tech Stack

### Frontend

- **Framework:** Next.js 16 (App Router, React 19)
- **UI:** ShadCN UI (Radix UI + Tailwind CSS)
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Monorepo:** Turborepo 2.6

### Backend (Separate Repo)

- Python microservices (Flask/FastAPI)
- AI: Gemini 1.5 Pro, GPT-5, SDXL
- MongoDB, Redis, S3, ClickHouse

### Tooling

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- npm >= 10

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd admaster-ai-frontend

# Install dependencies
npm install

# Start development
npm run dev
```

The web app will be available at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### Development

```bash
# Run all apps in development mode
npm run dev

# Run specific app
npm run dev --filter=web
npm run dev --filter=docs
```

### Build

```bash
# Build all apps
npm run build

# Build specific app
npm run build --filter=web
```

### Linting & Type Checking

```bash
# Lint all code
npm run lint

# Type check all apps
npm run check-types

# Format code
npm run format
```

## 🎨 Adding Components

We use ShadCN UI for components. To add components to the web app:

```bash
cd apps/web
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

## 📁 Project Organization

```
admaster-ai-frontend/
├── apps/
│   ├── web/              # Main dashboard (Next.js)
│   ├── docs/             # Documentation site
│   └── www/              # Marketing site (coming soon)
├── packages/
│   ├── ui/               # Shared components
│   ├── eslint-config/    # ESLint configs
│   └── typescript-config/# TypeScript configs
├── turbo.json            # Turborepo configuration
└── package.json          # Root package.json
```

## 🎯 Roadmap

### Phase 1 - MVP (Dec 2025)

- [x] Monorepo setup with Turborepo
- [x] Next.js app with ShadCN UI
- [ ] Authentication (Clerk)
- [ ] Brand onboarding flow
- [ ] AI Intelligence Layer integration
- [ ] Campaign builder
- [ ] Basic analytics

### Phase 2 - Scale (Q1 2026)

- [ ] Multi-platform publishing
- [ ] Advanced analytics dashboard
- [ ] Video ad generation
- [ ] A/B testing
- [ ] Team collaboration

### Phase 3 - Enterprise (Q2 2026)

- [ ] White-label solution
- [ ] API access
- [ ] Advanced automation
- [ ] Custom integrations

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## 📚 Documentation

- **App READMEs:**
  - [Web App](./apps/web/README.md) - Main dashboard
  - [Docs](./apps/docs/README.md) - Documentation site

- **External Resources:**
  - [Next.js Documentation](https://nextjs.org/docs)
  - [ShadCN UI](https://ui.shadcn.com)
  - [Turborepo Docs](https://turbo.build/repo/docs)
  - [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

This is a private project. For team members:

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run lint` and `npm run check-types`
4. Submit a PR for review

## 📄 License

Proprietary - All rights reserved

---

**Built with ❤️ by the AdMaster AI team**
