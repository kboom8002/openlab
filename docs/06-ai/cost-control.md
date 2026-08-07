---
doc_id: WOL-AI-015
title: AI Cost, Quota and Performance Control
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-010
- WOL-PROD-004
affects:
- src/ai/usage/**
- contracts/ai/cost-policy.yaml
supersedes: null
---

# AI Cost, Quota and Performance Control

## 1. 목표

비용을 줄이기 위해 품질·접근성·안전을 훼손하지 않으면서 request·token·latency를 관리한다.

## 2. 제어 수단

- stage별 최소 context builder
- conversation rolling summary
- model profile routing
- output length cap
- duplicate request idempotency
- challenge·user quota
- deferred evaluation batch
- cached immutable challenge context

## 3. 기본 예산 단위

- run cost
- idea completion cost
- submitted idea evaluation cost
- challenge monthly AI cost
- sponsor report generation cost

## 4. Quota

MVP quota는 hard-coded하지 않고 configuration으로 관리한다. quota 초과 시 작성 내용을 잃지 않고 직접 작성 모드를 제공한다.

## 5. 관측 지표

- input·output·cached token
- latency p50·p95
- schema repair rate
- retry rate
- completion per idea
- cost per submitted idea
- model profile별 quality baseline

## 6. 비용 절감 금지 패턴

- Draft 전체 transcript를 매번 전송
- 평가 quality model을 임의로 저가 model로 변경
- safety check 생략
- 사용자의 동의 없이 외부 provider로 fallback
