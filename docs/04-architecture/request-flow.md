---
doc_id: WOL-ARCH-006
title: Request and Mutation Flow
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-003
- WOL-ARCH-005
affects:
- src/app/**
- src/server/**
- contracts/architecture/request-handling.yaml
supersedes: null
---


# Request and Mutation Flow

## 1. 목적

읽기, mutation, streaming, callback이 동일한 authorization·validation·error 규칙을 따르도록 요청 흐름을 표준화한다.

## 2. Public read

```text
Request → Server Component → Public Query Service
→ published/status/visibility filter → Supabase user/anon context
→ DTO mapping → HTML
```

Public page는 unpublished·private field를 select하지 않는다. UI에서 숨기는 방식으로 보호하지 않는다.

## 3. Protected read

```text
Request → Session resolve → Role check → Object scope check
→ Query Service → Supabase user context + RLS → DTO
```

Middleware는 session refresh와 coarse redirect를 지원하지만 object authorization의 단일 근거가 아니다.

## 4. Server Action mutation

사용 조건:

- same-origin UI에서 시작
- request·response가 짧음
- streaming 불필요
- 즉시 transaction 가능

표준 순서:

1. session resolve
2. Zod parse
3. role·object authorization
4. idempotency·version check
5. transaction
6. audit event
7. revalidate tag/path
8. typed result

## 5. Route Handler

사용 조건:

- AI stream·long polling
- webhook·OAuth callback
- 외부 client API
- file upload signature
- job enqueue·status polling

Route Handler도 Action과 같은 auth·schema·service를 재사용한다. business logic을 handler에 직접 작성하지 않는다.

## 6. Concurrency

Draft update는 `updated_at` 또는 revision token을 사용해 lost update를 감지한다. Submitted Version은 update하지 않고 새 Version 또는 revision request flow를 사용한다.

## 7. Idempotency

다음 operation은 idempotency key를 요구한다.

- final submit
- evaluation submit
- pairwise vote
- job enqueue
- webhook processing
- pilot status transition

## 8. Error response

Server Action은 discriminated union을 반환하고 Route Handler는 public error code와 correlation ID를 반환한다. 내부 stack·SQL·provider response는 노출하지 않는다.

## 9. Acceptance Criteria

- 같은 mutation의 Action과 Handler 구현이 domain service를 공유한다.
- 모든 protected request가 role과 object scope를 검사한다.
- submit·vote·webhook이 중복 실행에 안전하다.
- Submitted Version update endpoint가 존재하지 않는다.
