---
doc_id: WOL-DOM-007
title: Institutional Sponsorship Model
status: approved
authority: canonical
owner: partnerships
last_verified: 2026-07-31
depends_on:
  - WOL-PROD-001
  - WOL-DOM-002
  - WOL-DOM-008
affects:
  - docs/03-ux/**
  - docs/05-data/**
  - docs/10-operations/**
  - contracts/domain/sponsorship-access-policy.yaml
supersedes: null
---

# Institutional Sponsorship Model

## 1. 목적

JDC와 같은 기관 스폰서가 WELLB OPENLAB의 월간 Challenge Series를 지원할 때, 브랜드·운영·데이터·평가·실증 역할과 금지 경계를 정의한다.

## 2. 기본 구조

```text
WellB Company
플랫폼 소유·제품·AI·운영 책임
        │
        ├─ Institutional Sponsor
        │  재원·확산·현장 연결 지원
        │
        ├─ Field Partners
        │  문제 검증·멘토링·실증
        │
        └─ Participants and Evaluators
           아이디어·경험·판단의 주체
```

## 3. Sponsor Relationship Status

- `proposal`: 제안서 전달 또는 내부 기획 단계
- `under_discussion`: 역할·조건 협의 중
- `agreement_pending`: 계약 문안·승인 대기
- `active`: 계약과 명칭·로고 사용 범위 확정
- `paused`: 계약 유효 중 일시 중단
- `ended`: 계약 종료

JDC의 초기 기본 상태는 `proposal`이다.

## 4. Anchor Sponsor 권장 역할

- 연간 또는 다회 프로그램 재원 지원
- 월별 주제와 정책·현장 과제 제안
- 대외 확산과 네트워크 연결
- 합의된 Pilot 지원
- 월간·연간 집계 성과 검토

## 5. WellB Company 역할

- Challenge·서비스·AI Agent 설계
- 참가자 Journey와 Idea Studio 운영
- 평가 프로세스와 전문가 관리
- 권리·공개·안전 정책 적용
- 결과 분석·리포트·Pilot 연결
- 플랫폼 데이터와 기술 운영

## 6. Sponsor가 자동으로 갖지 않는 권한

- Participant Idea의 소유권
- 비공개 Draft·대화 원문 열람
- 비공개 Submitted Version 일괄 열람
- 평가자 신원·개별 평가 원문 열람
- AI 단독 또는 Sponsor 단독 최종선발
- 참가자 연락처의 마케팅 사용
- WellB 플랫폼 IP의 소유권

## 7. 데이터 접근 기본값

Sponsor Viewer가 접근할 수 있는 범위:

- Challenge 일정·공개 정보
- 참여·작성·제출·평가·Pilot 집계
- Track·Category별 익명 통계
- 공개 Idea
- 참가자가 별도 동의한 Showcase
- 계약에서 합의한 공개 결과 리포트

기본 접근 불가:

- Draft
- evaluators_only 또는 private 원문
- AI 대화·Agent Run 원문
- 개인 식별정보
- 평가자 신원과 이해상충 세부
- 운영자 안전 조사 기록

## 8. 주제·평가 거버넌스

- Sponsor는 월별 주제 후보와 현장 수요를 제안할 수 있다.
- 최종 Challenge 문구·루브릭은 WellB와 Challenge Owner가 권리·공정성 검토 후 승인한다.
- Sponsor가 Expert 또는 Committee에 참여하면 역할과 이해상충을 명시한다.
- Sponsor 의견은 숨은 가산점으로 반영하지 않는다.

## 9. 브랜딩

공식 협약 전:

- `JDC 스폰서십 제안안`
- `Anchor Sponsor 후보`
- 공식 로고·Sponsored by 문구 사용 금지

Active 이후에도 다음을 데이터로 관리한다.

- 허용 로고 파일과 버전
- 사용 채널
- 문구
- 승인일·만료일
- 공동주최·후원·협력 등 정확한 관계명

## 10. Sponsor Deliverables

권장:

- 월간 Challenge Brief
- 운영 Funnel Report
- 평가·편차·신뢰 요약
- Promising·Pilot-ready Portfolio
- Pilot Status Report
- 동의된 Showcase
- Annual Impact and Innovation Report

성과 목표는 계약 목표와 실제 결과를 구분한다.

## 11. 아이디어·Pilot 계약

Sponsor가 특정 Idea의 실증·공동개발·독점사용을 원하면 다음이 필요하다.

- 제출자와의 별도 연락 동의
- 범위·기간·비용·권리 계약
- 개인정보·데이터 사용 조건
- 결과물·특허·수익배분 조건
- Sponsor와 WellB의 역할 구분

## 12. Acceptance Criteria

- 관계 상태가 UI와 권한에 반영된다.
- 공식 승인 전 로고와 확정 문구가 노출되지 않는다.
- Sponsor 데이터 접근은 최소 권한이다.
- 주제 제안·평가 참여·최종결정이 구분된다.
- 개별 Idea 사업화는 별도 계약으로 분리된다.
