---
doc_id: WOL-DOM-001
title: Domain Glossary and Canonical Enums
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-004
  - WOL-PROD-001
affects:
  - docs/**
  - contracts/domain/**
  - src/types/**
  - supabase/**
supersedes: null
---

# Domain Glossary and Canonical Enums

## 1. 목적

제품·문서·코드·DB에서 동일한 개념을 동일한 이름과 enum으로 사용하도록 최종 도메인 용어를 정의한다. 기계 판독 기준은 `contracts/domain/domain-enums.yaml`이다.

## 2. 프로그램 구조

| 용어 | 코드명 | 정의 |
|---|---|---|
| Challenge Series | `challenge_series` | 공통 목적·브랜드·스폰서십 아래 여러 Challenge를 묶는 프로그램 |
| Monthly Challenge | `monthly_challenge` | 특정 주제·기간·참여조건·루브릭을 가진 월별 또는 회차별 프로그램 |
| Track | `track` | Better Life, Better Work, Better Jeju 등 문제 영역 |
| Challenge Owner | `owner_organization` | Challenge를 법적·운영적으로 개설하는 조직 |
| Sponsor | `sponsor_organization` | 프로그램 비용·확산·실증을 지원하는 조직 |
| Field Partner | `field_partner` | 문제 검증·멘토링·현장 실증에 참여하는 조직 |

UI에서는 `Challenge`를 기본 표시명으로 쓰되 데이터 모델은 `monthly_challenge`를 사용한다.

## 3. 아이디어 구조

| 용어 | 정의 |
|---|---|
| Idea | 사용자와 상태를 유지하는 지속 Aggregate. 여러 Draft·Submitted Version을 가질 수 있음 |
| Idea Version | 특정 시점의 불변 snapshot |
| Submitted Version | 평가 대상이 되는 고정된 Idea Version |
| Idea Studio | 7단계 AI 지원 작성 공간 |
| Idea Passport | 문제·사람·해결책·실행성·임팩트·실험·권리·provenance의 표준 구조 |
| AI Suggestion | 사용자 확인 전의 AI 제안 객체 |
| Provenance | 필드의 출처와 사용자 확인 이력 |
| Preflight | 제출 전 논리·근거·안전·권리 검수 |

## 4. 평가 구조

| 용어 | 정의 |
|---|---|
| Eligibility Review | 참여조건·완성도·안전·스팸 등 기본 요건 검토 |
| AI Evaluation | 제출 버전을 공개 루브릭으로 평가하는 보조 판단 |
| Pairwise Evaluation | 익명 두 아이디어를 현장·사용자 관점에서 비교 |
| Expert Evaluation | 배정 전문가가 점수·근거·위험·실증 조건을 작성 |
| Reference Score | AI·Pairwise·Expert 결과를 정규화해 비교를 돕는 참고값 |
| Selection Gate | 운영위원이 적격·안전·실증 가능성·평가 편차를 검토하는 정성 결정 절차 |
| Promising | 고도화할 가치가 있다고 승인된 상태 |
| Pilot-ready | Pilot 설계 검토에 필요한 정보와 조건이 갖춰진 상태 |

## 5. 실증 구조

| 용어 | 정의 |
|---|---|
| Proof Day | 아이디어·실증 가정·파트너·조건을 공개 또는 비공개로 검토하는 세션 |
| Pilot | 제한된 범위·기간·성공 기준을 가진 현장 실증 |
| Validated | 정해진 가정 또는 효과가 결과 데이터로 확인된 상태 |
| Adopted | 기관·기업이 실제 운영·서비스·정책에 적용한 상태 |

`Validated`는 아이디어 전체의 성공을 보장하지 않고, Pilot에 명시된 가정의 검증 결과만 뜻한다.

## 6. 사용자 역할 enum

```text
anonymous
participant
evaluator
expert
challenge_manager
sponsor_viewer
admin
service_worker
```

한 사용자는 여러 역할을 가질 수 있다. 권한은 역할명만이 아니라 Organization·Challenge·Assignment 관계를 함께 검사한다.

## 7. Visibility enum

```text
public
anonymous
evaluators_only
private
```

정확한 의미는 `rights-and-visibility.md`를 따른다.

## 8. Claim Type enum

```text
fact
experience
assumption
expected_impact
```

- `fact`: 출처·관찰·검증 기록이 연결된 확인 사실
- `experience`: 제출자 또는 인터뷰 참여자의 경험 진술
- `assumption`: 아직 검증하지 않은 핵심 판단
- `expected_impact`: 실행될 경우 기대되는 변화

## 9. Provenance Source enum

```text
user_original
user_edited
ai_suggested
external_source
admin_edited
```

`admin_edited`는 예외적 운영 수정이며 이유와 감사로그가 필수다. 제출 버전에는 직접 적용할 수 없다.

## 10. Sponsor Relationship Status

```text
proposal
under_discussion
agreement_pending
active
paused
ended
```

JDC 관계의 기본값은 공식 협약 전 `proposal`이다.

## 11. 금지 동의어

- `winner`를 자동 상태로 사용하지 않는다. `PROMISING`, `PILOT_READY`, `ADOPTED`를 사용한다.
- `AI approved`를 사용하지 않는다. AI는 평가 결과만 생성한다.
- `owner`라는 단어로 스폰서와 아이디어 소유자를 혼동하지 않는다.
- `public`과 `anonymous`를 같은 의미로 사용하지 않는다.
- `completed`와 `validated`를 혼용하지 않는다.

## 12. 변경 규칙

enum 추가·삭제·이름 변경은 다음을 모두 갱신한다.

1. 본 문서
2. `contracts/domain/domain-enums.yaml`
3. DB migration
4. TypeScript type와 validation schema
5. 상태 전이 테스트
6. 관련 UI 카피와 분석 이벤트
