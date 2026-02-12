This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


edutech/
├── public/
│   ├── pencile.jpg
│   └── favicon.ico
│
├── src/
│   ├── app/                              # ← App Router (file-system routing)
│   │   ├── layout.tsx                    # Root layout (html, body, fonts, Navbar, Footer)
│   │   ├── globals.css                   # Global styles + Tailwind directives
│   │   ├── not-found.tsx                 # Custom 404 page
│   │   │
│   │   ├── (main)/                       # Route group (no URL segment)
│   │   │   ├── page.tsx                  # → "/" (HomePage)
│   │   │   ├── ebooks/
│   │   │   │   └── page.tsx              # → "/ebooks" (EbookPage)
│   │   │   ├── madhyamik-suggestion/
│   │   │   │   └── page.tsx              # → "/madhyamik-suggestion" (ArticlePage)
│   │   │   ├── about/
│   │   │   │   └── page.tsx              # → "/about" (placeholder)
│   │   │   ├── madhyamik/
│   │   │   │   └── page.tsx              # → "/madhyamik"
│   │   │   ├── hs/
│   │   │   │   └── page.tsx              # → "/hs"
│   │   │   ├── news/
│   │   │   │   └── page.tsx              # → "/news"
│   │   │   ├── results/
│   │   │   │   └── page.tsx              # → "/results"
│   │   │   └── scholarships/
│   │   │       ├── svmcm/
│   │   │       │   └── page.tsx          # → "/scholarships/svmcm"
│   │   │       ├── oasis/
│   │   │       │   └── page.tsx          # → "/scholarships/oasis"
│   │   │       └── nabanna/
│   │   │           └── page.tsx          # → "/scholarships/nabanna"
│   │   │
│   │   └── api/                          # API Routes (future backend)
│   │       └── .gitkeep
│   │
│   ├── components/                       # Shared components
│   │   ├── ui/                           # Design system primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── badge.tsx
│   │   ├── layout/                       # Layout-level components
│   │   │   ├── navbar.tsx                # "use client" (uses useState)
│   │   │   └── footer.tsx
│   │   └── home/                         # Page-specific components
│   │       ├── hero-section.tsx          # "use client" (framer-motion)
│   │       ├── features-grid.tsx
│   │       ├── latest-updates.tsx
│   │       ├── best-sellers.tsx
│   │       └── cta-section.tsx
│   │
│   └── lib/                              # Shared utilities & data
│       ├── types.ts                      # TypeScript interfaces
│       ├── constants.ts                  # Mock data / static content
│       ├── fonts.ts                      # next/font configuration
│       └── utils.ts                      # Utility functions (cn(), etc.)
│
├── .env.local                            # GEMINI_API_KEY etc.
├── next.config.ts                        # Next.js configuration
├── tailwind.config.ts                    # Tailwind theme (neo-brutalist tokens)
├── postcss.config.mjs                    # PostCSS for Tailwind
├── tsconfig.json                         # TypeScript config
├── package.json
└── README.md
