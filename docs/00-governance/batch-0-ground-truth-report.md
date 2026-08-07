---
doc_id: WOL-GOV-007
title: Batch 0 Ground Truth Report
status: approved
authority: informative
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-001
  - WOL-GOV-002
  - WOL-GOV-003
  - WOL-GOV-004
  - WOL-GOV-005
  - WOL-GOV-006
affects:
  - .agents/**
  - docs/01-product/**
supersedes: null
---

# Batch 0 Ground Truth Report

## 1. 완료된 작업

- 기존 기획·프로토타입·제안 문서의 역할을 분류했다.
- 제품 정의와 JDC 스폰서십의 공식성 경계를 분리했다.
- 사실·가정·제안·프로토타입 데이터를 구분했다.
- Next.js, Supabase, AI API, LangGraph, Tailwind CSS, shadcn/ui의 책임 경계를 고정했다.
- AI coding agent가 추측하면 안 되는 P0·P1·P2 결정을 등록했다.
- 도메인 명칭과 문서 변경 규칙을 고정했다.

## 2. Batch 0 결과

### 확정

- 제품: AI-Augmented Open Innovation Platform
- 핵심 사용자 플로: 문제 발견 → AI 구조화 → Idea Passport → 다층 평가 → 실증
- 기술 스택: Next.js + Supabase + AI API + LangGraph.js + Tailwind CSS + shadcn/ui
- 보안 원칙: RLS 우선, service role 비노출, 최소 권한
- 권리 원칙: 아이디어 권리는 제출자 유지, 사업화는 별도 계약
- 평가 원칙: AI 단독 자동 탈락 금지
- 스폰서 원칙: 비공개 아이디어 원문 자동 접근 금지

### 미확정

- shadcn primitive
- LangGraph checkpoint 저장 위치
- 장기 AI 작업 runtime
- 최종 visibility enum과 제출 수 정책
- 데이터 보존기간
- JDC 공식 협약·브랜드 사용 승인

## 3. 다음 Batch 진입 조건

Batch 1에서는 다음을 생성한다.

```text
AGENTS.md
GEMINI.md
.agents/rules/00-core-principles.md
.agents/rules/10-product-domain.md
.agents/rules/20-nextjs-typescript.md
.agents/rules/30-supabase-security.md
.agents/rules/40-ai-langgraph.md
.agents/rules/50-ui-accessibility.md
.agents/rules/60-testing-quality.md
.agents/rules/70-git-artifacts.md
.agents/workflows/*.md
```

Batch 1 Rule은 각 파일 12,000자 이하로 작성하고, 항상 적용할 규칙과 glob·model-decision 규칙을 구분한다.

## 4. 첫 Agent onboarding test

Antigravity agent에게 다음 질문을 전달한다.

> WELLB OPENLAB의 현재 제품 정의, 공식 확정되지 않은 스폰서 관계, 고정된 기술 스택, 구현 전에 결정해야 할 P0 항목을 문서 근거와 함께 요약하라. 코드를 수정하지 마라.

통과 기준:

- `source-of-truth-map.md`와 `stack-lock.md`를 찾는다.
- JDC를 확정 스폰서라고 표현하지 않는다.
- 아이디어 권리와 AI 평가 한계를 언급한다.
- D-T01, D-T02, D-T03, D-P01, D-P02, D-S01, D-S03을 식별한다.
- 구현 또는 패키지 설치를 시작하지 않는다.
