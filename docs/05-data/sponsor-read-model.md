---
doc_id: WOL-DATA-011
title: Sponsor Reporting Read Model
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-ADR-009
- WOL-DOM-007
- WOL-DATA-005
affects:
- contracts/data/sponsor-read-model.yaml
- supabase/migrations/**
- src/features/sponsorship/**
- src/server/reporting/**
supersedes: null
---

# Sponsor Reporting Read Model

## 1. 목적

Sponsor에게 프로그램 성과와 별도 동의된 사례를 제공하면서 participant Draft, private Idea, AI raw data와 evaluator identity를 분리한다.

## 2. Read-model tables

### `sponsor_report_snapshots`

월별·분기별 집계 snapshot.

- Sponsor organization
- Series·Challenge
- reporting period
- version
- metrics payload
- suppression metadata
- generated_by_job
- approved_by
- published_at

### `sponsor_showcase_items`

별도 permission이 있는 Idea의 제한된 showcase projection.

- 공개 title·summary
- 공개 문제·해결·실험 요약
- approved visual reference
- permission ID
- visibility period

### `sponsor_pilot_summaries`

Pilot의 집계 상태·승인된 결과 요약.

## 3. Aggregate metrics

허용 기본값:

- 방문·가입·작성 시작·제출 funnel count
- track·category 분포
- 평가 완료율
- Pilot-ready 수
- Pilot 진행 상태
- 익명 만족도·접근성 지표

금지 기본값:

- participant 이름·email·전화
- raw Idea text
- 소수 집단의 민감 조합
- evaluator identity와 개별 코멘트
- AI conversation·prompt·agent raw payload

## 4. Suppression

소규모 셀의 재식별을 줄이기 위해 기본 suppression threshold를 5로 둔다. count가 5 미만인 세부 분류는 `suppressed` 또는 상위 분류로 합친다. 법률·Sponsor 계약에 따라 threshold는 더 엄격해질 수 있다.

## 5. Generation flow

```text
approved reporting schedule
→ background job
→ source query with service capability
→ PII allowlist transform
→ suppression check
→ immutable snapshot
→ manager approval
→ sponsor publication
→ access audit
```

Snapshot 생성 시 source row를 실시간으로 직접 노출하지 않는다.

## 6. RLS

- active Sponsor organization member만 자신의 snapshot read.
- WellB challenge manager는 자신이 운영하는 Series snapshot read.
- 다른 Sponsor organization snapshot read 금지.
- draft snapshot은 manager only.
- published snapshot download는 audit 대상.

## 7. JDC 상태 경계

`sponsorships.relationship_status`가 `active`이고 branding approval가 true가 되기 전에는 JDC 공식 Sponsor UI를 생성하지 않는다. 개발 fixture는 `Sample Anchor Sponsor`를 사용한다.

## 8. Acceptance Criteria

- Sponsor portal query가 raw Idea·Evaluation·AI table을 직접 참조하지 않는다.
- Showcase는 permission 없이 생성되지 않는다.
- 5 미만 cell suppression test가 존재한다.
- Snapshot은 발행 후 immutable version으로 유지된다.
