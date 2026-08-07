---
doc_id: WOL-PAGE-019
title: Page Spec — Public Idea Detail
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-UX-001
  - WOL-UX-002
  - WOL-UX-006
  - WOL-UX-007
affects:
  - /ideas/[ideaId]
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Public Idea Detail

## 1. 목적

동의된 Public 또는 Anonymous Submitted Version을 권리·검증 상태와 함께 읽기 전용으로 소개한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PUB-005` |
| Path | `/ideas/[ideaId]` |
| Surface | `public` |
| Authentication | `none` |
| Roles | anonymous, authenticated |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-019` |

## 3. 사용자 목표

- 문제·해결·첫 실험을 이해한다.
- 공개 범위와 작성자 표시를 확인한다.
- 평가점수나 성공확정으로 오해하지 않는다.

## 4. Layout

Disclosure → Idea Header → One-line Summary → Problem → Solution → Experiment → Claim/Provenance Summary → Status Boundary → Related Challenge.

## 5. 주요 Components

- `PublicIdeaHeader`
- `IdeaPassportReadonly`
- `ClaimTypeBadge`
- `ExperimentCard`
- `PublicationDisclosure`
- `RelatedChallengeCTA`

## 6. Data Dependencies

- publication-approved Version only
- visibility-safe author label
- Challenge public metadata
- consented pilot summary if any

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- 관련 Challenge 열기
- Gallery로 돌아가기
- 접근성 text summary 열기

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `NOT_FOUND`
- `ERROR_RETRYABLE`

## 9. Responsive

reading width 720px 중심. 복잡한 map은 text-first로 전환.

## 10. Accessibility

- 단일 H1
- anonymous 상태 명시
- diagram text equivalent
- 상태·평가 한계 disclosure

## 11. Analytics Events

- `public_idea_detail_viewed`
- `public_idea_related_challenge_clicked`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- private·evaluators_only Version은 404 또는 안전한 거부 처리된다.
- public/anonymous 설정과 author 표시가 일치한다.
- AI·전문가 점수는 기본 비노출이다.
- noindex가 적용된다.

## 13. 비포함 범위

- 댓글
- 좋아요
- 직접 연락처
