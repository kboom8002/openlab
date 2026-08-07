---
doc_id: WOL-PAGE-016
title: Page Spec — Notifications and Profile
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
  - /notifications, /profile
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Notifications and Profile

## 1. 목적

사용자가 상태 변화와 요청을 확인하고 프로필·접근성·알림 설정을 관리한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PT-008` |
| Path | `/notifications, /profile` |
| Surface | `participant` |
| Authentication | `required` |
| Roles | authenticated |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-016` |

## 3. 사용자 목표

- 중요한 알림을 현재 행동 route와 연결한다.
- 접근성 선호와 알림 범위를 수정한다.
- 계정·데이터 요청 경로를 찾는다.

## 4. Layout

Notifications: Header → Filters → Notification List. Profile: Identity → Participation preferences → Accessibility → Notification settings → Privacy/Data.

## 5. 주요 Components

- `NotificationList`
- `NotificationItem`
- `NotificationFilter`
- `ProfileForm`
- `AccessibilityPreferences`
- `NotificationSettings`
- `PrivacyRequestPanel`

## 6. Data Dependencies

- own notifications
- own profile
- consent versions
- preference settings

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- 알림 읽음 처리
- deep link 열기
- 프로필 저장
- 접근성 설정 변경
- 데이터 요청 시작

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `SAVE_FAILED`
- `ERROR_RETRYABLE`

## 9. Responsive

모바일 단일 열. 설정 section은 Accordion보다 명확한 page sections 우선.

## 10. Accessibility

- 알림 unread 상태 text
- 설정 변경 결과 announce
- switch에 visible label
- deep link 권한 변경 시 안전한 대체

## 11. Analytics Events

- `notifications_viewed`
- `notification_opened`
- `profile_updated`
- `accessibility_preference_changed`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- 다른 사용자의 알림을 볼 수 없다.
- 접근성 설정이 다음 화면부터 적용된다.
- 중요 consent 변경은 별도 확인을 요구한다.

## 13. 비포함 범위

- 관리자 사용자 관리
- 법률상 삭제 처리 구현 상세
