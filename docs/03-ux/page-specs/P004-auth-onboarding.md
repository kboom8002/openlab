---
doc_id: WOL-PAGE-004
title: Page Spec — Authentication and Onboarding
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
  - /sign-in, /onboarding
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Authentication and Onboarding

## 1. 목적

안전하게 로그인하고 최초 역할·관심 분야·접근성 선호를 설정한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-AUTH-001` |
| Path | `/sign-in, /onboarding` |
| Surface | `auth` |
| Authentication | `mixed` |
| Roles | anonymous, new_user |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-004` |

## 3. 사용자 목표

- 사용자는 로그인 수단과 개인정보 처리 범위를 이해한다.
- 신규 사용자는 최소 설정만 완료하고 원래 목적 route로 돌아간다.

## 4. Layout

Centered Auth Shell 또는 2-column Brand/Authentication → Sign-in options → Terms links. Onboarding은 3단계 Wizard.

## 5. 주요 Components

- `AuthShell`
- `SignInOptions`
- `EmailMagicLinkForm`
- `OnboardingStepper`
- `InterestSelector`
- `AccessibilityPreferences`
- `ConsentNotice`

## 6. Data Dependencies

- auth provider availability
- terms and privacy version
- safe next route
- existing profile

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- Magic link 요청
- OAuth 시작
- 프로필 기본값 저장
- 온보딩 완료

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_REGION`
- `ERROR_RETRYABLE`
- `PERMISSION_DENIED`

## 9. Responsive

모바일은 단일 열. 날짜·코드 입력을 임의 custom control로 재구현하지 않는다.

## 10. Accessibility

- provider button에 명확한 이름
- error summary와 field 연결
- consent 사전 선택 금지
- 접근성 설정 설명 제공

## 11. Analytics Events

- `sign_in_viewed`
- `sign_in_started`
- `onboarding_started`
- `onboarding_completed`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- 외부 next URL redirect가 불가능하다.
- 로그인 완료 후 안전한 원래 route로 돌아간다.
- 필수 동의와 선택 동의를 구분한다.

## 13. 비포함 범위

- 기관 SSO
- 관리자 초대 관리
