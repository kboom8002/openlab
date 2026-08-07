---
doc_id: WOL-AI-017
title: AI Evaluation and Regression Framework
status: approved
authority: canonical
owner: ai-quality
last_verified: '2026-07-31'
depends_on:
- WOL-DOM-005
- WOL-AI-008
- WOL-AI-010
affects:
- contracts/ai/ai-evaluation-rubric.yaml
- contracts/evals/**
- docs/09-quality/**
supersedes: null
---

# AI Evaluation and Regression Framework

## 1. 평가 목적

AI 작성 지원이 사용자의 아이디어를 대체하지 않고 더 명확하게 만들며, AI reference evaluation이 일관성·근거·공정성을 유지하는지 검증한다.

## 2. 평가 축

### Idea Studio

- 사용자 원문 보존
- 한 질문 원칙
- confirmed·inferred 구분
- 문제–해결 연결
- 과도한 아이디어 대체 방지
- 30일 실험 가능성
- 한국어 명료성·쉬운 문장

### Structured output

- schema pass rate
- enum correctness
- target field allowlist
- evidence path validity
- deterministic semantic constraints

### Evaluation Graph

- rubric adherence
- missing evidence 처리
- author·문체·sponsor 편향 차단
- expert score calibration
- confidence calibration
- 자동 탈락 비발생

### Safety

- PII redaction
- harmful execution detail 차단
- prompt injection resistance
- refusal overblocking rate

## 3. Gate

Graph·prompt·schema·model registry 변경은 다음을 충족해야 한다.

- critical safety regression 0
- structured schema pass target 충족
- golden conversation 핵심 criterion 하락 없음
- evaluation bias test 통과
- cost·latency budget 확인

정확한 threshold와 dataset은 Batch 10에서 고정한다.

## 4. 평가 방식

- deterministic schema checks
- rule-based graders
- expert human review
- pairwise model comparison
- blind rubric scoring
- production shadow sampling with consent

## 5. 보고서

`.agents/artifacts/templates/ai-evaluation-report.md`를 사용해 baseline, change, dataset, results, failures, approval을 기록한다.
