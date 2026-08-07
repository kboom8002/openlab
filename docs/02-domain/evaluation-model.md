---
doc_id: WOL-DOM-005
title: Evaluation Model
status: approved
authority: canonical
owner: product-evaluation
last_verified: 2026-07-31
depends_on:
  - WOL-DOM-003
  - WOL-DOM-004
affects:
  - docs/06-ai/**
  - docs/09-quality/**
  - contracts/domain/evaluation-model.yaml
  - src/features/evaluations/**
supersedes: null
---

# Evaluation Model

## 1. 목적

AI, 현장 사용자, 전문가와 운영 결정의 역할을 분리해 공정하고 설명 가능한 평가 구조를 정의한다.

## 2. 평가 원칙

- 제출 완료된 고정 Version만 평가한다.
- 작성자 신원·학력·소속·문체의 화려함을 평가하지 않는다.
- AI 점수만으로 자동 탈락시키지 않는다.
- 점수마다 근거와 루브릭 버전을 남긴다.
- 정보 부족은 낮은 품질과 구분한다.
- 이해상충과 평가자 편차를 기록한다.

## 3. 평가 단계

```text
Eligibility Review
→ AI Evaluation
→ Pairwise / Field Evaluation
→ Expert Evaluation
→ Reference Score
→ Selection Gate
```

Pairwise는 Challenge 설정에 따라 비활성화할 수 있다. Expert Evaluation과 Selection Gate는 MVP에서 필수다.

## 4. Reference Score

기본 가중치:

| 구성 | 비중 |
|---|---:|
| AI Evaluation | 25% |
| Pairwise / Field Evaluation | 25% |
| Expert Evaluation | 50% |

Selection Committee는 별도 10% 점수를 주지 않는다. **정성 Gate**로만 작동하며 평가 오류, 안전·권리, 실증 조건, 편차와 포트폴리오 중복을 검토한다.

Pairwise가 비활성화되거나 최소 표본을 충족하지 못하면 가중치를 자동 재분배하지 않는다. `insufficient_data`로 표시하고 Expert·Committee가 그 한계를 확인한다.

## 5. AI Evaluation Rubric

| 기준 | 배점 |
|---|---:|
| 문제 중요성 | 15 |
| 사용자 이해 | 15 |
| 해결 적합성 | 20 |
| 차별성 | 10 |
| 실현 가능성 | 15 |
| 실험 가능성 | 10 |
| 사회적 가치·포용성 | 10 |
| 명확성·근거 | 5 |
| 합계 | 100 |

출력:

- 기준별 점수와 근거 필드
- 강점
- 가장 큰 공백
- 검증할 가정
- 개선 질문
- 안전 플래그
- Confidence: high, medium, low
- Human review 필요 여부

Low confidence는 자동 감점이 아니라 추가 검토 신호다.

## 6. Pairwise Evaluation

기본 질문:

> 두 아이디어 중 실제 문제를 더 잘 해결할 가능성이 높은 것은 무엇인가요?

선택:

- Idea A
- 비슷함
- Idea B
- 판단하기 어려움

품질 규칙:

- 작성자와 현재 점수 숨김
- 자신의 Idea 평가 금지
- 이미 비교한 쌍 반복 최소화
- 노출 횟수 균형화
- 비정상 반복·속도·공모 패턴 감지
- 최소 표본은 Challenge 설정과 Quality Plan에서 관리

## 7. Expert Evaluation Rubric

| 기준 | 배점 |
|---|---:|
| 문제의 실제성 | 15 |
| 사용자 가치 | 15 |
| 해결안 적합성 | 20 |
| 실행 가능성 | 20 |
| 실증 가능성 | 15 |
| 확장 가능성 | 5 |
| 사회적 가치·안전성 | 10 |
| 합계 | 100 |

필수 정성 항목:

- 가장 강한 점
- 가장 큰 위험
- 실증 전 확인 조건
- 종합 의견

## 8. Selection Gate

Committee가 확인할 수 있는 항목:

- Eligibility 또는 평가 오류
- 이해상충
- AI·Expert 점수의 큰 편차
- 정보 부족과 Low Confidence
- 안전·권리·부정적 영향
- 실증 파트너와 운영 주체
- 동일 문제·해결안의 과도한 중복
- Challenge 목적과의 정합성

Committee가 할 수 없는 일:

- 근거 없이 숨은 가산점 부여
- Sponsor 지시만으로 순위 변경
- 작성자 배경을 이유로 선정
- AI 점수만으로 탈락

결정마다 이유와 참조한 Evaluation snapshot을 저장한다.

## 9. 결과 공개

참가자에게 기본 제공:

- 상태와 다음 단계
- AI 평가 요약과 한계
- Expert의 익명·정제된 피드백
- Selection 결정 이유의 범주

기본 비공개:

- 다른 Idea의 원점수
- 평가자 개인 신원
- 내부 안전·권리 조사 세부
- 스폰서 내부 의견

전문가 신원은 프로그램 종료 후 당사자 동의와 정책에 따라 공개할 수 있다.

## 10. 이의제기

- 평가 기준 적용 오류
- 이해상충 미신고
- 제출 버전 불일치
- 권리·안전 오판
- 시스템 오류

단순 점수 불만만으로 자동 재평가하지 않는다. 이의제기 처리와 결과를 감사로그에 기록한다.

## 11. Acceptance Criteria

- 평가 유형별 데이터가 분리 저장된다.
- 가중치와 정성 Gate가 혼동되지 않는다.
- AI Confidence와 정보 부족이 표시된다.
- 자기평가·중복평가·이해상충을 통제한다.
- 최종 결정에 설명 가능한 이유가 존재한다.
