---
doc_id: WOL-PAGE-006
title: Page Spec — Idea Studio
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
  - /ideas/[ideaId]/studio
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Idea Studio

## 1. 목적

사용자의 경험을 7단계 질문과 AI Suggestion으로 구조화해 Working Idea Passport를 발전시킨다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PT-004` |
| Path | `/ideas/[ideaId]/studio` |
| Surface | `participant` |
| Authentication | `required` |
| Roles | idea_owner |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-006` |

## 3. 사용자 목표

- 한 번에 한 질문에 답한다.
- AI 제안을 적용·수정·거절한다.
- 단계별 진행과 저장 상태를 이해한다.
- 언제든 Passport와 Idea Map을 확인한다.

## 4. Layout

Desktop XL: Stage Sidebar | Conversation | Live Idea Map. LG: Stage + Conversation, Idea Map Sheet. Mobile: Header → Progress → Conversation → Composer → Idea Map Sheet → Stage Footer.

## 5. 주요 Components

- `StudioShell`
- `StudioHeader`
- `StageNavigation`
- `StageProgress`
- `ConversationPanel`
- `ConversationMessage`
- `AISuggestionCard`
- `SuggestionDiff`
- `AnswerComposer`
- `IdeaMapPanel`
- `IdeaMapSheet`
- `SaveStatus`
- `StageFooter`
- `ExitDialog`

## 6. Data Dependencies

- own Working Idea
- latest Working Version
- stage conversation
- accepted and pending suggestions
- challenge context
- provenance summary

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- message send
- suggestion accept/edit/reject
- stage move
- manual field edit
- save retry
- exit

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `AI_DELAYED`
- `AI_FAILED`
- `AI_SAFETY_REVIEW`
- `OFFLINE_DRAFT`
- `SAVE_FAILED`
- `ERROR_BLOCKING`

## 9. Responsive

`WOL-UX-004`의 Studio pattern을 준수한다. 360px에서 one-primary-task를 유지한다.

## 10. Accessibility

- AI streaming은 완료된 문장 단위로 announce
- stage 이동 후 H1/H2 focus
- Suggestion source와 상태 text 제공
- Idea Map text equivalent
- composer label 지속 표시

## 11. Analytics Events

- `idea_studio_viewed`
- `coach_message_sent`
- `ai_suggestion_accepted`
- `ai_suggestion_edited`
- `ai_suggestion_rejected`
- `studio_stage_changed`
- `draft_save_failed`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- owner가 아닌 사용자는 내용을 알 수 없는 안전한 거부 응답을 받는다.
- 사용자 확인 전 AI Suggestion이 canonical field로 확정되지 않는다.
- 저장 실패 시 입력이 남는다.
- 7단계가 Domain Passport field와 연결된다.
- Submitted Idea는 이 route에서 수정할 수 없다.

## 13. 비포함 범위

- AI 평가 점수
- 전문가 review
- 동시 팀 편집
- 음성 입력 MVP
