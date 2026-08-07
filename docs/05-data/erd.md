---
doc_id: WOL-DATA-001
title: Logical ERD and Aggregate Boundaries
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-000
- WOL-DOM-003
- WOL-DOM-005
- WOL-ADR-009
affects:
- contracts/data/table-catalog.yaml
- contracts/data/relationships.yaml
- supabase/migrations/**
supersedes: null
---

# Logical ERD and Aggregate Boundaries

## 1. 목적

MVP 데이터 구조를 aggregate 경계와 관계 중심으로 정의한다. 이 문서는 컬럼 전체 DDL이 아니라 **어떤 상태가 어디에 존재하고 무엇을 직접 연결하면 안 되는지**를 고정한다.

## 2. Schema 경계

```text
Supabase managed
└─ auth.users

public — Data API 대상, 모두 RLS
├─ identity·organization
├─ challenge·sponsorship
├─ idea·version·provenance
├─ AI interaction metadata
├─ evaluation·selection
├─ pilot·consent·notification
├─ audit·job internal tables
└─ sponsor read models

private — Data API 비노출
├─ RLS helper functions
├─ transaction helper functions
└─ policy implementation helpers

storage — Supabase managed
└─ storage.objects / storage.buckets + RLS
```

## 3. Aggregate map

```text
auth.users
  └─ profiles
      ├─ platform_role_assignments
      ├─ organization_members ── organizations
      ├─ challenge_participations
      ├─ ideas
      ├─ evaluation_assignments / evaluations / pairwise_votes
      ├─ consent_acceptances
      └─ notifications

organizations
  ├─ organization_members
  ├─ challenge_series
  ├─ sponsorships
  └─ pilot_participants

challenge_series
  ├─ sponsorships
  └─ monthly_challenges
       ├─ challenge_tracks
       ├─ challenge_participations
       ├─ ideas
       └─ sponsor_report_snapshots

ideas
  ├─ idea_versions
  │   ├─ idea_field_provenance
  │   ├─ idea_claims ── idea_evidence_items
  │   └─ idea_attachments
  ├─ conversations ── conversation_messages
  ├─ agent_runs
  ├─ evaluation_assignments ── evaluations
  ├─ selection_decisions
  ├─ showcase_permissions
  └─ pilots

pilots
  ├─ pilot_participants
  ├─ pilot_updates
  └─ sponsor_pilot_summaries
```

## 4. Table groups

### Identity and organization

- `profiles`
- `platform_role_assignments`
- `organizations`
- `organization_members`

### Program and sponsorship

- `challenge_series`
- `sponsorships`
- `monthly_challenges`
- `challenge_tracks`
- `challenge_participations`

### Idea and evidence

- `ideas`
- `idea_versions`
- `idea_field_provenance`
- `idea_claims`
- `idea_evidence_items`
- `idea_attachments`

### AI interaction

- `conversations`
- `conversation_messages`
- `agent_runs`

### Evaluation and selection

- `evaluation_assignments`
- `evaluations`
- `pairwise_votes`
- `selection_decisions`

### Pilot and rights

- `pilots`
- `pilot_participants`
- `pilot_updates`
- `consent_documents`
- `consent_acceptances`
- `showcase_permissions`

### Operations and reporting

- `notifications`
- `background_jobs`
- `audit_events`
- `sponsor_report_snapshots`
- `sponsor_showcase_items`
- `sponsor_pilot_summaries`

총 MVP logical table은 34개다. 실제 migration은 vertical slice 순서로 나누어 생성한다.

## 5. Canonical state location

| State | Canonical table |
|---|---|
| 사용자 신원 | `auth.users` |
| 제품 프로필 | `profiles` |
| platform role | `platform_role_assignments` |
| organization scoped role | `organization_members` |
| Challenge 상태 | `monthly_challenges` |
| Idea lifecycle | `ideas` |
| Idea 내용 | `idea_versions.passport_data` |
| AI 제안 근거 | `idea_field_provenance`, `agent_runs` |
| 평가 결과 | `evaluations`, `pairwise_votes` |
| 최종 운영 판단 | `selection_decisions` |
| 실증 상태 | `pilots` |
| Sponsor 공개 데이터 | sponsor read-model tables |

## 6. JSONB 사용 원칙

JSONB 허용:

- Versioned `passport_data`
- 평가 criterion score와 rationale payload
- snapshot report payload
- 제한된 설정·metadata

정규화 필수:

- 사용자·조직·권한
- Challenge·Idea·Version FK
- 평가 assignment와 평가자
- Consent와 Showcase permission
- Audit와 Sponsor access

JSONB 안의 값만으로 RLS 핵심 판단을 하지 않는다.

## 7. ID와 시간

- PK: `uuid` + `gen_random_uuid()`
- 시간: `timestamptz`
- 모든 mutable table: `created_at`, `updated_at`
- Domain archive: 상태와 `archived_at`
- Submitted Version: `submitted_at`, 이후 update 금지

## 8. Acceptance Criteria

- 모든 product aggregate가 정확히 하나의 root table을 가진다.
- Sponsor query가 operational raw table을 직접 요구하지 않는다.
- 평가가 `idea_id`만이 아니라 `idea_version_id`를 참조한다.
- AI 제안과 사용자 확인을 provenance로 추적할 수 있다.
- `auth.users`를 직접 제품 프로필처럼 사용하지 않는다.
