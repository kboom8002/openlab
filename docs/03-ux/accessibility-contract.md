---
doc_id: WOL-UX-007
title: Accessibility Contract
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-PROD-003
  - WOL-UX-004
  - WOL-UX-005
  - WOL-DOM-008
affects:
  - src/app/**
  - src/components/**
  - src/features/**
  - docs/09-quality/accessibility-test-plan.md
supersedes: null
---

# Accessibility Contract

## 1. 목적

WELLB OPENLAB 핵심 플로를 WCAG 2.2 AA 수준으로 설계하고, AI 상호작용·복잡한 평가·Idea Map에서 발생하는 추가 장벽을 제거한다.

## 2. 핵심 플로

다음은 keyboard와 screen reader로 완료 가능해야 한다.

- 로그인·온보딩
- Challenge 탐색·참여
- Draft 생성
- Idea Studio 7단계
- Passport 수정
- Preflight·visibility·권리 동의
- 제출
- Pairwise evaluation
- Expert review
- Manager selection의 핵심 action

## 3. Keyboard

- 모든 interactive element는 native tab order
- custom positive tabindex 금지
- dialog·sheet는 focus trap과 close 후 focus return
- Escape 동작은 데이터 손실을 만들지 않음
- drag-only interaction 금지
- score slider를 사용하면 숫자 input 또는 button 대안 제공

## 4. Screen Reader

- page마다 고유 H1
- heading hierarchy 유지
- navigation landmark에 label 제공
- AI 새 메시지는 적절한 `aria-live` 사용
- streaming token마다 announce하지 않고 완료된 단위로 안내
- save 상태는 과도한 반복 없이 announce
- error summary에서 해당 field로 이동 가능

## 5. Idea Studio

- 현재 단계와 전체 7단계 중 위치를 text로 제공
- AI와 사용자 메시지의 화자 표시
- AI Suggestion의 source·confidence·상태 제공
- Suggestion 적용 전 변경 대상 field를 설명
- Idea Map의 동등한 text summary 제공
- 단계 이동이 focus를 의미 있는 heading으로 이동
- 작성 예상시간은 강제 제한처럼 표현하지 않음

## 6. Cognitive Accessibility

- 한 번에 한 가지 핵심 질문
- 긴 문장은 쉬운 문장 variant 제공
- technical term에 설명
- 예시는 placeholder만이 아니라 별도 helper text
- undo·back·save 상태 제공
- 한 화면 선택지는 원칙적으로 5개 이하
- 진행률이 부족해도 사용자를 불필요하게 막지 않음

## 7. Visual

- 본문 최소 16px
- text contrast 4.5:1, large text·UI boundary 3:1 이상
- color-only status 금지
- 200% zoom과 320 CSS px reflow
- focus가 sticky header·composer에 가려지지 않음
- motion reduction 지원

## 8. Forms

- visible persistent label
- required indication은 `*`와 설명
- error는 원인과 해결 방법 포함
- validation은 blur 또는 submit 시 제공하며 입력 중 방해 최소화
- consent는 사전 선택 금지
- 동일한 목적의 field는 consistent autocomplete 사용

## 9. Evaluation 공정성

- 익명 평가에서 이름·소속·프로필 이미지를 숨긴다.
- card 순서를 무작위화하더라도 focus order와 visual order를 일치시킨다.
- `비슷함`, `판단하기 어려움`을 제공한다.
- 전문가 score 입력은 숫자 범위와 의미를 함께 설명한다.

## 10. Media·Visualization

- 의미 있는 image에 alt
- 장식 image는 empty alt
- chart·map·Idea Map에 summary와 key values
- PDF export도 heading·reading order·table header를 보존하도록 후속 Batch에서 검증

## 11. Accessibility Preferences

프로필에서 다음 설정을 지원할 수 있도록 상태를 예약한다.

- 쉬운 문장
- 글자 크게
- motion 감소
- 상세 단계 안내

OS 설정을 우선하고 사용자 설정은 override 가능해야 한다.

## 12. Acceptance Criteria

- axe 자동 검사에 critical·serious issue가 없다.
- keyboard-only E2E가 통과한다.
- screen reader smoke test를 수행한다.
- 360px·200% zoom·reduced motion을 UI report에 기록한다.
- AI streaming과 save live region이 중복 announce를 만들지 않는다.
