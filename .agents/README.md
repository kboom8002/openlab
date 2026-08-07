---
doc_id: WOL-AGENT-003
title: Antigravity Customization Index
status: approved
authority: informative
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-AGENT-001
affects:
  - .agents/**
supersedes: null
---

# Antigravity Customization Index

## Rules

Workspace Rules are stored in `.agents/rules/`. Antigravity activation settings are configured in the Customizations panel. Each rule file states its recommended activation mode.

| Rule | Recommended activation |
|---|---|
| `00-core-principles.md` | Always On |
| `10-product-domain.md` | Model Decision |
| `20-nextjs-typescript.md` | Glob: `src/**/*.ts,src/**/*.tsx` |
| `30-supabase-security.md` | Glob: `supabase/**,src/lib/supabase/**,src/server/**` |
| `40-ai-langgraph.md` | Glob: `src/ai/**,contracts/prompts/**,contracts/json-schema/**` |
| `50-ui-accessibility.md` | Glob: `src/**/*.tsx,src/**/*.css` |
| `60-testing-quality.md` | Glob: `**/*.test.*,**/*.spec.*,tests/**,supabase/tests/**` |
| `70-git-artifacts.md` | Always On |

## Workflows

Workflow filename이 slash command가 된다.

- `/bootstrap-context`
- `/plan-feature`
- `/implement-task`
- `/review-diff`
- `/verify-ui`
- `/migrate-database`
- `/evaluate-ai`
- `/prepare-release`

## Artifact templates

`.agents/artifacts/templates/`의 템플릿을 복사해 작업별 보고서를 작성한다. 실제 보고서는 `.agents/artifacts/runs/<task-id>/`에 저장하는 것을 권장한다.

## Permission setup

`docs/00-governance/antigravity-permissions.md`와 `contracts/antigravity/project-permissions.example.json`을 참고해 Antigravity Project 권한을 설정한다. 예시 JSON을 자동 로드된 설정 파일로 가정하지 말고 `/permissions` 또는 Project settings를 통해 적용한다.
