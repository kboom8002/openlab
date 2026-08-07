---
doc_id: WOL-UX-004
title: Responsive Layout Contract
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-UX-001
  - WOL-UX-006
  - WOL-UX-007
affects:
  - contracts/ux/breakpoints.yaml
  - src/app/**/*.tsx
  - src/components/**/*.tsx
  - src/app/globals.css
supersedes: null
---

# Responsive Layout Contract

## 1. 목적

360px 모바일부터 대형 데스크톱까지 핵심 여정의 정보 우선순위와 component 재배치를 정의한다.

## 2. Breakpoints

| Token | Min width | 주요 용도 |
|---|---:|---|
| base | 0 | 단일 열, 모바일 |
| sm | 640px | 넓은 모바일 |
| md | 768px | 태블릿, 2열 시작 |
| lg | 1024px | Desktop navigation, Studio 2패널 |
| xl | 1280px | Studio 3패널, 넓은 Admin |
| 2xl | 1536px | 최대 여백 증가, 콘텐츠 폭 유지 |

Tailwind breakpoint 이름과 일치시키되, 디자인 결정은 viewport 분류가 아니라 콘텐츠 적합성을 기준으로 한다.

## 3. Container

- public max width: 1280px
- application shell max width: 1440px
- reading width: 720px
- form width: 640px
- page gutter: 20px base, 32px md, 48px xl
- 최소 touch target: 44px

## 4. 공통 패턴

### Card Grid

- base: 1열
- md: 2열
- xl: 3열 또는 데이터 밀도에 따라 4열
- 핵심 텍스트를 줄이기 위해 가로 scroll card를 사용하지 않는다.

### Table

- 핵심 항목 4개 이하: responsive row/card 전환
- 비교가 본질인 dense table: 의미 있는 local scroller 허용
- action은 첫 열·마지막 열의 문맥을 잃지 않도록 한다.

### Dialog·Sheet

- base: bottom 또는 full-height Sheet
- md 이상: Dialog
- destructive action은 화면 크기와 무관하게 명시적 확인

## 5. Idea Studio

### base–md

```text
Studio Header
Stage Progress
Conversation
Composer
[Idea Map Sheet]
Previous / Next
```

- 한 번에 한 질문
- Idea Map은 버튼으로 여는 Sheet
- stage list는 progress + dropdown 또는 Sheet
- composer는 viewport 하단에 고정하지 않고 안전한 sticky 영역 사용

### lg

```text
Stage Sidebar | Conversation
Idea Map Sheet 또는 보조 column
```

### xl+

```text
Stage Sidebar | Conversation | Live Idea Map
```

권장 비율: 240px / minmax(440px, 1fr) / 320px.

## 6. Dashboard·Admin

- base: metric 2열, list 1열
- md: metric 4열, content 2열
- lg+: sidebar + main
- admin dense filters는 collapsible panel
- primary action은 header 또는 bottom action bar 중 하나만 사용

## 7. Typography

- 본문 최소 16px
- 긴 본문 line length 45–75 characters
- H1은 base에서 32–40px 범위, desktop에서 48–64px 범위
- viewport에 따라 강제 줄바꿈한 카피를 데이터에 저장하지 않는다.

## 8. Zoom·Reflow

- 200% zoom에서 핵심 기능 사용 가능
- 320 CSS px equivalent에서 양방향 page scroll 금지
- dense comparison과 table만 국소 horizontal scroll 허용
- sticky 요소가 콘텐츠와 focus를 가리지 않는다.

## 9. Reduced Motion

- scroll reveal은 필수 정보 전달에 사용하지 않는다.
- `prefers-reduced-motion`에서 transition·animated progress·node motion을 제거한다.
- 로딩은 움직임 외에 텍스트 상태를 제공한다.

## 10. Acceptance Criteria

- 360, 768, 1024, 1440px에서 핵심 화면을 검증한다.
- Idea Studio가 360px에서 수평 page scroll 없이 동작한다.
- navigation·dialog·sheet가 keyboard와 screen reader에서 동일 기능을 제공한다.
- 200% zoom과 reduced motion 검증 결과를 UI report에 기록한다.
