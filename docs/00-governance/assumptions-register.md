---
doc_id: WOL-GOV-002
title: Assumptions Register
status: approved
authority: canonical
owner: product-operations
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-001
affects:
  - docs/01-product/**
  - docs/04-architecture/**
  - docs/10-operations/**
supersedes: null
---

# Assumptions Register

## 1. 관리 원칙

- 가정은 사실처럼 UI·소개서·코드 주석에 표현하지 않는다.
- 가정마다 검증 방법, 책임자, 결정 시점을 둔다.
- 검증 실패 시 영향을 받는 Feature와 문서를 갱신한다.

## 2. 제품·시장 가정

| ID | 가정 | 영향 | 검증 방법 | 상태 |
|---|---|---|---|---|
| A-P01 | 사용자는 7단계 AI 코칭을 통해 자유서술보다 완성도 높은 제안을 만들 수 있다. | Idea Studio 핵심 가치 | 클로즈드 베타 전후 루브릭 비교 | 검증 필요 |
| A-P02 | 월별 주제 챌린지가 일회성 공모보다 재방문과 레퍼런스 축적에 유리하다. | 월간 운영 모델 | 3개월 코호트 지표 | 검증 필요 |
| A-P03 | 사용자 쌍대평가는 단순 좋아요보다 인기 편향을 줄인다. | 평가 UX | 편향·일치도 분석 | 검증 필요 |
| A-P04 | 기관은 단순 아이디어 수보다 Pilot-ready 후보와 인사이트 보고서에 비용을 지불한다. | BM·스폰서십 | 기관 인터뷰·유료 파일럿 | 검증 필요 |
| A-P05 | 참가자는 AI 기여 내역과 권리 조건이 투명하면 아이디어 제출에 신뢰를 느낀다. | 동의·Provenance | 사용자 조사 | 검증 필요 |

## 3. 운영 가정

| ID | 가정 | 영향 | 검증 방법 | 상태 |
|---|---|---|---|---|
| A-O01 | 월 1개 메인 챌린지를 WellB 운영팀이 관리할 수 있다. | 운영 인력 | 월간 runbook 시뮬레이션 | 검증 필요 |
| A-O02 | 챌린지당 최소 3인의 전문가 평가자를 확보할 수 있다. | 전문가 평가 | 파트너 풀 구축 | 검증 필요 |
| A-O03 | 월별 상위 아이디어 중 일부를 30일 실증으로 연결할 파트너가 존재한다. | Pilot-ready 정의 | 파트너 인터뷰·LOI | 검증 필요 |
| A-O04 | 스폰서 성과보고는 개인 아이디어 원문보다 집계·대표사례 중심으로 충분하다. | Sponsor Portal | 스폰서 요구 인터뷰 | 검증 필요 |

## 4. 기술 가정

| ID | 가정 | 영향 | 검증 방법 | 상태 |
|---|---|---|---|---|
| A-T01 | Next.js Route Handler에서 일반 Idea Coach 요청을 허용 응답시간 내 처리할 수 있다. | AI runtime | Vertical Slice 부하 테스트 | 검증 필요 |
| A-T02 | LangGraph checkpoint를 Supabase Postgres와 안전하게 통합할 수 있다. | Graph persistence | Spike·복구 테스트 | 검증 필요 |
| A-T03 | JSON Schema 기반 출력으로 Idea Passport 필드를 안정적으로 갱신할 수 있다. | AI contract | Golden set schema pass rate | 검증 필요 |
| A-T04 | Supabase RLS로 참가자·평가자·운영자·스폰서 권한을 충분히 분리할 수 있다. | 보안 | 허용·거부 SQL 테스트 | 검증 필요 |
| A-T05 | 월간 챌린지 MVP 트래픽은 Supabase·Vercel 기본 구성에서 처리 가능하다. | 비용·배포 | 예상 부하 모델링 | 검증 필요 |

## 5. AI 품질 가정

| ID | 가정 | 영향 | 검증 방법 | 상태 |
|---|---|---|---|---|
| A-AI01 | AI가 한 번에 한 질문 원칙을 안정적으로 지킨다. | UX | 골든 대화 eval | 검증 필요 |
| A-AI02 | AI가 사용자 사실과 추론을 구분할 수 있다. | 신뢰·Provenance | field-level eval | 검증 필요 |
| A-AI03 | AI 평가와 전문가 평가가 완전히 일치하지 않아도 유용한 사전 검토 자료가 된다. | 평가 모델 | 상관·불일치 분석 | 검증 필요 |
| A-AI04 | AI가 민감정보·근거 없는 수치·과장된 효과를 실용적 수준으로 감지한다. | Preflight | safety set | 검증 필요 |

## 6. 스폰서십 가정

| ID | 가정 | 영향 | 검증 방법 | 상태 |
|---|---|---|---|---|
| A-S01 | JDC 또는 유사 기관이 연간 Anchor Sponsor 모델에 관심을 가질 수 있다. | GTM | 공식 제안·협의 | 제안 단계 |
| A-S02 | 월별 주제가 기관의 사회적 가치·혁신 의제와 정합할 수 있다. | 주제 로드맵 | 공동 워크숍 | 검증 필요 |
| A-S03 | 스폰서는 비공개 아이디어 원문이 아닌 승인된 사례·집계 데이터만으로도 성과를 설명할 수 있다. | 권한·보고 | 기관 요구 확인 | 검증 필요 |
