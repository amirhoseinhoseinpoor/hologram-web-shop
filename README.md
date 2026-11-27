# Azar Hologram Storefront

Customer-facing Next.js application for Azar Hologram. It provides product browsing, product detail pages, account flows, customer profiles, and public content such as the blog, exhibition, and contact pages.

## Architecture

- Next.js App Router and React
- Redux Toolkit for client state, with Material UI and Tailwind CSS for interface styling
- Route and UI source under `src/app/`, including the store, dynamic product pages, and account routes
- Sitemap and robots metadata alongside the application routes

The storefront uses the backend for product and account data. The staff administration interface is maintained separately.

## Local development

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. To exercise API-backed flows, configure the application for a local or staging instance of the backend using local environment settings. Use `npm run build` for a production build and `npm start` to serve it.

## Project repositories

| Repository | Role |
| --- | --- |
| [hologram-web-shop](https://github.com/amirhoseinhoseinpoor/hologram-web-shop) | Customer storefront |
| [hologram-admin-shop](https://github.com/amirhoseinhoseinpoor/hologram-admin-shop) | Staff administration interface |
| [hologram-core-shop](https://github.com/amirhoseinhoseinpoor/hologram-core-shop) | Backend API and business logic |

[View the live storefront](https://azarhologram.net/)

