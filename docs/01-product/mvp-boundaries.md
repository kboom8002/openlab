---
doc_id: WOL-PROD-005
title: MVP Boundaries and Release Gates
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-PROD-002
  - WOL-DOM-004
  - WOL-DOM-008
affects:
  - docs/11-project/**
  - .agents/**
  - src/**
supersedes: null
---

# MVP Boundaries and Release Gates

## 1. 목적

MVP를 빠르게 만들기 위해 권리·보안·평가 설명가능성을 희생하지 않도록, P0·P1·P2 범위와 출시 Gate를 정의한다.

## 2. P0 — Closed Beta 필수

### Product

- Challenge 목록·상세·참여
- 이메일 또는 소셜 인증 한 방식 이상
- Participant Dashboard
- 7단계 Idea Studio
- 단계별 자동 저장
- AI Suggestion 수용·수정·거절
- Idea Passport
- Preflight
- visibility와 필수 동의
- 제출 버전 고정·철회

### Evaluation

- 적격성 검토
- AI Evaluation structured output
- Expert Assignment·Evaluation
- Selection Gate와 이유 기록

### Operations

- Challenge CRUD·발행·마감
- Idea 상태 관리
- 평가자 배정
- 보완 요청
- 집계 CSV 또는 화면 리포트
- Audit Log

### Quality

- Supabase RLS
- 핵심 E2E
- AI Schema validation
- 접근성 기본 Gate
- 권리·공개 테스트

## 3. P1 — Public Pilot 권장

- Pairwise Evaluation
- 기본 Idea Gallery
- 기본 시각화 3종
- PDF 또는 3-Slide Pitch
- 인앱·이메일 알림
- Sponsor aggregate dashboard
- Pilot 상태 추적
- 쉬운 문장 모드 저장
- 운영 리포트 템플릿

## 4. P2 — Scale 단계

- 팀 공동 작성
- 기관별 전용 에이전트
- 화이트라벨
- 다국어
- 아이디어 유사도·중복 분석
- 실증 계약·결제
- 파트너 자동 매칭
- 고급 랭킹·포트폴리오 분석
- 외부 API·데이터 커넥터

## 5. 절대 Cut 금지 항목

일정이 부족해도 다음을 제거하지 않는다.

- 사용자 확인 전 AI 제안 미확정
- 제출 버전 불변성
- visibility·동의
- 제출자 권리 안내
- RLS
- AI 점수 자동탈락 금지
- 평가 근거와 루브릭 버전
- 감사 가능한 상태 변경

## 6. 우선 Cut 항목

일정 압박 시 다음 순서로 줄인다.

1. 장식적 애니메이션·복잡한 시각화
2. 다중 소셜 로그인
3. PDF·Pitch 생성
4. Sponsor 전용 화면 — 집계 리포트로 대체
5. Pairwise 고급 랭킹 — 단순 균형 노출로 대체
6. 이메일 알림 — 인앱 상태 확인으로 대체

## 7. Closed Beta Release Gate

- 한 참가자가 Challenge 참여부터 제출까지 완료
- 다른 사용자가 해당 Draft를 읽지 못함
- AI 제안과 사용자 확정 내용 구분
- 제출 버전 수정 차단
- Expert가 배정 버전만 평가
- AI 평가 실패 시 직접 작성·재시도 가능
- 운영자가 상태 변경 이유를 기록
- 모바일 390px과 키보드 핵심 플로 동작
- 치명적 권한·데이터 손실 이슈 0건

## 8. Public Pilot Release Gate

Closed Beta Gate에 추가:

- Pairwise 자기 아이디어 평가 차단
- 공개·익명·평가자 전용·비공개 노출 규칙 검증
- Sponsor는 집계와 동의 사례만 열람
- Pilot-ready 선정 과정의 근거 기록
- 개인정보처리방침·이용약관·아이디어 권리 고지 검토
- 운영·복구 Runbook 존재

## 9. MVP Stop Rule

다음 요구는 승인 전 구현하지 않는다.

- 스폰서의 비공개 제출안 원문 열람
- AI 자동 최종선발
- 제출만으로 광범위한 아이디어 이용권 이전
- 법률·의료·안전 적합성 자동 확정
- Service Role을 이용한 Client 우회
- 평가 중 제출 버전 무기록 수정
