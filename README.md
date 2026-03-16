# TechWiseTutors Website + Volunteer Portal

Modern nonprofit website (public) + internal volunteer/admin portal.

## Stack
- Next.js (App Router) + Tailwind CSS
- SQLite (local) + Prisma
- Cookie-based auth (Admin + Volunteer roles)

## Quick start

1) Install deps:

```bash
npm install
```

2) Set environment variables in `.env`:
- `AUTH_SECRET`: long random string
- `ADMIN_EMAIL`: admin email (default is `matthewsingh291@gmail.com`)
- `ADMIN_PASSWORD`: set a strong password

3) Create DB + seed admin:

```bash
npm run db:migrate -- --name init
npm run db:seed
```

4) Run dev server:

```bash
npm run dev
```

## Key URLs
- Public site: `/`
- Book a session: `/book`
- Volunteer application: `/volunteer`
- Volunteer login: `/volunteer/login`
- Volunteer dashboard: `/volunteer/dashboard`
- Admin login: `/admin/login`
- Admin dashboard: `/admin`

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
