---
doc_id: WOL-DATA-006
title: Supabase Storage Bucket and Access Policy
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-004
- WOL-DATA-005
- WOL-DOM-008
affects:
- contracts/data/storage-buckets.yaml
- supabase/config.toml
- supabase/policies/storage/**
- src/server/files/**
supersedes: null
---

# Supabase Storage Bucket and Access Policy

## 1. 기본 원칙

- upload는 기본 거부이며 `storage.objects` RLS로 명시 허용한다.
- 민감·사용자 생성 파일은 private bucket을 사용한다.
- public URL은 승인된 public asset에만 사용한다.
- object path만으로 권한을 추정하지 않고 application metadata와 ownership을 함께 확인한다.
- 다운로드는 signed URL을 기본으로 하며 짧은 만료시간을 사용한다.

## 2. Bucket catalog

| Bucket | Public | 목적 | 기본 접근 |
|---|---:|---|---|
| `public-assets` | yes | 승인된 로고·공개 Challenge 이미지 | anon read, manager upload |
| `avatars` | no | 사용자 avatar 원본 | owner write, signed read |
| `challenge-assets` | no | Draft 자료·가이드·템플릿 | manager write, 참여자 조건부 read |
| `idea-attachments` | no | Idea 증거·첨부 | owner write, authorized parent read |
| `idea-visuals` | no | 생성된 diagram·pitch | owner write/system generate |
| `evaluation-attachments` | no | 전문가 평가 첨부 | assigned evaluator write, manager read |
| `pilot-evidence` | no | 실증 사진·보고서·측정파일 | pilot participant scope |
| `exports` | no | PDF·CSV·report export | requester/authorized reader, TTL |
| `sponsor-reports` | no | 승인된 Sponsor 보고서 | sponsor org member signed read |

## 3. Object path convention

```text
avatars/{user_id}/{file_id}.{ext}
challenge-assets/{challenge_id}/{asset_id}/{filename}
idea-attachments/{idea_id}/{version_id}/{attachment_id}/{filename}
idea-visuals/{idea_id}/{version_id}/{visual_id}.{ext}
evaluation-attachments/{assignment_id}/{attachment_id}/{filename}
pilot-evidence/{pilot_id}/{update_id}/{attachment_id}/{filename}
exports/{requester_id}/{job_id}/{filename}
sponsor-reports/{sponsor_org_id}/{snapshot_id}/{filename}
```

사용자 입력 filename은 표시 metadata로만 쓰고 실제 object key는 UUID 기반으로 정규화한다.

## 4. Upload flow

1. Server가 user·resource authorization 확인.
2. 허용 bucket·mime·size·object path를 생성.
3. signed upload 또는 server upload 권한 발급.
4. upload 완료 후 `idea_attachments` 등 metadata row 생성.
5. malware/format scan 상태가 `clean`이 되기 전 공개·평가 사용 금지.
6. 실패·orphan object는 cleanup job 대상.

## 5. File validation

- extension이 아닌 실제 MIME과 signature 검증.
- executable·HTML·script upload 기본 금지.
- bucket별 size limit.
- 이미지·PDF 등 allowlist.
- 개인정보·영업비밀 경고는 UX와 함께 제공.
- AI provider에 전달할 파일은 별도 consent·purpose check.

## 6. Storage RLS

Storage 정책은 `storage.objects`의 `bucket_id`, `name`, authenticated user를 사용한다. 복잡한 parent permission은 `private.can_access_storage_resource(bucket, name, operation)` helper에서 검증한다.

금지:

- path prefix만 맞으면 다른 사용자의 파일을 읽는 policy
- public bucket에 Draft attachment 저장
- Sponsor에게 `idea-attachments` bucket list 권한 부여
- Service Role로 생성한 영구 공개 URL 반환

## 7. Signed URL

- 일반 사용자 파일: 5~15분.
- Sponsor report: 15~60분, organization membership 재검사.
- export: job의 `expires_at`보다 길지 않음.
- URL 발급 event는 민감 파일에 대해 audit 대상.

## 8. Acceptance Criteria

- 모든 private bucket은 upload·select·delete deny-by-default.
- 권한 없는 사용자는 object name을 알아도 다운로드하지 못한다.
- DB metadata와 object ownership이 일치하지 않으면 접근이 실패한다.
- Sponsor가 Idea attachment bucket을 직접 열람하지 못한다.
