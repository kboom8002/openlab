---
doc_id: WOL-GOV-010
title: Batch 2 Product and Domain Canon Report
status: approved
authority: informative
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-PROD-001
  - WOL-DOM-001
affects:
  - docs/01-product/**
  - docs/02-domain/**
  - contracts/domain/**
supersedes: null
---

# Batch 2 Product and Domain Canon Report

## 1. 목표

기존 PRD·UX·프로토타입·스폰서십 제안의 제품 규칙을 구현 가능한 canonical 문서와 machine-readable contract로 통합한다.

## 2. 생성 문서

### Product 6종

- Product Vision
- Product Scope
- Personas and Jobs
- Success Metrics
- MVP Boundaries
- Product Roadmap

### Domain 8종

- Domain Glossary and Enums
- Monthly Challenge Model
- Idea Passport Contract
- Idea Lifecycle
- Evaluation Model
- Pilot Lifecycle
- Sponsorship Model
- Rights and Visibility

### Machine-readable contracts 5종

- Domain Enums
- Idea Passport Contract
- Evaluation Model
- Monthly Challenge Defaults
- Sponsorship Access Policy

## 3. 확정 결정

- 복수 Draft, 최종 제출 기본 1개·설정 1~3개
- visibility 4종
- Submitted Version 불변
- Reference Score AI 25 / Pairwise 25 / Expert 50
- 운영위원은 정성 Selection Gate
- Sponsor는 집계·동의 Showcase만 기본 접근
- 전문가 신원 기본 비공개
- JDC 관계 기본값 `proposal`

## 4. 주요 변경

기존 프로토타입의 `AI 25 + 사용자 25 + 전문가 40 + 운영위원 10` 표기를 canonical 모델에서 폐기했다. 운영위원 10% 점수는 설명하기 어려운 숨은 가산점이 될 수 있어, Expert 비중을 50%로 하고 운영위원은 정성 Gate로 분리했다. Batch 3 UI 카피와 이후 구현에서 이를 반영해야 한다.

## 5. 남은 P0

- shadcn primitive
- repo·worker topology
- LangGraph checkpoint 저장 구조
- 운영자 Draft 예외 접근 절차
- AI Provider 전송 데이터·PII 제거 정책
- JDC 공식 관계·로고 승인

## 6. QA

- frontmatter와 Doc ID 검사
- YAML 계약 구문 검사
- enum·가중치 합계 검사
- Visibility·Idea Status·Sponsor status 일치 검사
- 파일 목록과 manifest 생성

상세 결과는 루트 `QA_REPORT.txt`를 확인한다.

## 7. 다음 Batch

**Batch 3 — UX, IA and Page Specifications**

Canonical Domain을 기준으로 Route Map, Navigation, Responsive Layout, Design Tokens, Component Inventory, 접근성, Loading·Empty·Error 상태와 Page Spec을 작성한다.
