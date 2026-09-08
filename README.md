# Unitide Educations

The execution partner for Indian higher-ed internationalization — strategy to signed MoU to accreditation-ready compliance.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: SQLite (Prisma) — swappable to Postgres via env var
- **Auth**: NextAuth.js (credentials)
- **Email**: Resend
- **Charts**: Recharts

## Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Seed the database
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

## Demo Credentials

- **Admin**: admin@unitide.in / demo1234
- **Client**: demo@university.edu / demo1234

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | SQLite: `file:./dev.db` / Postgres: `postgresql://...` |
| `NEXTAUTH_SECRET` | Yes | Random secret for NextAuth |
| `NEXTAUTH_URL` | Yes | Base URL (e.g., `http://localhost:3000`) |
| `RESEND_API_KEY` | No | Resend email API key (gracefully degrades if missing) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL for SEO/sitemap |

## Project Structure

```
src/
  app/
    (marketing)/     # Public marketing pages
    (portal)/        # Auth-protected client portal
    api/             # API routes
  components/
    marketing/       # Nav, Footer, Hero, etc.
    portal/          # Portal sidebar, badges, etc.
    tools/           # Readiness quiz, reg tracker
    ui/              # Design system primitives
  content/
    pillars/         # MDX pillar content
    case-studies/    # MDX case studies
    insights/        # MDX blog posts
    regulations/     # JSON regulation data
  lib/               # Utility functions
  types/             # TypeScript types
prisma/
  schema.prisma      # Database schema
  seed.ts            # Seed script
```

## Key Routes

- `/` — Home page
- `/what-we-do` — Service pillars overview
- `/what-we-do/[pillar]` — Pillar detail pages
- `/how-we-work` — Process & FAQ
- `/case-studies` — Client success stories
- `/insights` — Blog/articles
- `/tools/readiness-score` — Readiness assessment quiz
- `/tools/regulation-tracker` — UGC/AICTE regulation tracker
- `/about` — Company info
- `/contact` — Contact form
- `/login` — Portal login
- `/portal/dashboard` — Client dashboard

## Handoff Notes

### Production-Ready
- All page routes and navigation
- Database schema and seed data
- Authentication flow
- API routes with validation
- Responsive design
- SEO (sitemap, robots, metadata, JSON-LD)
- Accessibility (focus states, labels, contrast)

### Placeholder / Needs Real Content
- All MDX content (clearly marked with content)
- Testimonials (placeholder data)
- Statistics in stat-band (TODO flagged)
- WhatsApp number (placeholder)
- Calendly embed URL (env-configurable)
- Images/photos (placeholder paths)
- Email templates

### Still Needed for Production
- [ ] Real Resend API key for email delivery
- [ ] Calendly scheduling widget URL
- [ ] Production Postgres database URL
- [ ] Real content/copy from the client
- [ ] Professional images and logos
- [ ] OG image for social sharing
- [ ] Analytics integration
- [ ] Error monitoring (Sentry etc.)
