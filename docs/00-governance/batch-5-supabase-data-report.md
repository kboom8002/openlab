---
doc_id: WOL-GOV-013
title: Batch 5 Supabase Data Architecture Report
status: approved
authority: canonical
owner: product-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-000
affects:
- docs/05-data/**
- contracts/data/**
- supabase/**
supersedes: null
---

# Batch 5 Supabase Data Architecture Report

## 1. 완료 범위

Batch 5는 Batch 0~4의 제품·도메인·UX·아키텍처를 Supabase 구현 계약으로 전환했다.

생성:

- Data Core 문서 13개
- Machine-readable Data contract 9개
- Supabase directory contract 4개
- logical table 34개
- RLS mandatory deny scenario 8개
- Storage bucket 9개

## 2. Canonical decisions

- `auth.users`와 `public.profiles` 분리
- platform role과 organization membership 분리
- 모든 exposed `public` table RLS required
- Service Role은 Browser·Client Component 금지
- Submitted Idea Version immutable
- evaluation은 exact Version ID 참조
- Sponsor는 snapshot read model만 접근
- Sponsor aggregate cell suppression threshold 5
- private Storage와 signed URL 기본
- migration append-only·local-first
- retention 기간은 법률 검토 전 proposal 상태

## 3. 구현 유예

실제 timestamped migration, executable RLS SQL과 seed는 아직 생성하지 않았다. 첫 Vertical Slice task에서 승인된 Data contract를 참조해 생성한다.

## 4. 다음 Batch

Batch 6 — LangGraph, Prompt Registry, AI Provider, Structured Output, Safety and AI Evaluation.
