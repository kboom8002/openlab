---
doc_id: WOL-ARCH-010
title: Error Taxonomy and Recovery
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-006
- WOL-UX-008
affects:
- src/lib/errors/**
- src/app/**/error.tsx
- contracts/architecture/error-catalog.yaml
supersedes: null
---


# Error Taxonomy and Recovery

## 1. 목적

오류를 사용자 메시지, HTTP/action 결과, 로그와 retry 정책에서 일관되게 다룬다.

## 2. 오류 계층

| Category | Prefix | 기본 처리 |
|---|---|---|
| Authentication | `AUTH_` | sign-in 또는 session refresh |
| Authorization | `ACCESS_` | 403 또는 존재 은닉 404 |
| Validation | `INPUT_` | field error |
| Domain state | `STATE_` | 최신 상태 안내·재조회 |
| Conflict | `CONFLICT_` | merge·retry·idempotent success |
| Rate limit | `RATE_` | retry-after |
| AI provider | `AI_PROVIDER_` | retry·fallback·direct edit |
| AI schema | `AI_SCHEMA_` | repair 1회·human path |
| Graph | `GRAPH_` | resume·checkpoint 확인 |
| Storage | `STORAGE_` | text state 유지·attachment retry |
| External | `EXTERNAL_` | degraded mode |
| Internal | `INTERNAL_` | correlation ID·generic message |

## 3. Public error shape

```ts
{
  ok: false,
  error: {
    code: "STATE_IDEA_ALREADY_SUBMITTED",
    message: "이미 제출된 아이디어입니다.",
    fieldErrors?: {},
    retryable: false,
    correlationId: "..."
  }
}
```

내부 원인, SQL, provider payload, stack trace는 반환하지 않는다.

## 4. Not found vs forbidden

다른 사용자의 Draft, 비공개 Idea, 배정되지 않은 review는 object 존재를 숨길 필요가 있으면 404를 사용한다. 명확한 role surface 접근 거부는 `/access-denied` 또는 403을 사용할 수 있다.

## 5. Retry classification

Retryable:

- provider 429·일시 장애
- network timeout
- job lock contention
- transient storage failure

Non-retryable:

- validation
- rights consent missing
- Submitted Version mutation
- unauthorized object
- invalid state transition

## 6. Logging

모든 server error는 correlation ID, actor ID hash, object ID, operation, public code와 internal cause를 기록한다. Idea content·AI transcript·token을 일반 error log에 넣지 않는다.

## 7. UI recovery

- field error: 해당 field focus
- stale Draft: 서버본 비교·merge
- AI failure: 직접 작성 계속
- upload failure: text 저장 유지
- session expiry: 안전한 재로그인 후 return path

## 8. Acceptance Criteria

- machine-readable catalog에 모든 public code가 있다.
- retryable 여부가 category와 일치한다.
- private object error가 존재를 누출하지 않는다.
- logs에 secret·full content가 없다.
