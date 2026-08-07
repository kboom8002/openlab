---
doc_id: WOL-UX-009
title: Interaction and Feedback Contract
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-UX-006
  - WOL-UX-007
  - WOL-UX-008
  - WOL-DOM-003
  - WOL-DOM-004
affects:
  - src/features/studio/**
  - src/components/shared/**
  - contracts/ux/interaction-events.yaml
supersedes: null
---

# Interaction and Feedback Contract

## 1. 목적

자동 저장, AI streaming, Suggestion 적용, 단계 이동, 제출과 평가의 사용자 피드백 규칙을 정의한다.

## 2. Action 상태

모든 async action은 다음을 구분한다.

```text
idle
pending
success
error
```

중복 제출을 막되 실패 후 retry할 수 있어야 한다.

## 3. Auto-save

- 입력 idle 800ms 후 저장 요청
- stage 이동·AI Suggestion 적용·page exit 전 즉시 flush
- `저장 중` → `저장됨 · HH:MM`
- 저장 성공 toast를 반복하지 않음
- 실패는 persistent inline 상태
- server version conflict면 자동 overwrite 금지

## 4. AI Conversation

- send 직후 user message를 표시
- AI 상태: 준비 중 → 응답 중 → 확인 필요
- streaming 중 composer 사용 정책은 stage별로 일관되게 유지
- 취소 가능 작업이면 Stop action 제공
- timeout 후 retry·직접 작성 제공
- model·token·provider 내부 정보는 일반 UI에 노출하지 않음

## 5. AI Suggestion Lifecycle

```text
pending
→ accepted
→ confirmed

pending
→ edited
→ confirmed

pending
→ rejected
```

- `accepted`와 `edited`는 provenance가 다르다.
- Suggestion은 target field와 proposed text를 보여준다.
- 적용 action은 reversible해야 한다.
- confidence가 낮으면 이유와 확인 질문을 표시한다.
- 사용자 동의 없이 자동 확정하지 않는다.

## 6. Stage Navigation

- 다음 단계 이동은 가능한 한 막지 않음
- 필수 공백은 warning으로 안내
- 제출 단계에서 blocking requirement를 최종 확인
- 이전 단계 내용은 유지
- 현재 stage heading으로 focus 이동

## 7. Preflight·Submission

- Preflight는 `Ready`, `Needs Review`, `Incomplete`, `Safety Review`로 요약
- `Needs Review`는 제출 가능 여부를 정책과 분리해 명시
- 제출 button은 visibility·필수 consent 완료 후 활성
- 제출 직전 immutable Version 생성 사실을 안내
- 성공 후 중복 submit 방지와 제출 Version link 제공

## 8. Pairwise Evaluation

- 선택 후 즉시 다음 비교로 넘기기 전 선택을 시각·텍스트로 확인
- undo window를 짧게 제공하거나 명시적 Next 사용
- 순위·다른 사용자 선택은 평가 전 노출하지 않음
- 동일 쌍 중복을 UI에서만 막지 않음

## 9. Expert Review

- score와 정성 의견 자동 저장
- conflict 선언 전 review 시작 금지
- 최종 제출 후 수정 가능 기간을 명시
- 제출 성공 reference와 completed 상태 제공

## 10. Destructive Action

철회·삭제·평가 취소는:

- 결과 설명
- 대상 이름
- 필요 시 confirmation phrase
- reversible 여부
- audit 기록 안내

## 11. Notification

Toast는 즉각적이고 낮은 중요도의 결과에 사용한다. 권리·제출·오류·안전 state는 page 또는 inline alert로 남긴다.

## 12. Acceptance Criteria

- async action에 pending·error state가 있다.
- 자동 저장 실패 시 이탈 보호가 있다.
- AI Suggestion 적용·수정·거절이 provenance와 일치한다.
- 제출과 전문가 review의 중복 실행이 차단된다.
- critical 결과가 toast만으로 전달되지 않는다.
