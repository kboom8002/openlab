---
doc_id: WOL-RULE-003
title: Next.js and TypeScript Rules
status: approved
authority: normative
owner: engineering
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-006
affects:
  - src/**/*.ts
  - src/**/*.tsx
supersedes: null
---

# Next.js and TypeScript Rules

> Recommended activation: Glob for `src/**/*.ts` and `src/**/*.tsx`.

## App Router

- Use `src/app` for routes, layouts, metadata, loading, error boundaries, and Route Handlers.
- Server Components are the default.
- Add `'use client'` only for browser state, event handlers, client-only libraries, or interactive shadcn components.
- Keep Client Component boundaries narrow; do not turn whole pages client-side for convenience.

## Mutations and endpoints

- Prefer Server Actions for authenticated first-party form mutations and simple domain commands.
- Use Route Handlers for AI streaming, webhooks, callbacks, signed upload endpoints, and external API contracts.
- Every mutation performs server-side authentication, authorization, validation, and error mapping.
- Middleware may refresh sessions or perform coarse routing, but it is not the sole authorization layer.

## Module boundaries

- `app/`: routing and composition
- `features/`: domain-specific UI, schemas, commands, and view models
- `server/`: server queries, actions, services
- `ai/`: graphs, nodes, prompts, providers, schemas, evals
- `lib/`: infrastructure utilities only
- `types/`: truly shared types only

Do not place SQL, LLM calls, or complex business rules in `page.tsx` or presentation components.

## TypeScript

- Keep `strict` enabled.
- Use Zod at trust boundaries: user input, environment, database RPC payloads, AI output, webhook payloads.
- Avoid `any`; use `unknown` plus validation when the source is untrusted.
- Prefer discriminated unions for status and result types.
- Exhaustively handle domain states with `never` checks where appropriate.
- Do not duplicate database enums, Zod schemas, and UI labels without a canonical mapping.

## Data fetching

- Fetch server-owned data in Server Components or server query modules.
- Avoid unnecessary client waterfalls.
- Never cache user-private data across users.
- Make revalidation and cache behavior explicit for public challenge content.

## Error behavior

Use typed domain errors and map them to safe user messages. Do not leak SQL, provider, token, stack trace, or internal IDs to the client.
