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