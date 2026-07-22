# Creator Sourcing Day 2026 — Event Site

Marketing site for ATENE's **Creator Sourcing Day / TokuPack** K-Beauty popup event.
A data-driven homepage plus standalone pages (brands, product details, venue/award,
competition, access, TokuPack request form, livestream booking with Google Sign-In,
admin dashboard), all containerized with Docker Compose.

## Stack

| Layer     | Tech                                             |
| --------- | ------------------------------------------------ |
| Frontend  | React 18 + Vite + TypeScript + Tailwind CSS      |
| Backend   | NestJS 10 + TypeORM                              |
| Database  | PostgreSQL 16                                    |
| Runtime   | Docker Compose (nginx serves the built frontend) |

## Pages

- `/` — homepage (hero, countdown, about, brands, booking, FAQs, socials…)
- `#/brand/:slug` — brand pages (single-set and multi-set layouts, see
  `frontend/BRAND_PAGE_LAYOUT.md` and `frontend/BRAND_MULTI_SET_LAYOUT.md`)
- `#/brand/:slug/product/:id`, `#/brand/:slug/set/:id` — product / set sub-pages
- `#/tokupack` — TokuPack request form
- `#/reserve` — livestream booking (calendar + Google Sign-In + confirmation email)
- `#/venue`, `#/location`, `#/competition` — venue & award, access, challenge
- `#/admin` — admin dashboard

## Quick start (local)

```bash
cp .env.example .env
docker compose up --build
```

Then open:

- **Frontend:** http://localhost:8080
- **API:** http://localhost:3001/api/event
- **Postgres:** localhost:5432 (user/pass/db from `.env`)

The database schema is auto-created (TypeORM `synchronize`) and seeded on first
boot with all event content, brands, FAQs and social links. Data persists in the
`pgdata` Docker volume across restarts.

## Deploy to a VPS

Tested flow for a fresh Ubuntu/Debian VPS. The only thing that must be public is
the frontend — its nginx proxies `/api/` to the backend over the internal
compose network.

### 1. Install Docker

```bash
curl -fsSL https://get.docker.com | sh
# log out/in if you added your user to the docker group
```

### 2. Get the code and configure

```bash
git clone <this-repo-url> atene_event && cd atene_event
cp .env.example .env
nano .env
```

Set at minimum:

| Variable | What to set on a VPS |
| --- | --- |
| `POSTGRES_PASSWORD` | a strong random password (before first boot — it is baked into the volume) |
| `FRONTEND_HOST_PORT` | `80` if the site is served directly, or keep `8080` behind a reverse proxy |
| `VITE_GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_ID` | the same OAuth Web client ID; add your production URL (e.g. `https://event.example.com`) to *Authorized JavaScript origins* in Google Cloud Console |
| `SMTP_*`, `MAIL_FROM` | Gmail App-Password credentials for booking-confirmation emails |
| `VITE_VIDEO_BASE_URL` | public bucket URL hosting the brand videos (e.g. Cloudflare R2 `https://pub-xxx.r2.dev/vids`) — the videos are not in the repo |

> `VITE_*` variables are **inlined at build time**. Changing them later requires
> rebuilding the frontend image (step 5).

### 3. First boot

```bash
docker compose up -d --build
docker compose ps            # db healthy, backend + frontend up
curl -s localhost:8080/api/event | head -c 200   # sanity check
```

### 4. HTTPS / domain (recommended)

Keep `FRONTEND_HOST_PORT=8080` and put a TLS reverse proxy in front. Easiest is
[Caddy](https://caddyserver.com) — automatic Let's Encrypt certificates:

```bash
sudo apt install -y caddy
# /etc/caddy/Caddyfile:
#   event.example.com {
#     reverse_proxy 127.0.0.1:8080
#   }
sudo systemctl reload caddy
```

Then lock the box down so only the web ports are reachable — the compose file
also publishes the API (3001) and Postgres (5432) for debugging, which you do
not want exposed publicly:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80,443/tcp
sudo ufw enable
```

(Alternatively, change the mappings in `docker-compose.yml` to
`127.0.0.1:3001:3000` and `127.0.0.1:5432:5432`.)

### 5. Updating to a new version

```bash
cd atene_event
git pull
docker compose up -d --build          # rebuilds backend + frontend
# if stale assets/layers linger: docker compose build --no-cache frontend
```

Notes:

- Replacing an image asset **under the same file name** will be cached by
  browsers — either rename the file or bump its `?v=` query in the code
  (see `frontend/src/lib/homeAssets.ts` for examples).
- Korean-named asset files must be NFC-normalized and the dev server restarted
  after adding files — rules in `frontend/BRAND_PAGE_LAYOUT.md`.

### 6. Database backup / restore

```bash
# backup
docker exec atene_db pg_dump -U atene atene_event > backup_$(date +%F).sql
# restore into a fresh volume
docker compose down && docker volume rm atene_event_pgdata
docker compose up -d db && sleep 5
docker exec -i atene_db psql -U atene -d atene_event < backup_YYYY-MM-DD.sql
docker compose up -d
```

Seeding only runs when tables are empty, so a restored database is left as-is.

## API endpoints

| Method | Path                  | Description                              |
| ------ | --------------------- | ---------------------------------------- |
| GET    | `/api/event`          | Event info + stats + how-it-works steps  |
| GET    | `/api/brands`         | Participating brands (with TokuPacks)    |
| GET    | `/api/brands/:slug`   | Single brand                             |
| GET    | `/api/faqs`           | FAQ list                                 |
| GET    | `/api/social-links`   | Follow-us cards                          |
| POST   | `/api/bookings`       | Create a livestream reservation          |
| GET    | `/api/bookings`       | List reservations                        |
| POST   | `/api/tokupack-applications` | Submit the TokuPack request form  |

## Local development (without Docker)

```bash
# Terminal 1 — DB
docker compose up db

# Terminal 2 — API (reads DB_HOST=localhost)
cd backend && npm install && DB_HOST=localhost npm run start:dev

# Terminal 3 — Frontend (proxies /api to localhost:3000)
cd frontend && npm install && npm run dev
```
