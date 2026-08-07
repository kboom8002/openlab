---
doc_id: WOL-GOV-003
title: Open Decisions
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-001
  - WOL-GOV-002
affects:
  - docs/04-architecture/**
  - docs/05-data/**
  - docs/06-ai/**
  - docs/08-security/**
  - docs/09-quality/**
supersedes: null
---

# Open Decisions

## 1. 결정 등급

- **P0:** 코드 scaffold 또는 데이터 모델 전에 반드시 결정
- **P1:** Vertical Slice 구현 전에 결정
- **P2:** Closed Beta 전에 결정

## 2. 확정된 제품·도메인 결정

| ID | 결정 | Canonical source |
|---|---|---|
| D-P01 | 복수 Draft 허용. 최종 제출 기본 1개, Challenge 설정 1~3개 | WOL-PROD-002, WOL-DOM-002 |
| D-P02 | visibility 4종 | WOL-DOM-008 |
| D-P03 | Submitted Version 불변 | WOL-DOM-004 |
| D-P05 | 운영위원은 정성 Selection Gate | WOL-DOM-005 |
| D-S01 | Sponsor는 집계와 동의 Showcase만 기본 접근 | WOL-DOM-007, WOL-DOM-008 |
| D-S06 | 전문가 신원 기본 비공개 | WOL-DOM-005 |
| D-SP03 | Sponsor는 주제 제안 가능, 자동 최종선발권 없음 | WOL-DOM-007 |
| D-SP04 | Sponsor report는 집계·Pilot·동의 사례 중심 | WOL-DOM-007 |

## 3. Batch 3에서 확정된 UX 결정

| ID | 결정 | Canonical source |
|---|---|---|
| D-UX01 | Surface를 public/auth/participant/expert/manager/sponsor로 분리 | WOL-UX-001, WOL-UX-002 |
| D-UX02 | Public Idea·Gallery는 Public Pilot에서 기본 noindex | WOL-UX-002, WOL-PAGE-011, WOL-PAGE-019 |
| D-UX03 | Idea Studio는 XL 3패널, 모바일 한 번에 한 주 작업 | WOL-UX-004, WOL-PAGE-006 |
| D-UX04 | Sponsor UI는 Manager UI와 분리하고 집계·동의 데이터만 제공 | WOL-UX-001, WOL-PAGE-014 |
| D-UX05 | Participant mobile bottom nav를 사용하되 Studio에서는 전용 shell | WOL-UX-003 |
| D-UX06 | WCAG 2.2 AA, 360px, 200% zoom, reduced motion을 핵심 기준으로 적용 | WOL-UX-007 |
| D-S07 | 공개 Idea 검색색인은 초기 noindex, 별도 승인 후 전환 | WOL-UX-002 |


## 4. Batch 4에서 확정된 아키텍처 결정

| ID | 결정 | Canonical source |
|---|---|---|
| D-T01 | shadcn/ui primitive는 Base UI | WOL-ADR-007 |
| D-T02 | 단일 Git repository·단일 package workspace | WOL-ADR-002 |
| D-A01 | App Router 단독 사용 | WOL-ADR-001 |
| D-A02 | Supabase PostgreSQL System of Record | WOL-ADR-003 |
| D-A03 | Server Action과 Route Handler 역할 분리 | WOL-ADR-004 |
| D-A04 | AI Provider abstraction | WOL-ADR-005 |
| D-A05 | durable LangGraph persistence boundary | WOL-ADR-006 |
| D-A06 | long task background job boundary | WOL-ADR-008 |
| D-A07 | Sponsor dedicated read model | WOL-ADR-009 |
| D-A08 | Audit와 Provenance 분리 | WOL-ADR-010 |

## 5. Batch 6에서 확정된 AI 결정

| ID | 결정 | Canonical source |
|---|---|---|
| D-AI01 | durable checkpoint는 Postgres saver와 격리 `langgraph_checkpoint` schema를 사용 | WOL-AI-006 |
| D-AI02 | AI primary는 OpenAI Responses adapter, cross-provider fallback은 기본 비활성 | WOL-AI-009 |
| D-AI03 | 모델은 application model key와 중앙 registry로 선택 | WOL-AI-010 |
| D-AI04 | structured output repair는 1회, 이후 typed fallback | WOL-AI-011 |
| D-AI05 | AI 제안 적용은 durable interrupt + 사용자 결정 + provenance를 요구 | WOL-AI-007, WOL-AI-016 |

## 5. 기술 결정 — Open

| ID | 등급 | 질문 | 권장 기본안 | 결정 기한 |
|---|---:|---|---|---|
| D-T04 | P1 | background job runner·queue 구현은? | JobDispatcher + persisted job + 별도 runner | Batch 7·11 |
| D-T06 | P1 | 배포 플랫폼은 Vercel인가? | Vercel + Supabase | Batch 11 |
| D-T07 | P2 | 이메일·알림 공급자는? | 후보 비교 | Closed Beta 전 |
| D-T08 | P2 | 분석·오류 추적 도구는? | PostHog + Sentry 후보 | Closed Beta 전 |

## 6. 제품·운영 결정 — Open

| ID | 등급 | 질문 | 권장 기본안 | 결정 기한 |
|---|---:|---|---|---|
| D-P04 | P1 | Pairwise 최소 비교 횟수·평가자 자격은? | Challenge별 설정 | Batch 10 |
| D-P06 | P2 | Proof Day·실증 지원 범위와 비용은? | 프로그램별 별도 조건 | Sponsor 협의 전 |
| D-P07 | P1 | 팀 제출 권리 동의 모델은? | MVP 비활성 | 팀 기능 전 |
| D-UX07 | P1 | Public Gallery를 Closed Beta에서 활성화할 것인가? | 기본 비활성, consent workflow 확인 후 | Beta 전 |
| D-UX08 | P1 | PDF·3-Slide export 형식과 접근성 기준은? | tagged PDF 가능성 검토 | Feature 구현 전 |
| D-UX09 | P1 | Public Idea publication 승인 주체와 해제 절차는? | Participant consent + Manager approval | Batch 8·9 |
| D-UX10 | P2 | 음성 입력을 언제 지원할 것인가? | MVP 제외 | P2 |

## 7. 권리·보안 결정 — Open

| ID | 등급 | 질문 | 권장 기본안 | 결정 기한 |
|---|---:|---|---|---|
| D-S02 | P0 | 운영자 Draft 예외 열람 절차와 승인 주체는? | 지원·안전 목적 최소 권한 + audit | Batch 5·9 |
| D-S03 | P1 | AI Provider field allowlist의 법률·운영 세부 승인 | Batch 6 최소필드·redaction 확정, Batch 9 법률 검토 | Batch 9 |
| D-S04 | P1 | Idea·대화·평가 보존기간은? | 법률 검토 후 | Closed Beta 전 |
| D-S05 | P1 | 철회·삭제 시 checkpoint·audit 처리 방식은? | 식별정보 삭제 + 최소 audit | Batch 5·9 |

## 8. 스폰서십 결정 — Open

| ID | 등급 | 질문 | 권장 기본안 | 결정 기한 |
|---|---:|---|---|---|
| D-SP01 | P0 | JDC 관계 공식 상태는? | `proposal` 유지 | 공식 회신 시 |
| D-SP02 | P0 | 명칭·로고 사용 승인 범위는? | 승인 전 제품 UI 비노출 | 공식 협약 전 |
| D-SP05 | P1 | Sponsor 지원 Pilot의 계약·결과물 권리는? | Idea별 별도 계약 | Pilot 전 |

## 9. 결정 기록 방식

1. 확정 목록으로 이동
2. 관련 ADR 또는 Product Decision 작성
3. 관련 문서·enum·schema·route 갱신
4. 코드가 있으면 migration·deprecation 계획
5. 권한·권리 변경 테스트 추가
