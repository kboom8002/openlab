---
doc_id: WOL-AI-001
title: AI System Overview
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-PROD-001
- WOL-DOM-003
- WOL-ARCH-007
- WOL-DATA-010
affects:
- src/ai/**
- src/app/api/ai/**
- contracts/ai/**
supersedes: null
---

# AI System Overview

## 1. 목적

AI를 여러 챗봇의 집합이 아니라 하나의 Idea Studio 경험과 독립된 Evaluation 서비스로 제공하기 위한 시스템 경계를 정의한다.

## 2. 시스템 구성

```text
Participant UI
  ↓
AI Route Handler
  ↓ auth · ownership · quota · input validation
AI Orchestrator
  ├─ IdeaStudioGraph
  │  ├─ intake
  │  ├─ problem_framing
  │  ├─ people_context
  │  ├─ solution_coach
  │  ├─ feasibility
  │  ├─ impact
  │  ├─ experiment
  │  ├─ passport_synthesis
  │  └─ preflight
  └─ EvaluationGraph
     ├─ eligibility_guard
     ├─ rubric_scoring
     ├─ evidence_check
     ├─ confidence_calibration
     └─ human_review_gate
        ↓
Provider Adapter → Model Registry → AI API
        ↓
Structured Output Validation
        ↓
AgentRun · Checkpoint · Provenance · Usage
```

## 3. Runtime 경계

- Graph orchestration과 provider SDK는 server-only다.
- Client는 typed event stream과 pending suggestion만 받는다.
- AI node는 canonical Passport row를 직접 수정하지 않는다.
- 사용자 accept·edit·reject mutation만 canonical content를 변경한다.
- 평가 결과는 submitted `idea_version_id`에 고정한다.

## 4. 책임 분리

| 계층 | 책임 | 금지 |
|---|---|---|
| Route Handler | 인증, 입력 검증, stream 연결 | prompt 직접 조립 |
| Orchestrator | graph 선택, context 구성 | DB 권한 우회 |
| Graph Node | 한 가지 도메인 작업 | UI 문구·최종 상태 변경 |
| Provider Adapter | API 호출·사용량·오류 정규화 | 도메인 판단 |
| Schema Layer | 출력 검증·repair | 자유 텍스트 파싱 |
| Application Service | suggestion 저장·적용 | provider SDK 직접 호출 |

## 5. 데이터 최소화

Provider에는 현재 node 수행에 필요한 allowlist field만 보낸다. 이메일, 전화번호, 상세주소, sponsor-only field, 평가자 신원, signed URL, 다른 사용자의 content는 제외한다.

## 6. 운영 모드

- `interactive`: Idea Studio, 짧은 preflight
- `deferred`: 평가, 대량 시각화, 리포트
- `test`: deterministic fixture provider

## 7. Acceptance Criteria

- provider 교체가 UI와 graph state schema를 변경하지 않는다.
- 모든 AI 결과에 source·confidence·version이 존재한다.
- draft와 submitted evaluation 입력 경계가 코드와 계약에서 분리된다.
- PII field allowlist 위반이 자동 검사된다.
