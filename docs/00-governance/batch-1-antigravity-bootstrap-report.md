---
doc_id: WOL-GOV-009
title: Batch 1 Antigravity Bootstrap Report
status: approved
authority: informative
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-AGENT-001
  - WOL-GOV-008
affects:
  - .agents/**
  - contracts/antigravity/**
  - contracts/task-cards/**
supersedes: null
---

# Batch 1 Antigravity Bootstrap Report

## 1. 생성된 운영 계약

- `AGENTS.md`: 최상위 작업·보안·완료 계약
- `GEMINI.md`: Antigravity workspace 진입점
- `.agents/rules/`: 제품, Next.js, Supabase, AI, UI, 테스트, Git 규칙 8종
- `.agents/workflows/`: 계획, 구현, 검토, UI, DB, AI, release workflow 8종
- `.agents/artifacts/templates/`: 계획·구현·테스트·UI·migration·AI·release 템플릿 7종
- `antigravity-permissions.md`: Project 권한 정책
- `project-permissions.example.json`: `/permissions` 적용용 검토 예시
- `task-card-template.yaml`: 구현 과업 입력 표준

## 2. 안전성 원칙

- Workspace Rule은 `.agents/rules/`에 위치한다.
- Workflow는 Markdown 파일이며 slash command로 호출한다.
- 각 Rule과 Workflow는 12,000자 이하로 유지한다.
- 권한 충돌 우선순위는 `deny > ask > allow`다.
- broad `command(*)` ask가 세부 allow를 덮지 않도록 예시를 설계했다.
- 자동 허용은 검사·테스트 중심이고, install·migration·deploy·external action은 ask다.
- destructive Git, secret, production reset은 deny다.

## 3. Agent 실행 흐름

```text
/bootstrap-context
→ /plan-feature
→ 승인
→ /implement-task
→ /review-diff
→ /verify-ui 또는 /migrate-database 또는 /evaluate-ai
→ /prepare-release
```

## 4. QA 결과

- Rule 8개와 Workflow 8개가 생성됐다.
- 모든 Rule·Workflow 파일은 12,000자 미만이다.
- Markdown frontmatter Doc ID 중복이 없다.
- 기존 Batch 0 canonical 문서를 보존했다.
- JDC 공식성, 아이디어 권리, AI 최종판정 금지, 스폰서 비공개 원문 접근 금지 규칙을 반복 검증했다.

## 5. Antigravity onboarding test

### Test A — context only

> WELLB OPENLAB의 제품 정의, JDC 관계의 공식 상태, 기술 스택, P0 미결정 사항을 근거 문서와 함께 요약하라. 코드를 수정하지 마라.

### Test B — feature planning

> 로그인 사용자가 활성 월간 챌린지에서 Draft Idea를 생성하는 기능을 계획하라. `/bootstrap-context`와 `/plan-feature`를 사용하고 코드를 수정하지 마라.

통과 기준:

- `AGENTS.md`와 canonical docs를 읽는다.
- JDC를 확정 스폰서로 표현하지 않는다.
- RLS, ownership, visibility, AI provider data boundary를 언급한다.
- implementation plan Artifact를 만든다.
- 승인 전 코드·migration·dependency를 수정하지 않는다.

## 6. 다음 Batch

Batch 2는 제품·도메인 Canon을 생성한다.

- product vision and scope
- personas and jobs
- monthly challenge model
- Idea Passport
- idea lifecycle
- evaluation model
- sponsorship model
- rights and visibility
