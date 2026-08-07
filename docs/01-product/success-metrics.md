---
doc_id: WOL-PROD-004
title: Success Metrics
status: approved
authority: canonical
owner: product-analytics
last_verified: 2026-07-31
depends_on:
  - WOL-PROD-001
  - WOL-DOM-005
  - WOL-DOM-006
affects:
  - docs/10-operations/**
  - contracts/events/**
  - src/features/analytics/**
supersedes: null
---

# Success Metrics

## 1. 목적

제출 수나 페이지뷰 같은 활동량만으로 제품 성공을 오판하지 않도록, 아이디어 품질·신뢰·실증 전환·기관 가치까지 측정하는 공통 지표를 정의한다.

## 2. 북극성 지표

### Pilot-ready Idea Rate

```text
PILOT_READY로 운영 승인된 Idea 수
÷ ELIGIBLE 상태로 평가를 시작한 Idea 수
```

- 동일 Challenge 단위와 Challenge Series 누적 단위로 계산한다.
- 단순 AI 성숙도 예측이 아니라 Selection Gate에서 사람이 승인한 상태를 사용한다.
- 분모가 20개 미만이면 비율과 절대 건수를 함께 표시한다.

## 3. Funnel 지표

| 단계 | 지표 | 정의 |
|---|---|---|
| 유입 | Challenge view-to-join | 상세 열람 중 참여를 시작한 비율 |
| 활성화 | First coach activation | Idea 생성 후 첫 AI 대화 완료 비율 |
| 구조화 | Passport generation rate | Draft 중 Passport 초안을 생성한 비율 |
| 완성 | Studio completion rate | 필수 7단계를 완료한 비율 |
| 제출 | Start-to-submit rate | Idea 시작 대비 최종 제출 비율 |
| 적격 | Eligibility rate | 제출 중 적격 판정 비율 |
| 평가 | Evaluation completion | 필요한 평가가 마감 내 완료된 비율 |
| 고도화 | Promising rate | 적격 Idea 중 PROMISING 비율 |
| 실증 | Pilot-ready rate | 북극성 지표 |
| 채택 | Adoption rate | Pilot 중 ADOPTED로 전환된 비율 |

## 4. 아이디어 품질 지표

### Structured Quality Improvement

동일한 고정 루브릭으로 초기 입력 snapshot과 제출 버전을 평가한 차이. 사용자에게 공개되는 최종 선발 점수와 분리한다.

### Evidence Coverage

필수 핵심 주장 중 `fact` 또는 `experience` 근거가 연결된 비율. 모든 주장을 사실로 바꾸는 것이 목표가 아니며, 가정은 가정으로 정확히 표시하면 품질로 인정한다.

### Experiment Readiness

핵심 가정, 대상, 최소 구현, 방법, 성공 기준, 기간과 파트너 항목의 충족률.

### Original Contribution Ratio

최종 Passport 필드 중 사용자 원문 또는 사용자 수정으로 확인된 필드 비율. AI 제안 수용률만 높이는 것을 성공으로 보지 않는다.

## 5. 평가 품질 지표

- AI–Expert score correlation
- Expert inter-rater agreement
- Pairwise exposure balance
- 평가 근거 작성률
- `low confidence` AI 평가의 human review 완료율
- 이해상충 신고·처리율
- 이의제기율과 번복률

상관성이 높다는 이유만으로 AI가 전문가를 대체할 수 있다고 결론내리지 않는다.

## 6. 신뢰·권리 지표

- 비공개 콘텐츠 권한 누출: 목표 0건
- 사용자 동의 없는 Showcase 사용: 목표 0건
- 제출 버전 무단 변경: 목표 0건
- 권리·공개 설정 이해도
- AI 기여 표시 확인률
- 평가 결과 설명 만족도
- 삭제·철회 요청 처리시간

## 7. 접근성·포용성 지표

민감정보를 과도하게 수집하지 않는 범위에서 다음을 본다.

- 쉬운 문장 모드 사용률
- 키보드 E2E 성공률
- 모바일 작성 완료율
- 접근성 관련 오류율
- 현장 당사자 평가 참여 수
- 특정 Track 또는 사용자군의 구조적 이탈 신호

개인별 장애·건강정보를 기본 수집하지 않는다.

## 8. 기관·스폰서 가치 지표

- 월간 Challenge 개설·완료 수
- 재참여 또는 재계약 의향
- 주제별 참여·제출·Pilot Funnel
- 동의된 Showcase 사례 수
- Pilot 파트너 연결 수
- Monthly Insight Report 발행 여부
- 프로그램 운영 SLA 준수율

## 9. 금지 Vanity Metrics

다음은 맥락 없이 대표 성과로 사용하지 않는다.

- 누적 가입자 수
- AI 대화 메시지 수
- 생성된 이미지 수
- 좋아요 수
- AI 평균 점수
- 아이디어 제출 수만 단독 제시

## 10. 측정 원칙

- 계산식·기간·분모를 함께 표시한다.
- 운영 목표와 대외 약속을 구분한다.
- 샘플 수가 작으면 절대 건수와 불확실성을 표시한다.
- 스폰서 리포트는 집계 데이터를 기본으로 한다.
- 지표 정의 변경 시 버전과 적용일을 기록한다.

## 11. MVP 목표 설정 규칙

Closed Beta의 수치는 학습 목표이며 외부 성과 약속이 아니다. 실제 목표값은 참가자 규모, 운영 인력과 스폰서 협의 후 Challenge별 설정으로 관리한다.
