---
doc_id: WOL-DATA-002
title: Canonical Table Dictionary
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-001
- WOL-DOM-001
affects:
- contracts/data/table-catalog.yaml
- supabase/migrations/**
- src/types/database.types.ts
supersedes: null
---

# Canonical Table Dictionary

## 1. 공통 컬럼 규칙

- PK는 `id uuid primary key default gen_random_uuid()`를 기본으로 한다.
- 생성 시각은 `created_at timestamptz not null default now()`.
- 수정 가능한 테이블은 `updated_at`을 둔다.
- FK의 삭제 규칙은 명시적으로 선언한다. 기본값으로 무조건 cascade하지 않는다.
- domain enum은 migration 가변성을 위해 `text + check constraint`를 기본으로 한다.
- 사용자 표시용 slug와 business key에는 unique constraint를 둔다.
- RLS 조건에 사용되는 owner·organization·challenge·idea·status FK는 인덱스 대상으로 본다.

## 2. Identity·Organization

### `profiles`

제품 사용자 프로필. `id`는 `auth.users.id`와 동일하다.

주요 컬럼: `id`, `display_name`, `status`, `locale`, `accessibility_preferences`, `deleted_at`.

RLS: 본인 read/update. 제한된 public profile은 별도 view나 projection으로 제공한다.

### `platform_role_assignments`

플랫폼 전역 역할 부여. `participant`, `expert`, `admin`, `service_worker` 등.

주요 컬럼: `user_id`, `role`, `granted_by`, `expires_at`.

RLS: 본인 역할 이름 read 허용 가능, 변경은 admin only.

### `organizations`

WellB, 운영기관, Sponsor, 실증기관 등 법인·단체.

주요 컬럼: `name`, `slug`, `organization_type`, `status`, `public_profile`.

### `organization_members`

조직별 사용자 역할과 membership.

주요 컬럼: `organization_id`, `user_id`, `role`, `status`, `expires_at`.

Unique: `(organization_id, user_id, role)`.

## 3. Program·Sponsorship

### `challenge_series`

연간 또는 다회차 프로그램 root.

주요 컬럼: `owner_organization_id`, `title`, `slug`, `status`, `starts_on`, `ends_on`.

### `sponsorships`

Sponsor와 Series 또는 Challenge의 관계. 공식 상태·브랜드 사용 허용을 데이터로 관리한다.

주요 컬럼: `sponsor_organization_id`, `series_id`, `challenge_id`, `relationship_status`, `logo_use_allowed`, `sponsored_copy_allowed`, `agreement_reference`, `starts_at`, `ends_at`.

Constraint: `series_id`와 `challenge_id` 중 최소 하나 필요.

### `monthly_challenges`

월간 챌린지와 제출·평가 구성.

주요 컬럼: `series_id`, `owner_organization_id`, `slug`, `title`, `core_question`, `status`, 일정, `max_final_submissions`, `evaluation_config`, `rights_config`, `published_at`.

### `challenge_tracks`

Challenge 내 Better Life·Work·Jeju 등 분류.

Unique: `(challenge_id, code)`.

### `challenge_participations`

사용자가 Challenge 참여 조건과 안내를 확인한 기록.

Unique: `(challenge_id, user_id)`.

## 4. Idea·Version·Evidence

### `ideas`

Idea lifecycle root. 작성 내용 자체보다 owner·challenge·상태·현재 version pointer를 보관한다.

주요 컬럼: `challenge_id`, `author_id`, `track_id`, `status`, `visibility`, `current_draft_version_id`, `submitted_version_id`, `maturity`, `completion_score`.

### `idea_versions`

Idea Passport snapshot. 제출된 version은 immutable.

주요 컬럼: `idea_id`, `version_number`, `passport_data`, `created_by`, `source`, `is_submitted`, `submitted_at`, `content_hash`.

Unique: `(idea_id, version_number)`.

### `idea_field_provenance`

Passport field별 출처와 사용자 확인 상태.

주요 컬럼: `idea_version_id`, `field_path`, `source_type`, `source_reference`, `agent_run_id`, `confidence`, `confirmed_by_user`, `confirmed_at`.

### `idea_claims`

사실·경험·가정·기대효과를 명시적으로 구분한다.

주요 컬럼: `idea_version_id`, `field_path`, `claim_type`, `claim_text`, `verification_status`.

### `idea_evidence_items`

Claim을 뒷받침하는 사용자 경험·인터뷰·공개자료·파일 참조.

주요 컬럼: `idea_version_id`, `evidence_type`, `title`, `source_url`, `attachment_id`, `observed_at`, `verification_status`.

### `idea_attachments`

Storage object metadata와 권리·검사 상태.

주요 컬럼: `idea_id`, `idea_version_id`, `owner_id`, `bucket_id`, `object_path`, `mime_type`, `size_bytes`, `scan_status`, `visibility`.

## 5. AI Interaction

### `conversations`

Idea·단계별 대화 thread metadata.

주요 컬럼: `idea_id`, `owner_id`, `stage`, `thread_id`, `status`.

### `conversation_messages`

사용자·AI 메시지. raw text는 Sponsor와 평가자에게 기본 비공개.

주요 컬럼: `conversation_id`, `sender_type`, `agent_type`, `content`, `structured_data`, `safety_flags`.

### `agent_runs`

AI 호출의 모델·프롬프트·입출력·검증·비용 metadata.

주요 컬럼: `idea_id`, `idea_version_id`, `agent_type`, `prompt_version`, `model_key`, `input_snapshot`, `output_snapshot`, `status`, `confidence`, `token_usage`, `cost_estimate`, `error_code`.

## 6. Evaluation·Selection

### `evaluation_assignments`

전문가 또는 적격성 검토 배정.

주요 컬럼: `idea_id`, `idea_version_id`, `evaluation_type`, `evaluator_id`, `assigned_by`, `due_at`, `conflict_status`, `status`.

Unique: `(idea_version_id, evaluation_type, evaluator_id)`.

### `evaluations`

AI·전문가·적격성 평가 결과.

주요 컬럼: `assignment_id`, `idea_version_id`, `evaluation_type`, `rubric_version`, `criterion_scores`, `total_score`, `confidence`, `comments`, `status`, `submitted_at`.

### `pairwise_votes`

익명 비교 평가. 동일 쌍의 순서를 canonical ordering으로 저장한다.

주요 컬럼: `challenge_id`, `voter_id`, `idea_a_version_id`, `idea_b_version_id`, `choice`, `secondary_responses`.

### `selection_decisions`

운영위원의 정성 Gate 결정과 이유.

주요 컬럼: `idea_id`, `idea_version_id`, `decision`, `reason`, `decision_maker_id`, `evaluation_snapshot`, `published_at`.

## 7. Pilot·Consent·Rights

### `pilots`

선정 Idea의 실증 root.

주요 컬럼: `idea_id`, `idea_version_id`, `status`, `hypothesis`, `scope`, `success_metrics`, `duration_days`, `budget_range`, 일정, `result_summary`.

### `pilot_participants`

실증 파트너 조직·사용자와 역할.

### `pilot_updates`

실증 진행·증거·결과의 append-oriented 기록.

### `consent_documents`

이용약관·AI 처리·평가·연구 등 versioned consent 문서.

Unique: `(consent_type, version)`.

### `consent_acceptances`

사용자가 동의한 정확한 문서 version과 시각.

Unique: `(user_id, consent_document_id)`.

### `showcase_permissions`

Idea를 Sponsor·공개 갤러리·보고서에 사용할 수 있는 별도 permission.

주요 컬럼: `idea_id`, `idea_version_id`, `grantor_user_id`, `grantee_organization_id`, `scope`, `status`, `expires_at`, `revoked_at`.

## 8. Operations·Reporting

### `notifications`

사용자별 in-app 알림. 읽음·만료 상태 포함.

### `background_jobs`

AI 평가·export·보고서 생성 등 job 상태. Browser read 금지.

### `audit_events`

권한·상태·동의·Sponsor 접근과 같은 운영 사건의 append-only 기록.

### `sponsor_report_snapshots`

월별 집계 지표 snapshot. raw PII와 raw Idea text를 포함하지 않는다.

### `sponsor_showcase_items`

별도 동의된 Showcase만 Sponsor read model에 복제한다.

### `sponsor_pilot_summaries`

공개·협약 범위에 맞춘 Pilot 집계·요약.

## 9. 금지 구조

- `profiles.role` 하나로 모든 조직 권한을 표현
- `ideas.passport_data`를 mutable canonical document로 직접 갱신
- Sponsor UI가 `ideas`, `conversation_messages`, `agent_runs`를 직접 query
- 평가 결과에 evaluator email·개인정보를 함께 저장
- Storage URL만 DB에 저장하고 object ownership metadata를 생략
