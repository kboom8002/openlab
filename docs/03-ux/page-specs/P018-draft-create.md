---
doc_id: WOL-PAGE-018
title: Page Spec — Draft Creation
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
  - /ideas/new
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Draft Creation

## 1. 목적

활성 Challenge의 참여 조건과 제출 제한을 검사한 뒤 소유자 Draft를 생성하고 Idea Studio로 이동한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PT-003` |
| Path | `/ideas/new` |
| Surface | `participant` |
| Authentication | `required` |
| Roles | participant |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-018` |

## 3. 사용자 목표

- 어떤 Challenge에 Draft를 만드는지 확인한다.
- 기존 Draft를 이어갈지 새 Draft를 만들지 선택한다.
- 생성 실패 이유를 이해한다.

## 4. Layout

Challenge Summary → Existing Drafts if any → Draft Title/Starting Point optional → Create CTA.

## 5. 주요 Components

- `ChallengeSummary`
- `ExistingDraftList`
- `DraftStartForm`
- `ParticipationLimitNotice`
- `RightsNotice`

## 6. Data Dependencies

- target Challenge
- participation eligibility
- existing own Drafts
- submission limit policy

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- 기존 Draft 열기
- 새 Draft 생성
- Challenge detail로 돌아가기

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `PERMISSION_LOGIN_REQUIRED`
- `PERMISSION_DENIED`
- `ERROR_BLOCKING`

## 9. Responsive

모바일 단일 열. Existing Draft는 list로 표시.

## 10. Accessibility

- Challenge와 생성 결과를 명확히 설명
- 중복 생성 경고는 선택을 막지 않고 설명
- error summary

## 11. Analytics Events

- `draft_create_viewed`
- `draft_created`
- `existing_draft_opened`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- 비활성·마감 Challenge에는 Draft를 생성하지 않는다.
- 생성된 Draft owner가 현재 사용자다.
- 성공 후 정확한 Studio route로 이동한다.

## 13. 비포함 범위

- team member 초대
- 템플릿 marketplace
