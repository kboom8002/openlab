---
doc_id: WOL-PAGE-007
title: Page Spec — Idea Passport
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
  - /ideas/[ideaId]/passport
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Idea Passport

## 1. 목적

아이디어의 문제·사용자·해결책·실행성·임팩트·실험과 provenance를 한 문서로 검토한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PT-005` |
| Path | `/ideas/[ideaId]/passport` |
| Surface | `participant` |
| Authentication | `required` |
| Roles | idea_owner, authorized_reviewer |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-007` |

## 3. 사용자 목표

- 누락과 불확실성을 확인한다.
- Working Version에서는 직접 수정한다.
- Submitted Version에서는 immutable snapshot을 열람한다.

## 4. Layout

Passport Header → Section TOC → Summary → Problem → People → Solution → Feasibility → Impact → Experiment → Provenance → Actions.

## 5. 주요 Components

- `IdeaPassportHeader`
- `PassportSection`
- `ProvenanceIndicator`
- `ClaimTypeBadge`
- `FeasibilitySummary`
- `ImpactSummary`
- `ExperimentCard`
- `SectionNavigation`

## 6. Data Dependencies

- authorized Idea Version
- provenance records
- claim types
- preflight readiness summary

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- Working field edit
- Studio 단계로 돌아가기
- PDF preview request placeholder
- 제출 전 확인으로 이동

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `NOT_FOUND`
- `PERMISSION_DENIED`
- `ERROR_RETRYABLE`

## 9. Responsive

모바일 TOC는 Select 또는 Sheet. 2-column section은 1열로 전환.

## 10. Accessibility

- 문서 heading hierarchy
- provenance를 icon만으로 표시하지 않음
- 표와 diagram에 text equivalent
- 편집 mode의 error summary

## 11. Analytics Events

- `idea_passport_viewed`
- `passport_section_edited`
- `preflight_started_from_passport`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- version ID와 submitted 여부가 명확하다.
- Submitted Version 편집 UI가 없다.
- claim type과 provenance가 canonical contract와 일치한다.

## 13. 비포함 범위

- 법적 보호 인증
- 자동 특허성 판단
