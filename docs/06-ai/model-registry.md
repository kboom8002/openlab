---
doc_id: WOL-AI-010
title: Model Registry and Selection Policy
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-009
- WOL-AI-017
affects:
- src/ai/models/**
- contracts/ai/model-registry.yaml
supersedes: null
---

# Model Registry and Selection Policy

## 1. Model key

코드는 provider model ID가 아니라 안정적인 application model key를 사용한다.

```text
coach.fast
coach.quality
synthesis.quality
preflight.standard
evaluation.reference
moderation.default
```

## 2. Registry 필드

- model key
- provider
- provider model ID 또는 alias
- supported capabilities
- structured output mode
- timeout·token limits
- data handling profile
- cost class
- activation status
- eval baseline ID

## 3. 선택 정책

- 짧은 분류·질문: `coach.fast`
- Passport 종합·평가: quality profile
- safety moderation: dedicated moderation profile
- 사용자가 model을 직접 선택하지 않는다.

## 4. Pinning

평가 reproducibility가 필요한 model은 snapshot 또는 deployment revision을 pin한다. alias 변경 시 baseline regression을 수행한다.

## 5. Model 교체 Gate

- structured schema pass rate
- golden conversation quality
- safety pass rate
- latency·cost
- Korean clarity
- AI·expert calibration

모든 기준을 충족한 뒤 registry activation을 변경한다.
