# Creator Sourcing Day 2026 — Event Site

Marketing site for ATENE's **Creator Sourcing Day / TokuPack** K-Beauty popup event.
Phase 1 delivers the **homepage with all 11 sections**, fully data-driven from a
NestJS + PostgreSQL backend, all containerized with Docker Compose.

## Stack

| Layer     | Tech                                             |
| --------- | ------------------------------------------------ |
| Frontend  | React 18 + Vite + TypeScript + Tailwind CSS      |
| Backend   | NestJS 10 + TypeORM                              |
| Database  | PostgreSQL 16                                    |
| Runtime   | Docker Compose (nginx serves the built frontend) |

## Homepage sections

1. Hero — Creator Sourcing Day / TokuPack
2. Countdown — live timer to the event date + venue
3. About The Event — TokuPack explainer
4. Creator Sourcing Day — editorial + stats
5. How It Works — 6-step timeline
6. Participating Brands — brand/TokuPack grid (from the DB)
7. Find Your TOKUPACK — CTA band
8. Book Livestream — dark CTA
9. Reserve Your Livestream — calendar + booking form (POSTs to the API)
10. FAQs — two-column Q&A
11. Follow Us — social cards

## Run it

```bash
cp .env.example .env      # already done on first setup
docker compose up --build
```

Then open:

- **Frontend:** http://localhost:8080
- **API:** http://localhost:3001/api/event
- **Postgres:** localhost:5432 (user/pass/db from `.env`)

The database schema is auto-created (TypeORM `synchronize`) and seeded on first
boot with all event content, the 11 brands, FAQs and social links.

## API endpoints

| Method | Path                 | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| GET    | `/api/event`         | Event info + stats + how-it-works steps  |
| GET    | `/api/brands`        | Participating brands (with TokuPacks)    |
| GET    | `/api/brands/:slug`  | Single brand                             |
| GET    | `/api/faqs`          | FAQ list                                 |
| GET    | `/api/social-links`  | Follow-us cards                          |
| POST   | `/api/bookings`      | Create a livestream reservation          |
| GET    | `/api/bookings`      | List reservations                        |

## Local development (without Docker)

```bash
# Terminal 1 — DB
docker compose up db

# Terminal 2 — API (reads DB_HOST=localhost)
cd backend && npm install && DB_HOST=localhost npm run start:dev

# Terminal 3 — Frontend (proxies /api to localhost:3001)
cd frontend && npm install && npm run dev
```

## Next phases (not built yet)

- Brand detail pages (`/brands/:slug`) and TokuPack selection flow
- Auth for creators + admin dashboard for bookings
- Real assets (brand photography, logo) replacing placeholders
