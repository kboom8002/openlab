---
doc_id: WOL-GOV-005
title: Document Status and Change Policy
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-INDEX-001
affects:
  - docs/**
  - contracts/**
supersedes: null
---

# Document Status and Change Policy

## 1. 문서 상태

| 상태 | 의미 | 코드 구현 기준으로 사용 가능 여부 |
|---|---|---:|
| draft | 작성 중이며 결정 근거로 사용 금지 | 아니오 |
| review | 검토 중 | 제한적 |
| approved | 결정이 승인됨 | 예 |
| implemented | 코드·migration·테스트에 반영됨 | 예 |
| deprecated | 신규 구현에서 사용 금지 | 아니오 |
| superseded | 다른 문서가 대체 | 아니오 |

## 2. 권위 수준

| authority | 의미 |
|---|---|
| canonical | 해당 도메인의 단일 원본 정의 |
| normative | canonical을 적용하는 필수 규칙 |
| informative | 설명·예시·배경자료 |
| prototype | UX 검증용이며 구현 계약이 아님 |

## 3. Frontmatter 계약

```yaml
---
doc_id: WOL-AREA-001
title: Document Title
status: draft
authority: canonical
owner: team-or-role
last_verified: YYYY-MM-DD
depends_on:
  - WOL-OTHER-001
affects:
  - src/path/**
supersedes: null
---
```

## 4. 변경 규칙

### Canonical 변경

- 관련 ADR 또는 Decision Record가 필요하다.
- 하위 문서·schema·migration·테스트 영향을 기록한다.
- enum이나 DB contract 변경은 migration 없이 수정하지 않는다.
- 제출된 Idea Version과 평가 루브릭 버전은 소급 변경하지 않는다.

### 구현 상태 변경

문서를 `implemented`로 바꾸려면 다음이 필요하다.

- 관련 코드 경로
- migration ID
- 테스트 ID
- 검증 명령 결과
- 미구현 경계

### 긴급 수정

보안·개인정보 문제는 우선 차단하고 문서를 사후 갱신할 수 있다. 단, Audit Event와 Incident ID를 남긴다.

## 5. 중복 방지

- 상태 enum은 도메인 canonical 문서에서 한 번만 정의한다.
- API payload는 `contracts/json-schema/` 또는 TypeScript schema를 참조한다.
- RLS 정책은 migration이 실행 원본이고 문서는 설명·매트릭스 역할을 한다.
- Prompt 본문은 `contracts/prompts/`가 원본이다.
- 디자인 토큰은 CSS 변수 파일이 구현 원본이며 문서에서 링크한다.

## 6. 문서 QA

Batch 종료 시 검사한다.

- doc_id 중복
- 깨진 내부 링크
- frontmatter 누락
- 승인되지 않은 문서를 canonical로 참조
- 날짜·배점·상태 불일치
- `TODO`, `TBD`, `확인 필요`가 open-decisions 또는 assumptions에 등록되지 않은 경우
