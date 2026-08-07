---
doc_id: WOL-DATA-008
title: Seed and Fixture Data Policy
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-002
- WOL-DATA-007
affects:
- supabase/seed.sql
- supabase/tests/fixtures/**
- src/test/fixtures/**
supersedes: null
---

# Seed and Fixture Data Policy

## 1. 목적

개발·테스트 환경에서 반복 가능한 사용자 흐름과 RLS 검증을 제공하면서 실제 개인정보와 공식 Sponsor 관계를 오인시키지 않는다.

## 2. 허용 데이터

- 명시적으로 `fixture`, `sample`, `simulated`라고 표시된 가상 사용자
- 가상 organization
- 가상 monthly challenge
- 골든 대화 시나리오의 비식별화된 Idea
- RLS allow·deny 테스트용 최소 fixture
- JDC 대신 `Sample Anchor Sponsor`를 사용하는 sponsor fixture

## 3. 금지 데이터

- production dump
- 실제 사용자 email·전화번호·아이디어 원문
- 실제 JDC 공식 로고·공식 sponsored 상태
- 실제 API key·OAuth secret
- 실제 평가자 신원
- 실제 민감·장애·건강 정보

## 4. Fixture personas

표준 fixture:

- `participant_a` — Draft owner
- `participant_b` — 다른 사용자의 Draft 접근 deny 검증
- `expert_a` — Idea A assigned
- `expert_b` — unassigned deny 검증
- `manager_wellb` — 운영 organization manager
- `sponsor_viewer_a` — Sponsor A snapshot only
- `sponsor_viewer_b` — 다른 Sponsor snapshot deny
- `admin_test` — integration test only

실제 로그인 자격정보는 local auth fixture에만 두며 문서에 비밀번호를 기록하지 않는다.

## 5. Determinism

- fixture UUID는 테스트에서 고정 가능.
- 날짜는 상대값보다 고정 sample date를 사용하되 UI에서 `샘플 일정` 표시.
- 랜덤 데이터가 필요하면 seed를 고정한다.
- 동일 seed 실행은 idempotent 또는 reset 전제임을 명시한다.

## 6. Seed와 migration 분리

- schema·RLS·function은 migration.
- 개발 데이터는 seed.
- test-specific data는 test transaction 또는 fixture helper.
- production에 seed를 자동 적용하지 않는다.

## 7. Acceptance Criteria

- fixture만으로 owner·evaluator·manager·sponsor RLS 시나리오를 검증할 수 있다.
- 실제 기관 관계로 오인될 표현이 없다.
- seed 파일에 secret이 없다.
