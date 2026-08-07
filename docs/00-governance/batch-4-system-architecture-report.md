---
doc_id: WOL-GOV-012
title: Batch 4 System Architecture and ADR Report
status: approved
authority: informative
owner: product-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-000
- WOL-ADR-000
affects:
- docs/04-architecture/**
- docs/adr/**
- contracts/architecture/**
supersedes: null
---


# Batch 4 System Architecture and ADR Report

## 1. 목표

Batch 3의 Route·Page Spec을 Next.js·Supabase·LangGraph.js 구현 경계로 전환하고, 코드 scaffold 전에 필요한 기술 선택을 ADR과 machine-readable contract로 고정한다.

## 2. 생성 산출물

### Architecture Core 12종

- Architecture Index
- System Context
- Container Architecture
- Runtime Boundaries
- Repository Structure
- Server·Client Boundary
- Request Flow
- AI Request Flow
- Event·Job Model
- Caching Strategy
- Error Taxonomy
- Dependency Rules

### ADR 11종

ADR Index와 10개 기술 결정문을 작성했다.

### Machine-readable Architecture Contract 7종

- ADR Register
- Runtime Boundaries
- Repository Boundaries
- Request Handling
- Error Catalog
- Dependency Rules
- Background Job Types

## 3. 확정 결정

- Next.js App Router 단독 사용
- 단일 Git repository·단일 package workspace
- Supabase PostgreSQL을 System of Record로 사용
- Server Action과 Route Handler의 책임 분리
- AI Provider abstraction과 Model Registry
- production durable LangGraph persistence boundary
- shadcn/ui Base UI primitive
- 장기 작업 Background Job boundary
- Sponsor dedicated read model
- Audit와 content provenance 분리
- Node.js runtime 기본, Edge는 별도 ADR 전 금지

## 4. Open으로 유지한 사항

- LangGraph checkpointer의 구체 saver·schema·retention
- queue·job runner provider
- primary·fallback AI model
- deployment platform
- 운영자 Draft 예외 접근 절차
- provider 전송 field allowlist·redaction 상세

## 5. 다음 Batch 입력

Batch 5는 이 architecture를 기준으로 ERD, table dictionary, Auth role, RLS matrix, Storage, migration, audit schema와 Sponsor read model을 구체화한다.
