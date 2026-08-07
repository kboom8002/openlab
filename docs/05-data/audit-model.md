---
doc_id: WOL-DATA-010
title: Audit Event and Content Provenance Model
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-ADR-010
- WOL-DATA-002
affects:
- contracts/data/table-catalog.yaml
- supabase/migrations/**
- src/server/audit/**
supersedes: null
---

# Audit Event and Content Provenance Model

## 1. 두 모델의 분리

### Audit Event

누가 어떤 보호된 자원에 어떤 작업을 했는지 기록한다.

예:

- role grant/revoke
- Challenge publish
- Idea submit/withdraw
- evaluation assign/submit
- selection decision
- Showcase permission grant/revoke
- Sponsor report view/download
- account deletion request

### Content Provenance

Idea Passport의 문장이 어디에서 왔고 누가 확인했는지 기록한다.

예:

- user original
- AI suggested
- user edited
- external source
- admin corrected

Audit Event로 provenance를 대체하거나 반대로 하지 않는다.

## 2. Audit event fields

- `actor_user_id` nullable for system
- `actor_type`
- `organization_id`
- `action`
- `resource_type`, `resource_id`
- `reason_code`
- `request_id`, `job_id`
- `metadata` — 최소·비민감
- `created_at`

금지:

- password·token·secret
- raw private Idea content
- raw AI prompt 전체
- 불필요한 IP·device fingerprint 장기 보존

## 3. Append-only

일반 application role에 update·delete policy를 제공하지 않는다. 정정이 필요하면 별도 correction event를 추가한다.

## 4. Sensitive access audit

필수 audit:

- admin이 다른 사용자의 private Idea 조회
- safety review를 위한 AI conversation 조회
- Sponsor report download
- signed URL 발급 for sensitive file
- Service Role job의 protected resource access

## 5. Provenance rules

- 사용자 확인 전 AI suggestion은 `confirmed_by_user = false`.
- field가 수정되면 새 Version과 provenance record를 생성한다.
- submitted Version의 provenance도 immutable.
- external source는 source reference와 accessed time을 기록한다.

## 6. Access

- participant는 자신의 Passport provenance summary를 볼 수 있다.
- evaluator는 최종 AI assistance summary를 볼 수 있으나 raw conversation은 기본적으로 보지 않는다.
- Sponsor는 provenance와 audit raw table을 읽지 않는다.
- admin audit 조회는 업무 목적과 최소 범위로 제한한다.

## 7. Acceptance Criteria

- 중요한 상태 전이에 audit event가 존재한다.
- AI suggestion accept/reject가 provenance에 남는다.
- audit metadata에 private content가 복제되지 않는다.
