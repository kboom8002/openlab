---
doc_id: WOL-AGENT-001
title: WELLB OPENLAB Agent Operating Contract
status: approved
authority: normative
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-INDEX-001
  - WOL-GOV-001
  - WOL-GOV-003
  - WOL-GOV-006
  - WOL-PROD-001
  - WOL-DOM-001
affects:
  - src/**
  - supabase/**
  - contracts/**
  - docs/**
supersedes: null
---

# WELLB OPENLAB Agent Operating Contract

이 문서는 WELLB OPENLAB 레포에서 작업하는 Antigravity 및 기타 AI coding agent의 최상위 작업 계약이다.

## 1. 제품 정의

WELLB OPENLAB은 사용자가 생활·업무·지역사회에서 발견한 문제와 아이디어를 AI 코치의 도움으로 구조화·시각화하고, AI·사용자·현장 전문가의 다층 검토를 거쳐 실증 가능한 제안으로 발전시키는 AI 증강 오픈이노베이션 플랫폼이다.

## 2. 작업 시작 전 필수 읽기

1. `AGENTS.md`
2. `docs/INDEX.md`
3. `docs/00-governance/source-of-truth-map.md`
4. `docs/00-governance/stack-lock.md`
5. `docs/00-governance/open-decisions.md`
6. `docs/01-product/`의 관련 문서
7. `docs/02-domain/`과 `contracts/domain/`의 관련 계약
8. `docs/05-data/`와 `contracts/data/`의 관련 Schema·RLS·Storage 계약
9. `docs/06-ai/README.md`와 관련 `contracts/ai/`, `contracts/prompts/`, `contracts/json-schema/`
10. 과업이 지정한 Feature Contract·ADR·API 계약
11. 관련 `.agents/rules/`

프로토타입은 UX 참고자료이며 제품·보안·데이터·권리 계약을 대체하지 않는다.

## 3. 절대 불변 조건

- JDC와의 관계는 공식 협약 전까지 `proposal` 또는 `under_discussion`으로만 표현한다.
- 승인 전 JDC 공식 로고·공식 후원·공동주최 표현을 제품 UI나 fixture에 넣지 않는다.
- 아이디어 권리는 원칙적으로 제출자에게 유지한다.
- 제출만으로 WellB Company·Sponsor·운영기관에 소유권이 이전되지 않는다.
- Sponsor는 Draft와 비공개 Idea 원문에 자동 접근하지 않는다.
- AI 평가는 최종 판정이 아니며 AI 점수만으로 자동 탈락시키지 않는다.
- 사용자 확인 전 AI Suggestion을 canonical Idea Passport에 확정하지 않는다.
- Submitted Version은 불변이며 평가는 Version ID를 참조한다.
- 가장 제한적인 권한과 비파괴적 동작을 기본값으로 삼는다.

## 4. Canonical domain values

- 상태·역할·visibility·claim type: `contracts/domain/domain-enums.yaml`
- Idea Passport: `contracts/domain/idea-passport.contract.yaml`
- Evaluation weights and Gate: `contracts/domain/evaluation-model.yaml`
- Sponsor access: `contracts/domain/sponsorship-access-policy.yaml`

새 enum을 코드에만 추가하지 않는다.

## 5. 기술 경계

- Next.js App Router와 TypeScript strict
- Server Component 기본, 최소 Client Component
- 일반 mutation은 Server Action 우선, AI streaming·webhook은 Route Handler
- Supabase Auth·PostgreSQL·Storage·RLS
- `public`의 exposed table은 모두 RLS required; Sponsor는 read model only
- Submitted Idea Version과 제출된 Evaluation은 immutable
- 공개 schema의 사용자 데이터는 RLS 없이 배포 금지
- Service Role key를 브라우저·Client Component·로그에 노출 금지
- AI provider interface와 중앙 Model Registry
- Idea Studio Graph와 Evaluation Graph 분리
- AI output은 Zod 또는 JSON Schema 검증
- Tailwind token과 단일 shadcn primitive

## 6. 작업 절차

### 시작

1. `git status`, branch와 worktree 확인
2. Task ID, 목표, 허용·금지 경로, Acceptance Criteria 확인
3. 관련 canonical docs와 open decision 확인
4. 데이터·권리·평가·AI 영향이 있으면 implementation plan 작성
5. P0 미결정이나 계약 충돌이면 Stop Report

### 구현

- 승인 범위 안에서 최소 변경
- UI, schema, migration, RLS, prompt, test 동시 변경 여부 확인
- 기존 migration과 Submitted Version을 소급 수정하지 않음
- 실제 검증 없이 agent 판단을 사실로 간주하지 않음

### 완료

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

DB·RLS·AI·UI 변경이면 추가 검증을 수행한다. 실행하지 못한 검증은 `NOT_RUN` 또는 `BLOCKED`로 기록한다.

## 7. 금지 행위

- 승인 없이 패키지 설치·major upgrade·배포·production migration
- `.env*`, Service Role key, 토큰, 개인정보 출력
- destructive Git, force push, 광범위 삭제
- 다른 사용자의 Draft·비공개 Idea 우회 조회
- RLS 대신 UI 숨김으로 권한 처리
- page 파일에서 SQL·LLM·복잡한 도메인 로직 직접 작성
- 근거 없는 통계·예산·성과·파트너 상태 생성
- 테스트 실패를 무시하고 완료 선언
- 요청 범위 밖 리팩터링

## 8. 필수 Artifact

- 구현 전: implementation plan
- 구현 후: implementation report, test report
- UI: UI verification report
- DB: migration report
- AI: AI evaluation report
- release: release report

## 9. Stop rule

다음이면 추측으로 진행하지 않는다.

- Open Decision P0가 직접 영향
- 역할·visibility·권리·Sponsor 접근이 불명확
- 문서와 machine-readable contract가 불일치
- AI 평가가 최종선발 또는 권리에 영향
- 평가 중 Submitted Version 변경 필요
- production 데이터·외부 서비스·비밀 접근 필요
- 허용 경로 밖 수정이 필수
