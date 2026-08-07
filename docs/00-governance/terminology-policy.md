---
doc_id: WOL-GOV-004
title: Terminology Policy
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-001
  - WOL-DOM-001
affects:
  - docs/**
  - src/**
  - contracts/**
supersedes: null
---

# Terminology Policy

## 1. 브랜드 표기

| 올바른 표기 | 용도 | 금지·비권장 |
|---|---|---|
| WELLB OPENLAB | 제품 브랜드 공식 표기 | WellbOpenLab, Wellb Openlab 혼용 |
| WellB Company | 모기업 영문명 | WELLB company |
| 웰비컴퍼니 | 모기업 한글명 | 웰비 컴퍼니 혼용 |
| AI-Augmented Open Innovation Platform | 영문 설명 | AI 공모전 플랫폼으로 축소 |

코드·package·repo 식별자는 `wellb-openlab`을 사용한다.

## 2. Canonical domain terminology

최종 도메인 정의와 enum은 다음을 단일 진실 공급원으로 사용한다.

- `docs/02-domain/domain-glossary.md`
- `contracts/domain/domain-enums.yaml`

본 문서는 브랜드·카피의 일관성을 관리하며 enum을 중복 정의하지 않는다.

## 3. 핵심 카피 용어

| 용어 | 사용 원칙 |
|---|---|
| Challenge | 사용자 화면의 기본 프로그램 명칭 |
| Monthly Challenge | 반복 프로그램의 월별·회차별 단위 |
| Idea Studio | AI 대화와 구조화 문서를 결합한 작성 공간 |
| Idea Passport | 표준 아이디어 산출물 |
| AI Suggestion | 사용자가 수용·수정·거절할 수 있는 제안 |
| Preflight | 제출 전 논리·근거·안전·권리 검수 |
| Pairwise Evaluation | 익명 두 Idea 비교 평가 |
| Pilot-ready | 실증 준비 후보. 실제 Pilot 확정이 아님 |
| Proof Day | 실증 조건을 검토하는 세션 |
| Pilot | 기간·가정·성공기준을 가진 현장 실증 |

## 4. 역할 표시

코드 role key는 `domain-enums.yaml`을 사용한다. UI 한글 표시:

- participant: 참가자
- evaluator: 사용자·현장 평가자
- expert: 전문가 평가자
- challenge_manager: 챌린지 운영자
- sponsor_viewer: 스폰서 열람자
- admin: 관리자
- service_worker: 시스템 작업자

## 5. 주장 표현

- 확인된 내용: `확인된 사실`
- 당사자 진술: `직접 경험`
- 미검증 판단: `가정`
- 실현 시 변화: `기대효과`

`예상`, `확정`, `검증됨`을 혼용하지 않는다.

## 6. Sponsor 표현

공식 협약 전 허용:

- JDC 스폰서십 제안안
- JDC와 협의를 전제로 한 모델
- Anchor Sponsor 후보

공식 협약 전 금지:

- Sponsored by JDC
- JDC 공식 프로그램
- JDC 공동주최
- JDC 로고 무단 사용

## 7. 금지 표현

- AI가 객관적으로 최종 선정한다.
- AI가 아이디어 성공을 보장한다.
- 제출하면 아이디어가 법적으로 보호된다.
- 스폰서가 모든 아이디어를 소유한다.
- 접근 가능, 안전함 등 조건 없는 단정
- 사회적 가치가 크므로 실행 가능성이 높다.
