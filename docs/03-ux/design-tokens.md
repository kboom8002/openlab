---
doc_id: WOL-UX-005
title: Design Token Contract
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-004
  - WOL-GOV-006
  - WOL-UX-007
affects:
  - src/app/globals.css
  - src/styles/**
  - src/components/ui/**
  - contracts/ux/component-inventory.yaml
supersedes: null
---

# Design Token Contract

## 1. 목적

WellB 브랜드와 OpenLab 제품 UI의 색상·타이포그래피·간격·반경·상태 표현을 CSS 변수 기반으로 관리한다.

## 2. 브랜드 방향

- 신뢰: Deep Forest
- 주 행동: Forest
- 구조화·AI 보조: Sage
- 따뜻한 강조: restrained Gold
- 작업 공간: Mist와 Neutral Surface

환경 캠페인처럼 보이지 않도록 녹색을 장식보다 정보 위계와 action에 사용한다.

## 3. Color Tokens

```css
:root {
  --brand-deep: #1f2d1b;
  --brand-forest: #465e3b;
  --brand-leaf: #718866;
  --brand-sage: #dce6d6;
  --brand-mist: #f5f7f2;
  --brand-gold: #b69658;
  --brand-ink: #172016;

  --surface: #ffffff;
  --surface-subtle: #f7f8f5;
  --surface-muted: #eef1eb;
  --border: #d9ded5;
  --text: #172016;
  --text-muted: #5f695b;

  --info: #2f65a7;
  --info-subtle: #e8f1fb;
  --success: #26734d;
  --success-subtle: #e6f4ec;
  --warning: #9a650d;
  --warning-subtle: #fff2d7;
  --danger: #a33a3a;
  --danger-subtle: #fbe8e8;
}
```

실제 shadcn token mapping은 Batch 4의 primitive ADR 후 확정한다.

## 4. Claim Type 표현

| Claim type | 색상 역할 | 필수 비색상 표현 |
|---|---|---|
| Fact | info | `확인된 사실` label |
| Experience | forest | `직접 경험` label |
| Assumption | warning | `가정` label |
| Expected Impact | leaf | `기대효과` label |

색상만으로 구분하지 않는다.

## 5. AI Suggestion 상태

- pending: Sage surface + `AI 제안`
- accepted: success indicator + `적용됨`
- edited: info indicator + `수정 후 적용`
- rejected: neutral + `적용하지 않음`
- low confidence: warning label
- safety review: danger 또는 warning context에 따라 구분

## 6. Typography

권장 font stack:

```css
font-family:
  Pretendard, "Noto Sans KR", "Malgun Gothic",
  system-ui, -apple-system, sans-serif;
```

- display: 700
- heading: 650–700
- body: 400–500
- label·button: 600
- code·ID: system monospace

## 7. Space and Size

```text
space: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
radius: 8, 12, 16, 20, 999
control height: 40 compact, 44 default, 48 prominent
```

## 8. Elevation

- 기본 surface는 border 우선
- shadow는 floating navigation·dialog·popover에 제한
- outer glow·neon·과도한 gradient 금지
- nested card shadow 금지

## 9. Focus

- 모든 interactive element에 2px 이상 visible ring
- focus color는 background와 3:1 이상 구분
- outline 제거 후 대체 없음 금지

## 10. Dark Mode

MVP 필수 범위가 아니다. semantic token은 향후 dark mode를 추가할 수 있도록 직접 hex 사용을 component에서 금지한다.

## 11. Acceptance Criteria

- component에서 반복 hardcoded brand color가 없다.
- 상태가 색상 외 label·icon·text로 전달된다.
- 주요 foreground/background 조합이 WCAG AA 대비를 충족한다.
- 디자인 token 변경이 primitive 구현과 분리된다.
