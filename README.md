# Vision Commercial Advisors website

A production-oriented Next.js rebuild for Vision Commercial Advisors, based in Woodstock, Georgia. The site pairs a company-first public experience with a private operating layer for inquiries, first-party analytics, and deterministic search/answer optimization checks.

## What is included

- Public pages for properties, services, company, team, insights, contact, and privacy
- Responsive olive, ivory, and bronze visual system that evolves the existing brand palette
- Clearly disclosed illustrative property provider behind a replaceable provider interface
- PostgreSQL-backed inquiry forms with validation, honeypot protection, origin checks, and rate limiting
- Secure single-administrator bootstrap, password hashing, signed HttpOnly sessions, and route-level authorization
- Private dashboards for inquiries, first-party analytics, operational readiness, and repeatable site audits
- Sitemap, robots controls, canonical metadata, structured data, social preview image, and custom 404
- Render Blueprint and Drizzle migrations

## Local setup

Requirements: Node.js 22+, npm, and PostgreSQL.

1. Copy `.env.example` to `.env.local` and replace every placeholder.
2. Create the PostgreSQL database named in `DATABASE_URL`.
3. Run `npm install`.
4. Run `npm run db:migrate`.
5. Run `npm run dev` and open `http://localhost:3000`.
6. Visit `/admin/setup`, enter `ADMIN_SETUP_TOKEN`, and then sign in at `/admin/login` with `ADMIN_BOOTSTRAP_EMAIL` and `ADMIN_BOOTSTRAP_PASSWORD`.
7. After the first administrator is created, remove the bootstrap password and setup token from the deployed environment.

The public information pages still render if the database is absent. Inquiry submission and administration correctly report that their storage layer is unavailable instead of pretending to accept data.

## Verification

```text
npm run typecheck
npm run lint
npm test
npm run build
```

The admin optimization page can also audit the running site. It checks public route status, title and description lengths, canonical links, H1 counts, language declaration, structured data, crawl files, and the illustrative-inventory disclosure using fixed rules and scoring.

## Render deployment

`render.yaml` provisions one web service and one PostgreSQL database. Create a Render Blueprint from the repository, provide the environment values marked `sync: false`, and deploy.

The Blueprint defaults `NEXT_PUBLIC_PREVIEW_MODE=true`, which sends `noindex` directives and disallows crawling. Leave it enabled for review. For the approved production domain:

1. Set `NEXT_PUBLIC_SITE_URL` to the final `https://` origin with no trailing path.
2. Set `NEXT_PUBLIC_PREVIEW_MODE=false`.
3. Trigger a new build because `NEXT_PUBLIC_*` values are embedded at build time.
4. Run an optimization audit and verify `/robots.txt` and `/sitemap.xml`.

## Launch checks requiring the client

- Confirm `770 Dobbs Road, Woodstock, GA 30188` as the public office address.
- Approve the team bios, service language, privacy notice, and all contact details.
- Replace the illustrative property provider with an approved listing feed or broker-verified inventory.
- Provide approved team photography if portraits should be shown; the current design intentionally uses typographic monograms.
- Review image licensing notes in `docs/image-credits.md`.
- Have legal counsel review the privacy notice and brokerage-specific disclaimers.

## Data model and security notes

Drizzle schema and migrations cover administrators, leads, anonymous analytics events, rate-limit events, audit runs, and site settings. Passwords are bcrypt hashes. Sessions are signed, HttpOnly, SameSite=Lax cookies with an eight-hour lifetime. Admin mutations require both a valid session and same-origin request. Rate limiting stores only a salted hash of the client address; raw IP addresses are not retained.
