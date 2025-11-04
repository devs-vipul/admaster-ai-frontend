# AdMaster AI - Dashboard App

> **"AI that thinks like a marketer."**

The main dashboard application for AdMaster AI - an AI-powered marketing automation platform that helps brands generate, manage, and optimize ads across Google, Meta, LinkedIn, and Microsoft Ads.

## 🏗️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **UI Library:** [ShadCN UI](https://ui.shadcn.com) (New York style)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com)
- **Language:** [TypeScript 5.9](https://www.typescriptlang.org)
- **Icons:** [Lucide React](https://lucide.dev)
- **Monorepo:** [Turborepo](https://turbo.build)

## 📁 Project Structure

```
apps/web/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles + Tailwind
├── components/
│   └── ui/                # ShadCN components
│       └── button.tsx
├── lib/
│   └── utils.ts           # Utility functions
├── public/                # Static assets
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 10

### Development

From the **monorepo root**:

```bash
# Install dependencies
npm install

# Run the web app
npm run dev
```

Or from **this directory** (`apps/web`):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Available Scripts

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Start development server (port 3000) |
| `npm run build`       | Build for production                 |
| `npm run start`       | Start production server              |
| `npm run lint`        | Run ESLint                           |
| `npm run check-types` | Type-check with TypeScript           |

## 🎨 Adding Components

We use ShadCN UI for components. To add new components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

Components will be added to `components/ui/` and automatically configured.

## 📦 Shared Packages

This app uses shared packages from the monorepo:

- `@repo/ui` - Shared UI components
- `@repo/eslint-config` - ESLint configuration
- `@repo/typescript-config` - TypeScript configuration

## 🎯 Features (Planned)

- [ ] Authentication (Clerk)
- [ ] Brand onboarding & crawling
- [ ] AI Intelligence Dashboard
- [ ] Campaign builder
- [ ] Creative generation studio
- [ ] Multi-platform publishing
- [ ] Analytics & insights
- [ ] Billing & subscriptions

## 🔗 Related

- **Marketing Site:** `apps/www` (coming soon)
- **Documentation:** `apps/docs`
- **Backend Services:** `services/` (Python microservices)

## 📝 Environment Variables

Create a `.env.local` file:

```env
# Add environment variables here
NEXT_PUBLIC_API_URL=
```

## 🚢 Deployment

This app is designed to be deployed on [Vercel](https://vercel.com):

```bash
npm run build
```

The build output will be optimized for production.

---

**Built with ❤️ by the AdMaster AI team**
