---
doc_id: WOL-DOM-008
title: Idea Rights, Consent and Visibility
status: approved
authority: canonical
owner: product-legal
last_verified: 2026-07-31
depends_on:
  - WOL-DOM-001
  - WOL-DOM-003
  - WOL-DOM-007
affects:
  - docs/05-data/**
  - docs/08-security/**
  - src/features/ideas/**
  - contracts/domain/sponsorship-access-policy.yaml
supersedes: null
---

# Idea Rights, Consent and Visibility

## 1. 목적

아이디어 제출자의 권리, 플랫폼의 제한적 이용, 공개 범위, 평가·AI 처리 동의와 Sponsor 접근 경계를 정의한다. 본 문서는 법률 자문을 대체하지 않으며 Closed Beta 전 실제 약관 검토가 필요하다.

## 2. 기본 소유권 원칙

- Idea의 권리는 원칙적으로 제출자에게 유지된다.
- 제출만으로 WellB Company, Sponsor 또는 Challenge Owner에 소유권이 이전되지 않는다.
- 플랫폼은 저장, 평가, 선택한 범위 내 공개와 운영 리포트에 필요한 제한적 이용권만 받는다.
- 공동개발·양도·독점 사용·수익배분·특허는 별도 계약이 필요하다.

## 3. Visibility enum

### `public`

- Idea 내용과 작성자 표시명이 공개 Gallery에 노출될 수 있다.
- 민감정보와 비공개 Evidence는 제외한다.
- 검색엔진 노출 여부는 별도 설정으로 확장 가능하나 MVP에서는 공개 페이지 노출을 의미한다.

### `anonymous`

- Idea 내용은 공개되지만 일반 사용자에게 작성자 신원은 표시하지 않는다.
- 운영자와 권한 있는 평가자는 제출자 식별이 가능하다.
- 공개 텍스트 안의 자기식별 정보는 제출자가 제거해야 하며 Preflight가 경고한다.

### `evaluators_only`

- 제출자, Challenge 운영자, 배정된 평가자와 필요한 시스템 역할만 열람한다.
- Sponsor Viewer와 일반 참가자는 접근할 수 없다.

### `private`

- 제출자와 최소 운영·안전 권한만 열람한다.
- 평가에 참여하려면 제출자가 평가 목적 접근에 동의해야 한다.
- Sponsor와 일반 평가자는 접근할 수 없다.

## 4. Draft 접근

- Draft는 제출자 본인과 명시적 공동작성자만 기본 접근한다.
- Challenge Manager는 일반 지원 목적만으로 Draft를 상시 열람하지 않는다.
- 안전 신고·사용자 지원 등 승인된 예외 열람에는 사유·범위·감사로그가 필요하다.
- Sponsor는 Draft에 접근하지 않는다.

## 5. 필수 동의

- 이용약관
- 개인정보 처리
- Challenge 참여 조건
- 평가 목적의 제출 버전 처리
- AI API 처리 범위
- 제출 권한 보유 확인

필수 동의는 버전·시간·사용자와 함께 기록한다.

## 6. 선택 동의

- 공개 Gallery Showcase
- Sponsor·파트너 사례 리포트
- Pilot 연락
- 후속 프로그램 안내
- 익명 연구·통계 활용
- 외부 홍보 콘텐츠

선택 동의 거부가 Challenge 평가 점수에 영향을 주지 않는다.

## 7. AI 처리

- AI Provider에는 현재 작업에 필요한 최소 데이터만 보낸다.
- 전송 전 불필요한 PII를 제거 또는 마스킹한다.
- AI 입력·출력·Prompt Version과 처리 목적을 기록한다.
- Provider의 학습·보존 설정은 계약과 기술 설정에 맞게 최소화한다.
- 사용자는 AI가 제안한 항목과 자신의 확정 항목을 볼 수 있어야 한다.

## 8. 평가 접근

- Expert는 배정된 Submitted Version과 평가에 필요한 Evidence만 열람한다.
- Pairwise Evaluator는 익명 요약 필드만 본다.
- AI Evaluation은 작성 중 Draft가 아니라 제출된 고정 Version을 대상으로 한다.
- 평가자 개인 신원은 기본 비공개이며 프로그램 정책·동의에 따라 공개할 수 있다.

## 9. Sponsor 접근

Sponsor 기본 접근:

- 공개 정보
- 집계 지표
- 참가자가 별도 동의한 Showcase

별도 계약만으로도 Participant의 `private` 또는 `evaluators_only` 콘텐츠에 자동 접근할 수 없다. 이용 목적과 제출자 동의 또는 적법한 근거가 명확해야 한다.

## 10. 철회·삭제

### 철회

- 정책 기간 내 Challenge 참여와 제출을 철회할 수 있다.
- 이미 공개된 Showcase는 철회 요청 처리와 캐시·리포트 정정 절차가 필요하다.
- 평가·통계의 무결성을 위해 익명화된 최소 기록을 보존할 수 있으며 약관에 명시한다.

### 삭제

- 계정과 개인 데이터 삭제 정책은 보존기간·법적 의무와 함께 Security 문서에서 확정한다.
- Audit Log는 식별정보를 최소화하고 법적·보안상 필요한 범위만 유지한다.

## 11. 외부 자료와 제3자 권리

- 제출자는 타인의 저작물·상표·영업비밀을 무단 제출하지 않는다.
- 외부 자료는 출처와 사용 권한을 기록한다.
- 유사한 아이디어가 존재할 수 있으며 제출이 독창성·특허성을 보장하지 않는다.

## 12. 권리 관련 금지 카피

- `제출하면 아이디어가 보호됩니다.`
- `등록 순간 특허권이 생깁니다.`
- `Sponsor가 모든 아이디어를 사용할 수 있습니다.`
- `AI가 표절 여부를 완전히 보장합니다.`

## 13. Acceptance Criteria

- visibility별 읽기 권한이 테스트로 증명된다.
- 필수·선택 동의가 분리되고 버전 관리된다.
- Sponsor와 평가자의 접근 범위가 다르다.
- 제출 버전과 권리 설정이 함께 snapshot 된다.
- 철회·삭제·Showcase 취소 경로가 존재한다.
