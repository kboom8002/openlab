---
doc_id: WOL-QA-002
title: AI Golden Set and Gates
status: approved
authority: canonical
owner: ai-quality
last_verified: 2026-08-01
depends_on: [WOL-AI-015, WOL-QA-001]
affects: [contracts/evals/**]
supersedes: null
---

# AI Golden Set and Gates

Golden cases는 정상·모호·저정보·PII·prompt injection·권리·schema failure·low confidence를 포함한다. 평가축은 schema validity, groundedness, instruction adherence, uncertainty, safety/privacy, actionability다. 판정은 deterministic validator 우선, rubric reviewer 보조다.

승인 기준은 회귀 비교로 관리한다. 안전·개인정보 critical case는 100% 통과가 필수이며 일반 품질 임계치는 실제 baseline 측정 전 `baseline_required`다. 모델·prompt·schema 변경은 동일 set 재실행과 diff report가 필요하다.

