# mindmarketing

Performance-marketing website for e-commerce, prepared for deployment as a Node.js web application on Hostinger.

## Local development

```bash
npm ci
npm run dev
```

## Production

```bash
npm run build
npm run start
```

## Hostinger deployment settings

- Framework: Next.js
- Node.js version: 22
- Install command: `npm ci`
- Build command: `npm run build`
- Start command: `npm run start`
- Application port: provided automatically through the `PORT` environment variable

The repository contains the homepage, blog index and article routes. New blog posts are managed in `app/blog/articles.ts`.
