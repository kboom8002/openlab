---
doc_id: WOL-UX-002
title: Next.js Route Map
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-UX-001
  - WOL-DOM-004
  - WOL-DOM-008
affects:
  - contracts/ux/routes.yaml
  - src/app/**
  - middleware.ts
supersedes: null
---

# Next.js Route Map

## 1. 목적

App Router의 URL, route group, 접근 주체, indexing과 page ownership을 고정한다. Route group은 URL에 노출되지 않는다.

## 2. Route Group 구조

```text
src/app/
├─ (public)/
├─ (auth)/
├─ (participant)/
├─ (expert)/
├─ (manager)/
├─ (sponsor)/
└─ api/
```

Layout은 인증·navigation·권한 surface별로 분리한다. 동일 URL을 여러 route group에서 중복 정의하지 않는다.

## 3. Public Routes

| Route ID | Path | Page | Indexing |
|---|---|---|---|
| R-PUB-001 | `/` | Home | index |
| R-PUB-002 | `/challenges` | Challenge List | index |
| R-PUB-003 | `/challenges/[slug]` | Challenge Detail | index when published |
| R-PUB-004 | `/ideas` | Idea Gallery | noindex in Public Pilot |
| R-PUB-005 | `/ideas/[ideaId]` | Public Idea Detail | noindex by default |
| R-PUB-006 | `/how-it-works` | Process | index |
| R-PUB-007 | `/organizations` | Institution Offering | index |
| R-PUB-008 | `/about` | About | index |
| R-PUB-009 | `/faq` | FAQ | index |

Idea detail은 visibility와 publication approval를 서버에서 확인한다. URL을 안다고 열람할 수 있어서는 안 된다.

## 4. Auth Routes

| Route ID | Path | 목적 |
|---|---|---|
| R-AUTH-001 | `/sign-in` | 로그인 |
| R-AUTH-002 | `/auth/callback` | OAuth·Magic Link callback |
| R-AUTH-003 | `/onboarding` | 역할·관심·접근성 설정 |
| R-AUTH-004 | `/access-denied` | 권한 부족 안내 |

## 5. Participant Routes

| Route ID | Path | 주요 객체 |
|---|---|---|
| R-PT-001 | `/dashboard` | 참여 요약 |
| R-PT-002 | `/my/ideas` | 본인 Idea 목록 |
| R-PT-003 | `/ideas/new` | Draft 생성 |
| R-PT-004 | `/ideas/[ideaId]/studio` | Working Idea |
| R-PT-005 | `/ideas/[ideaId]/passport` | Passport |
| R-PT-006 | `/ideas/[ideaId]/submit` | Preflight·권리·제출 |
| R-PT-007 | `/evaluate/pairwise` | Pairwise |
| R-PT-008 | `/notifications` | 알림 |
| R-PT-009 | `/profile` | 프로필·접근성 |

`/ideas/new`는 Challenge ID 또는 slug를 필수 입력으로 받고, 검증 후 Draft를 생성한다.

## 6. Expert Routes

| Route ID | Path | 목적 |
|---|---|---|
| R-EX-001 | `/expert` | 배정 목록 |
| R-EX-002 | `/expert/reviews/[assignmentId]` | 전문가 평가 |
| R-EX-003 | `/expert/guide` | 평가 가이드 |

## 7. Manager Routes

| Route ID | Path | 목적 |
|---|---|---|
| R-MG-001 | `/admin` | 운영 Overview |
| R-MG-002 | `/admin/challenges` | Challenge 목록 |
| R-MG-003 | `/admin/challenges/[challengeId]` | Challenge 운영 |
| R-MG-004 | `/admin/ideas` | Idea 관리 |
| R-MG-005 | `/admin/evaluations` | 평가 운영 |
| R-MG-006 | `/admin/selection` | Selection Board |
| R-MG-007 | `/admin/pilots` | Pilot 관리 |
| R-MG-008 | `/admin/reports` | 운영 보고 |
| R-MG-009 | `/admin/settings` | 범위 설정 |

## 8. Sponsor Routes

| Route ID | Path | 목적 |
|---|---|---|
| R-SP-001 | `/sponsor` | 집계 Dashboard |
| R-SP-002 | `/sponsor/reports/[challengeId]` | 월간 집계 |
| R-SP-003 | `/sponsor/showcases` | 동의 Showcase |
| R-SP-004 | `/sponsor/pilots` | 허용 Pilot 현황 |

## 9. Route Access 규칙

- 보호 route는 서버에서 session과 role을 검사한다.
- UI 숨김은 권한 검사가 아니다.
- object route는 role뿐 아니라 object-level authorization을 검사한다.
- 접근 거부 시 존재 여부를 노출하지 않는 것이 필요한 경우 404를 사용한다.
- 로그인 필요는 sign-in으로 redirect하되 `next`는 내부 allowlist path만 허용한다.
- Submitted Version review route는 assignment와 version을 고정한다.

## 10. URL 안정성

- public slug는 변경 시 redirect 기록을 유지한다.
- UUID를 사용자에게 의미 있는 제목처럼 노출하지 않는다.
- Idea URL에 visibility나 author identity를 encode하지 않는다.
- locale route는 MVP에서 제외하고 콘텐츠 언어를 한국어로 고정한다.

## 11. Metadata

각 public page는 고유 title·description·canonical을 갖는다. Public Idea는 기본 noindex이며, index 전환은 별도 정책 승인과 consent가 필요하다.

## 12. Acceptance Criteria

- `contracts/ux/routes.yaml`과 모든 page spec의 route ID가 일치한다.
- 중복 path가 없다.
- 모든 보호 route에 auth·role·object scope가 정의된다.
- public indexing 상태가 명시된다.
- Sponsor route가 Manager route를 alias하지 않는다.
