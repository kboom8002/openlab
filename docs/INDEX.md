---
doc_id: WOL-INDEX-001
title: WELLB OPENLAB Documentation Index
status: approved
authority: canonical
owner: product-engineering
last_verified: '2026-07-31'
depends_on: []
affects:
- docs/**
- .agents/**
- contracts/**
- supabase/**
supersedes: null
---

# WELLB OPENLAB Documentation Index

## 1. 현재 배치

**Batch 14 — Production Executable Scaffold·Delivery Gates**

Batch 0~13 계약 위에 Next.js·Supabase 실행 Scaffold, 첫 RLS Vertical Slice, CI·security scan·production approval gate를 추가했다.

## 2. Agent Reading Order

1. `AGENTS.md`
2. `docs/INDEX.md`
3. `docs/00-governance/source-of-truth-map.md`
4. `docs/00-governance/stack-lock.md`
5. `docs/00-governance/open-decisions.md`
6. 관련 Product·Domain 문서
7. 관련 UX Page Spec
8. 관련 System Architecture·ADR
9. 관련 Data·RLS 문서
10. `docs/06-ai/README.md`
11. 관련 AI 문서와 `contracts/ai/`, `contracts/prompts/`, `contracts/json-schema/`
12. 이후 Batch의 API·Feature·Security·Quality Contract

## 3. Canonical Document Groups

- Governance: `docs/00-governance/`
- Product·Domain: `docs/01-product/`, `docs/02-domain/`, `contracts/domain/`
- UX: `docs/03-ux/`, `contracts/ux/`
- Architecture·ADR: `docs/04-architecture/`, `docs/adr/`, `contracts/architecture/`
- Data: `docs/05-data/`, `contracts/data/`, `supabase/`
- AI·LangGraph: `docs/06-ai/`, `contracts/ai/`, `contracts/prompts/`, `contracts/json-schema/`
- API: `docs/07-api/`, `contracts/api/`
- Security·Rights: `docs/08-security/`, `contracts/security/`
- Quality·AI Evals: `docs/09-quality/`, `contracts/evals/`
- Operations: `docs/10-operations/`, `contracts/operations/`
- Feature Contracts: `docs/11-project/features/`, `contracts/features/`
- Antigravity Skills: `.agents/skills/`, `.agents/workflows/`, `.agents/artifacts/`

## 4. Authority Order

1. 승인된 법률·계약·기관 협약
2. 권리·보안·Domain Canon
3. 승인된 ADR와 Architecture Canon
4. Data·RLS·Storage Canon
5. AI Graph·Prompt·Schema·Safety Canon
6. Route·Page·접근성 UX Canon
7. API 계약
8. Feature Contract
9. migration·구현 코드
10. prototype·기획 초안

## 5. Current Canonical Decisions

- 복수 Draft, final submission 기본 1개·설정 1~3개
- visibility 4종, Submitted Version 불변
- AI 25 / Pairwise 25 / Expert 50 reference score
- Sponsor aggregate·consented Showcase only
- App Router·Node runtime·single repo
- Supabase PostgreSQL System of Record·RLS required
- Postgres durable LangGraph saver·isolated checkpoint schema
- OpenAI primary provider adapter·cross-provider fallback disabled
- application model key·prompt/schema registry
- structured output repair 1회·typed fallback
- human interrupt와 user confirmation 후 canonical 적용
- hidden reasoning 비노출·PII 최소 전송

## 6. Planned Batches

| Batch | 산출물 |
|---|---|
| 0 | Ground Truth·Stack Lock — 완료 |
| 1 | Antigravity Bootstrap — 완료 |
| 2 | Product·Domain Canon — 완료 |
| 3 | UX·IA·Page Spec — 완료 |
| 4 | System Architecture·ADR — 완료 |
| 5 | Supabase ERD·RLS·Storage — 완료 |
| 6 | LangGraph·Prompt·AI Eval — 완료 |
| 7 | Server Action·Route Handler·Error 상세 |
| 8 | Feature Contract·Task Card |
| 9 | 보안·개인정보·권리 상세 |
| 10 | 테스트·Golden Set·Quality Gate |
| 11 | 배포·운영·Monthly Runbook |
| 12 | Antigravity Skills·Artifact 자동화 |
| 13 | 통합 QA·Agent onboarding test |

Batch 0~14 완료. Production 배포는 WOL-OPS-003의 자동·사람 승인 Gate를 모두 충족해야 한다.

## 7. Update Discipline

- graph·node·prompt·model·schema key를 여러 곳에 독립 정의하지 않는다.
- AI 변경은 registry·prompt·schema·eval report를 함께 갱신한다.
- provider raw payload와 hidden reasoning을 제품 데이터로 저장하지 않는다.
- 구현 완료는 test ID와 verification artifact가 있어야 한다.
