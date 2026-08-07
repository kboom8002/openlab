---
doc_id: WOL-GOV-011
title: Batch 3 UX, IA, and Page Specification Report
status: approved
authority: informative
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-UX-000
  - WOL-UX-001
  - WOL-UX-002
affects:
  - docs/03-ux/**
  - contracts/ux/**
supersedes: null
---

# Batch 3 UX, IA, and Page Specification Report

## 1. 목표

Batch 2의 Product·Domain Canon을 Next.js App Router 구현 전에 필요한 route, role surface, navigation, responsive layout, component, 접근성, 상태와 page-level contract로 전환한다.

## 2. 생성 산출물

### UX Core 11종

- UX Index
- Information Architecture
- Route Map
- Navigation Model
- Responsive Layout
- Design Tokens
- Component Inventory
- Accessibility Contract
- Loading·Empty·Error States
- Interaction·Feedback
- Content·Microcopy

### Page Specifications 22종

Public, Auth, Participant, Expert, Manager, Sponsor의 핵심 route를 page-level acceptance contract로 작성했다.

### Machine-readable UX Contracts 6종

- Routes
- Breakpoints
- Component Inventory
- Page Spec Schema
- Interaction Events
- Copy·State Labels

## 3. 확정 결정

- route surface 6종 분리
- Sponsor surface를 Manager와 분리
- Idea Studio desktop 3패널·mobile one-primary-task
- participant mobile bottom navigation, Studio 전용 shell
- Public Idea·Gallery 초기 noindex
- WCAG 2.2 AA와 360px·200% zoom·reduced motion 기준
- loading·empty·error·permission·offline state의 의무 설계
- AI Suggestion 적용·수정·거절 feedback과 provenance 구분
- 상태 label·rights·Sponsor copy의 machine-readable 관리

## 4. Domain Canon 반영

- 운영위원 10% 점수를 UI에서 제거
- AI 25 / Pairwise 25 / Expert 50 reference score 유지
- `PILOT_READY`는 `실증 준비 후보`로 표시
- Submitted Version은 read-only
- Sponsor는 aggregate·consented Showcase만 열람
- JDC 공식 승인 전 후원·로고 표현 금지

## 5. 남은 P0

- shadcn primitive ADR
- repo·worker topology
- 운영자 Draft 예외 접근
- AI Provider 전송 데이터·PII redaction
- LangGraph checkpoint 구조
- JDC 공식 관계·로고 승인

## 6. QA 범위

- Markdown frontmatter와 Doc ID 중복
- YAML syntax
- Route ID·path 중복
- Route의 Page Doc 존재
- Page Spec 22개 존재
- Breakpoint·component contract 존재
- Domain status label coverage
- Sponsor·noindex·AI 자동확정 금지 문구
- 파일 목록과 manifest 생성

상세 결과는 루트 `QA_REPORT.txt`를 확인한다.

## 7. 다음 Batch

**Batch 4 — System Architecture and ADR**

현재 UX route와 Page Spec을 기준으로 Next.js runtime boundary, repository structure, Server/Client boundary, request flow, background job, cache, error taxonomy와 핵심 ADR을 작성한다.
