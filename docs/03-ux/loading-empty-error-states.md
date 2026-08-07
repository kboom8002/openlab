---
doc_id: WOL-UX-008
title: Loading, Empty, Error, and Permission States
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-UX-006
  - WOL-UX-007
  - WOL-DOM-004
affects:
  - src/components/shared/**
  - src/app/**/loading.tsx
  - src/app/**/error.tsx
  - contracts/ux/copy-state-labels.yaml
supersedes: null
---

# Loading, Empty, Error, and Permission States

## 1. 목적

성공 상태만 설계하는 문제를 방지하고, 모든 핵심 surface의 대기·빈 상태·오류·권한·오프라인 UX를 표준화한다.

## 2. 상태 ID

```text
LOADING_INITIAL
LOADING_REGION
EMPTY_FIRST_USE
EMPTY_FILTERED
ERROR_RETRYABLE
ERROR_BLOCKING
PERMISSION_LOGIN_REQUIRED
PERMISSION_DENIED
NOT_FOUND
OFFLINE_DRAFT
SAVE_FAILED
AI_DELAYED
AI_FAILED
AI_SAFETY_REVIEW
```

## 3. Loading

### Initial Page

- 구조를 예측할 수 있는 skeleton
- page title은 가능하면 유지
- 400ms 이하 작업에 불필요한 spinner flash를 만들지 않음

### Region

- 전체 page를 막지 않고 해당 영역만 loading
- button은 중복 action 방지
- 사용자 입력은 가능한 경우 유지

### AI

```text
내용을 정리하고 있습니다.
현재 작성 내용은 저장되었습니다.
```

진행 상태를 표시하되 완료 시점을 약속하지 않는다.

## 4. Empty

### First Use

- 왜 비어 있는가
- 시작할 수 있는 Primary CTA
- 최소 예시

예:

```text
아직 작성한 아이디어가 없습니다.
일상에서 발견한 작은 불편부터 시작해보세요.
[아이디어 시작하기]
```

### Filtered

- 적용된 filter를 요약
- filter reset action
- 새 데이터 생성 CTA를 강요하지 않음

## 5. Error

### Retryable

- 무엇이 실패했는지
- 사용자 데이터가 안전한지
- 다시 시도 action
- 대체 수단

### Blocking

- 다음 행동
- 문의·지원 reference ID
- 민감한 내부 오류·SQL·provider message 비노출

## 6. Permission

### Login Required

현재 목적을 잃지 않도록 안전한 `next` route를 제공한다.

### Denied

```text
이 내용을 볼 권한이 없습니다.
계정이나 배정 상태가 변경되었을 수 있습니다.
[대시보드로 이동]
```

비공개 객체 존재를 노출하면 안 되는 경우 Not Found를 사용한다.

## 7. Offline·Save

### Offline Draft

- 메모리 또는 허용된 local fallback 상태를 명시
- 서버 동기화 여부를 분리
- 제출·평가와 같은 critical action은 online 확인 필요

### Save Failed

```text
저장하지 못했습니다.
작성 내용은 이 화면에 남아 있습니다.
[다시 저장]
```

페이지 이탈 시 경고한다.

## 8. AI Safety Review

```text
민감정보 또는 안전 관련 내용을 확인해야 합니다.
현재 내용은 제출되지 않았으며 운영자 검토가 필요할 수 있습니다.
```

AI safety state를 처벌이나 확정 위반처럼 표현하지 않는다.

## 9. Route-level Files

- `loading.tsx`: route shell skeleton
- `error.tsx`: retry boundary
- `not-found.tsx`: public/object not found
- permission은 domain-specific component로 처리

## 10. Acceptance Criteria

- 모든 P0 page spec에 최소 5개 상태가 정의된다.
- save 실패에서 사용자 입력이 사라지지 않는다.
- AI 실패 시 직접 작성 가능하다.
- permission error가 민감 객체 존재를 노출하지 않는다.
- 오류에는 사용자 행동 또는 명확한 종료 경로가 있다.
