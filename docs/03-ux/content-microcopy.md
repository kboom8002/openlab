---
doc_id: WOL-UX-010
title: Content and Microcopy Contract
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-004
  - WOL-DOM-004
  - WOL-DOM-005
  - WOL-DOM-007
  - WOL-DOM-008
affects:
  - contracts/ux/copy-state-labels.yaml
  - src/content/**
  - src/app/**
  - src/components/**
supersedes: null
---

# Content and Microcopy Contract

## 1. 목적

사용자에게 권리·AI 역할·평가·Sponsor 관계를 오해 없이 설명하고, 상태와 action label을 일관되게 사용한다.

## 2. Voice

- 쉬운 한국어
- 직접적이고 존중하는 문장
- 과장보다 현재 상태
- 사용자의 경험과 선택을 주어로 사용
- AI를 권위자나 심사 주체로 의인화하지 않음

## 3. 대표 메시지

### Product

```text
생각을 실행 가능한 아이디어로.
```

### Participant

```text
완성된 아이디어가 없어도 시작할 수 있습니다.
AI 코치가 한 번에 한 가지씩 질문합니다.
```

### Organization

```text
자유제안함을 실행 가능한 혁신 파이프라인으로 바꾸세요.
```

## 4. AI Disclosure

```text
AI는 질문, 정리와 시각화를 지원합니다.
AI가 제안한 내용은 사용자가 확인·수정한 뒤 반영됩니다.
```

금지:

```text
AI가 객관적으로 최고의 아이디어를 선정합니다.
AI가 성공 가능성을 정확히 예측합니다.
```

## 5. Rights Copy

```text
아이디어의 권리는 원칙적으로 제출자에게 유지됩니다.
제출만으로 WELLB OPENLAB, WellB Company 또는 협력기관에 소유권이 이전되지 않습니다.
실증·공동개발·사업화는 별도 협의와 계약을 통해 진행합니다.
```

## 6. Sponsor Copy

관계 `proposal`:

```text
기관 스폰서십을 제안·협의 중인 프로그램입니다.
공식 협약과 명칭·로고 사용 승인이 완료되기 전까지 공식 후원으로 표시하지 않습니다.
```

관계 `approved`만 공식 승인 범위의 copy와 logo를 사용한다.

## 7. Primary CTA

| 상황 | Label |
|---|---|
| 공개 Home | 아이디어 시작하기 |
| Challenge | 이 챌린지에 참여하기 |
| Draft | 작성 계속하기 |
| Studio | 다음 단계 |
| Passport | 제출 전 확인 |
| Preflight | 확인 필요 항목 수정 |
| Submission | 아이디어 제출 |
| Pairwise | 선택 확정 |
| Expert | 평가 제출 |
| Manager | 결정 기록 |
| Sponsor | 월간 보고서 보기 |

`자세히 보기`만 반복하지 않는다.

## 8. Save Copy

- 변경사항이 있습니다.
- 저장 중입니다.
- 저장되었습니다 · 14:32
- 연결이 불안정합니다. 서버에 아직 저장되지 않았습니다.
- 저장하지 못했습니다. 작성 내용은 화면에 남아 있습니다.

## 9. Status Labels

상태 label은 `contracts/ux/copy-state-labels.yaml`과 Domain enum을 사용한다. UI에서 새로운 의미의 동의어를 임의 생성하지 않는다.

예:

- `PROMISING`: 고도화 후보
- `PILOT_READY`: 실증 준비 후보
- `VALIDATED`: 실증 결과 확인
- `ADOPTED`: 적용됨

`PILOT_READY`를 `실증 확정`, `VALIDATED`를 `사업 성공`으로 표현하지 않는다.

## 10. Error Copy

구조:

```text
무엇이 실패했는가
작성 내용이 안전한가
무엇을 할 수 있는가
```

내부 exception, SQL, provider error는 사용자에게 표시하지 않는다.

## 11. Empty Copy

빈 상태는 비난하지 않고 시작 행동을 제공한다.

```text
아직 평가할 아이디어가 없습니다.
새 평가가 배정되면 이곳에서 확인할 수 있습니다.
```

## 12. Accessibility Copy

- icon-only action에 accessible name
- 약어는 첫 사용 시 풀어쓰기
- 점수의 높고 낮음만이 아니라 기준 의미 설명
- 시간·마감은 timezone과 절대 날짜 제공

## 13. Acceptance Criteria

- 권리·AI·Sponsor copy가 canonical 정책과 일치한다.
- 상태 label이 machine-readable contract와 연결된다.
- CTA가 결과를 예측할 수 있는 동사로 작성된다.
- 오류가 사용자에게 해결 행동을 제공한다.
