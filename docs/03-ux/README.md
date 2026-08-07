---
doc_id: WOL-UX-000
title: UX, IA, and Page Specification Index
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-PROD-002
  - WOL-DOM-001
  - WOL-DOM-004
  - WOL-DOM-008
affects:
  - docs/03-ux/**
  - contracts/ux/**
  - src/app/**
  - src/components/**
supersedes: null
---

# UX, IA, and Page Specification Index

## 1. 목적

WELLB OPENLAB의 제품·도메인 Canon을 Next.js App Router에서 구현할 수 있는 정보구조, 라우트, 화면, 컴포넌트, 반응형, 접근성 계약으로 전환한다.

이 디렉터리는 **무엇을 보여주고 사용자가 어떻게 이동하는가**를 정의한다. 데이터베이스·RLS·AI Graph·API 구현 세부는 이후 Batch의 canonical 문서가 담당한다.

## 2. 읽기 순서

1. `information-architecture.md`
2. `route-map.md`
3. `navigation-model.md`
4. `responsive-layout.md`
5. `design-tokens.md`
6. `component-inventory.md`
7. `accessibility-contract.md`
8. `loading-empty-error-states.md`
9. `interaction-feedback.md`
10. `content-microcopy.md`
11. 해당 `page-specs/`

## 3. 핵심 불변 조건

- Idea Studio는 AI 대화, 구조화 문서, 실시간 Idea Map을 하나의 작업 상태로 보여준다.
- 모바일에서는 한 번에 하나의 주 작업을 우선하며 Idea Map은 Sheet로 제공한다.
- AI Suggestion은 사용자의 수용·수정·거절 상태가 명확해야 한다.
- Draft·visibility·권리·평가 한계는 숨겨진 설정이 아니라 핵심 UX로 노출한다.
- Sponsor 화면은 집계와 동의된 Showcase만 기본 제공한다.
- Public Idea 상세는 Public Pilot 승인 전 기본 `noindex`다.
- 화면 상태는 loading·empty·error·offline·permission denied를 포함한다.
- WCAG 2.2 AA를 최소 기준으로 한다.

## 4. Machine-readable contracts

- `contracts/ux/routes.yaml`
- `contracts/ux/breakpoints.yaml`
- `contracts/ux/component-inventory.yaml`
- `contracts/ux/page-spec.schema.yaml`
- `contracts/ux/interaction-events.yaml`
- `contracts/ux/copy-state-labels.yaml`

## 5. Prototype 관계

기존 HTML 프로토타입은 레이아웃·카피·흐름 참고자료다. 본 디렉터리와 Domain Canon이 충돌하면 본 문서와 Domain Canon이 우선한다.

## 6. Stop Rule

다음이면 구현하지 않고 결정 요청을 남긴다.

- 페이지에서 Sponsor가 비공개 Idea·Draft·AI 대화에 접근해야 함
- UI가 canonical enum과 다른 상태를 요구함
- AI가 사용자 확인 없이 Passport를 갱신해야 함
- Submitted Version을 직접 편집해야 함
- 권한이 불명확한 페이지를 공개 route로 만들어야 함
