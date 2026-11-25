# Sai Nagendra — Portfolio and Writing

> Backend now uses Express/TypeScript, Neon and R2. See [implementation status](docs/10-backend-implementation.md).
React + TypeScript portfolio based on the measured layout of [kamran.fyi](https://kamran.fyi/), with the supplied headshot, shadcn/ui components, Motion animations and optional UI SFX sounds. Includes home, Writing archive, article pages, light/dark themes, and eight clearly labeled sample articles.

## Run locally

Use Node22.12+ (or a compatible newer LTS) and the pnpm version declared in package.json.

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm test
pnpm build
pnpm preview
```

Writing imports `src/data/posts.json` directly into the application bundle. It makes no JSON fetch or API request in JSON mode; no backend or credentials are needed. The portable source ZIP contains a standard Vite config and does not require Sites. The canonical hosted checkout retains its Sites build plugin. Deploy `dist/` to a static host with SPA routing; never rewrite API requests to HTML.

## Edit content

- `src/data/portfolio.ts`: biography, employment, projects, contact links, skills and education.
- `public/images/headshot.png`: original user-supplied headshot, displayed with CSS cropping.
- `public/Sai-Nagendra-Resume.pdf`: current resume (November 2026).
- `src/data/posts.json`: sample Markdown articles, dates, tags and image metadata.
- `src/styles.css`: layout measurements, tokens and responsive behavior.

All fixture articles are illustrative and marked `isDemo:true`; they are not claims of previously published writing. Only remove this flag after replacing them with approved real articles. Generated RSS and sitemap exclude samples.

Copy `env.example` to `.env.local` for public build-time configuration. `VITE_CONTENT_SOURCE=api` switches the Writing repository to `/api/v1` (or `VITE_API_BASE_URL`), without changing components. The API is specified but not implemented. HTTP failure does not silently fall back to samples. The profile currently remains a static module.

## Application specifications

Start with [docs/README.md](docs/README.md). The package includes PRD, architecture/data model, measured design spec, backend requirements, OpenAPI3.0.3 with36 operations/58 schemas, concrete request/response examples, implementation phases, library choices, content/operations guide and verification report. The proposed service is ASP.NET Core10 + PostgreSQL with Cloudflare R2 for private upload processing and public blog-image renditions. No backend, admin editor or R2 resources have been deployed.

## Architecture

React Router handles page navigation; TanStack Query handles request state, retry and pagination. Zod validates data. JSON and HTTP repositories share an interface. ReactMarkdown renders safe Markdown, GFM tables and code; heading anchors and contents navigation share an AST parser. Images render only from declared media metadata. Article code is loaded separately from the home page. Theme and sound preferences live in the shared shell.

Build-time route entry points carry metadata, but article bodies are client-rendered. Full prerender/SSR, proper hosted404 behavior and publication-driven feed/cache refresh are explicit production gates. This preview is not described as a complete production publishing system.

## Verification and exports

Run `pnpm typecheck`, `pnpm test`, and `pnpm build`. Tests cover fixture/schema compatibility, pagination, HTTP failure/cancellation, Markdown anchors/safety, and OpenAPI validity. Browser visual/accessibility QA was unavailable in this environment; exact pixel parity is not certified. See [docs/08-validation.md](docs/08-validation.md).

```bash
python scripts/generate-api-spec.py
python scripts/export-source.py
```

Exports source and specification ZIPs to `public/`. Exports omit credentials, runtime data, hosting identity and build output. The private hosted site retains its existing audience.

Design reference: Kamran Ahmed’s portfolio. Personal content derives from the supplied resume/context; sample writing is original illustrative text. Dependencies retain their respective licenses.

## CRT AI Agent

A small CRT mascot stays in the bottom-right corner. Click it to open a clean chat window with starter questions, progressive replies, verified local source links, Stop, Retry and New chat. The demo is clearly labeled and uses only public portfolio facts. It does not call an AI provider.

`src/data/chat.json` edits the welcome/questions; `VITE_CHAT_SOURCE=demo` is the default. `api` selects the future backend transport, which loads configuration and streams answers from `/api/v1/chat/...`. It never silently falls back to demo replies. The existing .NET backend plan now includes anonymous sessions, grounded knowledge retrieval, SSE events, owner settings/reindexing, privacy, rate limits and budgets. Read [docs/09-ai-chat-requirements.md](docs/09-ai-chat-requirements.md) and the updated OpenAPI/examples.
