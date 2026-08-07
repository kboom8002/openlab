---
doc_id: WOL-GOV-001
title: Source of Truth Map
status: approved
authority: canonical
owner: product
last_verified: 2026-07-31
depends_on:
  - WOL-INDEX-001
affects:
  - docs/**
  - contracts/**
  - src/**
supersedes: null
---

# Source of Truth Map

## 1. 목적

WELLB OPENLAB 기획·프로토타입·제안서와 repo 문서의 역할을 구분하고, 구현 시 어떤 자료를 정책·계약·예시로 사용할지 정한다.

## 2. 입력 자산 인벤토리

| 자산 | 분류 | 사용 목적 | 권위 | 주의사항 |
|---|---|---|---|---|
| WELLB OPENLAB 제품 기획 Batch 1~4 | 기획 원천 | 제품 정의, UX, 평가, Idea Passport | 참고 | Canonical docs가 우선 |
| 클릭형 HTML prototype | UX prototype | 화면 흐름·카피 참고 | 중간 | 기능·보안·route 계약 아님 |
| JDC 월간 Challenge prototype | sponsorship prototype | 월간 UI 참고 | 중간 | 공식 승인 전 사실 아님 |
| 서비스 소개서 | external overview | 세일즈 메시지 | 중간 | 기술 계약 아님 |
| 기관 스폰서십 제안서 | proposal | 가치·역할 제안 | 중간 | 공식 협약 아님 |
| WellB Company logo | brand asset | 로고·색상 | 높음 | 승인 범위 별도 관리 |

## 3. 현재 Canonical Sources

| 도메인 | canonical location | 상태 |
|---|---|---|
| 제품 비전·범위·지표 | `docs/01-product/` | Batch 2 승인 |
| 용어·상태·Idea Passport | `docs/02-domain/` | Batch 2 승인 |
| machine-readable domain | `contracts/domain/` | Batch 2 승인 |
| IA·route·component·page | `docs/03-ux/` | Batch 3 승인 |
| machine-readable UX | `contracts/ux/` | Batch 3 승인 |
| 아키텍처 | `docs/04-architecture/` | Batch 4 예정 |
| DB·RLS | `docs/05-data/` + `supabase/migrations/` | Batch 5 예정 |
| AI Graph·Prompt | `docs/06-ai/` + `contracts/prompts/` | Batch 6 예정 |
| API | `docs/07-api/` + `contracts/api/` | Batch 7 승인 |
| 보안·권리 상세 | `docs/08-security/` + `contracts/security/` | Batch 9 승인 |
| 테스트·AI Eval | `docs/09-quality/` + `contracts/evals/` | Batch 10 승인 |
| 운영·배포 | `docs/10-operations/` + `contracts/operations/` | Batch 11 승인 |
| 구현 Feature | `docs/11-project/features/` + `contracts/features/` | Batch 8 승인 |

## 4. Authority Order

1. 승인된 법률·계약·기관 협약
2. 승인된 권리·보안 정책
3. Domain Canon과 machine-readable contracts
4. Route·Page·접근성 UX Canon
5. 승인된 ADR·데이터·AI·API 계약
6. 승인된 Feature Contract
7. 구현 코드와 migration
8. 프로토타입·기획 초안

UI 카피가 권리·Sponsor·평가 정책과 충돌하면 Domain Canon이 우선한다. Route와 Page behavior가 다르면 구현하지 않고 둘을 함께 수정한다.

## 5. UX 내부 Authority

1. `accessibility-contract.md`
2. 해당 Page Spec
3. `route-map.md`와 `contracts/ux/routes.yaml`
4. `loading-empty-error-states.md`
5. `interaction-feedback.md`
6. `component-inventory.md`
7. `design-tokens.md`
8. Prototype

## 6. 사실·가정·제안 구분

### Fact

- 승인된 제품·도메인·UX 원칙
- 실제 보유 브랜드 자산
- 구현·테스트로 확인된 기능
- 공식 체결 계약·승인·파트너십

### Assumption

- 예상 참여자·제출·Pilot 수
- 기술 비용·응답시간
- 운영 인력·파트너 확보

### Proposal

- JDC Anchor Sponsor 모델
- 12개월 주제
- 예산·일정·성과 목표

### Prototype Data

- 가상 참가자·일정·점수·Idea

## 7. JDC 경계

공식 협약 전 관계 상태는 `proposal`이다. 공식 로고, `Sponsored by JDC`, 공식·공동주최 표현은 사용하지 않는다.

## 8. 구현팀 Stop Rule

- P0 Open Decision이 직접 영향
- 권리·visibility와 요구사항 충돌
- Sponsor가 비공개 데이터 접근을 요구
- enum·route·상태 label이 문서와 계약에서 다름
- AI가 사용자 확인 없이 Passport를 확정
- 평가 중 Submitted Version 변경 필요
- 개인정보 보존·삭제가 미결정 상태에서 production 처리 필요
