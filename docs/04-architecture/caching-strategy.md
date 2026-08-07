---
doc_id: WOL-ARCH-009
title: Caching and Revalidation Strategy
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-006
- WOL-UX-002
affects:
- src/app/**
- src/server/queries/**
- contracts/architecture/runtime-boundaries.yaml
supersedes: null
---


# Caching and Revalidation Strategy

## 1. 원칙

보안·정확성·단순성이 캐시 적중률보다 우선한다. 사용자별 Draft, evaluation, sponsor 권한 데이터는 공유 캐시에 저장하지 않는다.

## 2. 데이터 분류

| Class | 예 | 기본 전략 |
|---|---|---|
| Public stable | About, How it works | static 또는 장기 revalidate |
| Public operational | Published Challenge list | tag-based revalidate |
| Public consented | Approved Idea Showcase | noindex + 짧은 revalidate |
| Protected user | Draft, Passport, Notification | no shared cache |
| Protected review | Expert assignment, Selection | no shared cache |
| Sponsor aggregate | approved aggregate | request authorization 후 read; shared cache 기본 금지 |
| AI stream | run event | cache 금지 |

## 3. Public cache

Published Challenge가 변경되면 `challenge:{id}`와 challenge list tag를 invalidate한다. 공개 cache key에 role·visibility가 섞이지 않도록 public DTO만 사용한다.

## 4. Protected data

- `no-store` 또는 동등한 dynamic read
- request 내 동일 query는 memoization 가능
- cross-request user-specific cache 금지
- signed URL은 짧은 만료와 capability scope

## 5. Mutation revalidation

Server Action이 성공한 후 영향을 받은 tag/path만 revalidate한다. 실패·rollback 시 revalidate하지 않는다.

## 6. Staleness

Dashboard의 count는 짧은 지연을 허용할 수 있지만 권한·상태 transition 버튼은 최신 record를 재검사한다. Sponsor aggregate에는 기준 시각을 표시한다.

## 7. AI data

Prompt·model registry는 process-level cache가 가능하지만 version key를 포함한다. 사용자 prompt input·AI output은 shared cache하지 않는다.

## 8. Acceptance Criteria

- Draft·evaluation이 public/shared cache에 들어가지 않는다.
- public DTO와 protected DTO가 분리된다.
- mutation별 revalidation tag가 정의된다.
- Sponsor report에 generated_at 기준이 표시된다.
