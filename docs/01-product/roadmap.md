---
doc_id: WOL-PROD-006
title: Product Roadmap
status: approved
authority: canonical
owner: product
last_verified: 2026-07-31
depends_on:
  - WOL-PROD-001
  - WOL-PROD-005
  - WOL-DOM-002
affects:
  - docs/11-project/**
  - docs/10-operations/**
supersedes: null
---

# Product Roadmap

## 1. 목적

달력 중심의 과도한 약속 대신, 각 단계에서 무엇을 검증한 뒤 다음 단계로 넘어갈지 Outcome 기반으로 정의한다.

## 2. Phase 0 — Repo and Architecture Ready

### 목표

Antigravity가 문서만으로 첫 Vertical Slice를 안전하게 계획할 수 있다.

### Exit Criteria

- Product·Domain Canon 승인
- UX·Architecture·RLS·AI 계약 존재
- 첫 Vertical Slice Task Card 준비
- 로컬 Supabase와 기본 Next.js scaffold 실행

## 3. Phase 1 — Closed Beta

### 대상

초대 참가자 30~50명, Challenge 1개, 운영자와 전문가 소수

### 검증 질문

- 참가자가 AI 코치로 Idea Passport를 완성할 수 있는가
- AI가 사용자의 생각을 과도하게 대체하지 않는가
- 자동 저장과 제출 버전이 신뢰되는가
- Expert Evaluation이 실증 조건을 도출하는가

### 범위

P0 기능, 단일 Challenge, AI + Expert Evaluation, 수동 Selection 운영

### Exit Criteria

- 권한 누출·치명적 데이터 손실 0건
- 핵심 E2E 완료율과 주요 이탈 구간 확인
- Golden Conversation 평가 통과
- 운영자가 결과를 설명할 수 있음

## 4. Phase 2 — Public Pilot

### 목표

공개 모집과 Pairwise 평가를 포함한 첫 `Better Ideas for Jeju` Challenge를 운영한다.

### 추가 범위

- 공개 Challenge와 Idea Gallery
- Pairwise Evaluation
- Pilot 상태 추적
- 기본 Sponsor 집계 리포트
- 접근성·모바일 고도화

### Exit Criteria

- 월간 운영 Runbook 검증
- 평가 노출 편향 모니터링
- 최소 1개 이상의 실제 Pilot 후보 연결
- 참가자 권리·공개 설정 이슈 없이 종료

## 5. Phase 3 — Monthly Challenge Series

### 목표

반복 운영 가능한 Challenge Series로 전환한다.

### 추가 범위

- Challenge template과 복제
- 월간 주제·파트너·스폰서 설정
- Monthly Insight Report
- 운영 KPI와 개선 루프
- Challenge별 평가 기준 버전 관리

### Exit Criteria

- 연속 3회 이상 안정 운영
- 참가자·평가자·운영자 재참여
- Pilot-ready 전환 데이터 축적
- Sponsor 보고 경계와 승인 프로세스 정착

## 6. Phase 4 — Enterprise and Regional OpenLab

### 목표

기업 내부·공공기관·지역별 비공개 Challenge로 확장한다.

### 후보 기능

- Organization tenant boundary
- 기관별 전용 AI Coach
- White-label theme
- 팀 작성
- 고급 리포트와 API
- 계약·실증 워크플로 연계

### 선행 조건

- Tenant isolation 검증
- 개인정보·권리 정책 확장
- 운영비와 AI 비용 구조 확인

## 7. Phase 5 — Innovation Intelligence

### 목표

누적 아이디어와 평가·Pilot 데이터를 조직의 의사결정 자산으로 활용한다.

### 후보 기능

- 유사 문제·아이디어 클러스터
- AI–Human 평가 편차 분석
- 주제별 수요·문제 인사이트
- 파트너·Pilot 매칭
- 연례 Open Innovation Report

개별 비공개 아이디어를 동의 없이 학습·분석 자산으로 전환하지 않는다.

## 8. 로드맵 변경 원칙

- 날짜보다 Exit Criteria를 우선한다.
- 스폰서 협약 전 기능을 확정된 요구로 간주하지 않는다.
- 보안·권리·평가 신뢰 문제는 기능 추가보다 먼저 해결한다.
- Phase 이동은 Product·Engineering·Operations 공동 승인으로 기록한다.
