# ✉️ Worker Email List

Simple email subscription API powered by Cloudflare Workers and D1 database. Used in conjunction with my portfolio site to track email subscribers.

Includes Cloudflare workers beta rate limiting features for testing purposes.

## Tech Stack

- [🔥 Hono](https://hono.dev/) - Ultrafast web framework
- [🌧️ Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [🌩️ Cloudflare Workers](https://workers.cloudflare.com/) - Serverless platform
- [📃 D1 Database](https://developers.cloudflare.com/d1/) - SQLite at the edge
- [🤖 GitHub Actions](https://github.com/features/actions) - CI/CD pipeline

## Development

```bash
pnpm install
pnpm dev
```

## Deployment

Pushes to the `main` branch will automatically deploy to Cloudflare. See `.github/workflows/deploy.yml` for more details.
