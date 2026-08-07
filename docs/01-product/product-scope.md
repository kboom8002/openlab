---
doc_id: WOL-PROD-002
title: Product Scope
status: approved
authority: canonical
owner: product
last_verified: 2026-07-31
depends_on:
  - WOL-PROD-001
  - WOL-DOM-001
affects:
  - docs/03-ux/**
  - docs/04-architecture/**
  - docs/11-project/**
supersedes: null
---

# Product Scope

## 1. 목적

WELLB OPENLAB이 책임지는 제품 영역과 외부 운영·계약 영역을 구분하고, MVP에서 반드시 제공할 기능과 이후 확장 기능을 확정한다.

## 2. 제품 경계

WELLB OPENLAB은 다음 다섯 기능층을 제공한다.

1. **Challenge Layer**: Challenge Series와 Monthly Challenge의 공개·참여·일정 관리
2. **Idea Development Layer**: Idea Studio, AI 코치, Idea Passport와 시각화
3. **Evaluation Layer**: 적격성, AI 평가, Pairwise, Expert Evaluation, Selection Gate
4. **Pilot Layer**: 고도화, Proof Day, Pilot 상태와 결과 기록
5. **Governance Layer**: 공개 범위, 권리·동의, 감사로그, 스폰서 보고 경계

플랫폼 밖에서 별도 계약과 운영이 필요한 영역:

- 실증비 집행과 조달
- 공동개발·수익배분·권리양도
- 법률·특허 자문
- 투자 심사와 투자 계약
- 기관의 최종 정책 결정

## 3. 사용자 역할

| 역할 | 제품 내 핵심 권한 |
|---|---|
| anonymous | 공개 Challenge·공개 Idea Gallery 열람 |
| participant | 참여, Idea 작성·제출·철회, 본인 상태 확인 |
| evaluator | 자격을 충족한 Pairwise 평가 수행 |
| expert | 배정된 제출 버전 전문 평가 |
| challenge_manager | Challenge 설정·참여·평가·Selection 운영 |
| sponsor_viewer | 승인된 집계 리포트와 동의된 사례 열람 |
| admin | 플랫폼 운영, 정책 적용, 감사 가능한 제한 관리 |
| service_worker | AI·알림·비동기 처리 전용 시스템 역할 |

상세 역할은 `personas-and-jobs.md`와 향후 Auth/RLS 문서를 따른다.

## 4. MVP 포함 범위

### Public

- 제품 소개
- Challenge 목록과 상세
- 공개 Idea Gallery
- 작동 방식·권리·평가 안내
- 기관·기업 문의

### Participant

- 인증과 기본 온보딩
- Challenge 참여
- 복수 Draft 작성
- 7단계 Idea Studio
- AI 제안 수용·수정·거절
- Idea Passport 생성·편집
- Problem–Solution Map, Stakeholder Map, Experiment Card
- Preflight
- 공개 범위·동의 설정
- 최종 제출·철회·상태 확인

### Evaluation

- 자동 적격성 보조와 운영자 검토
- 제출 버전 대상 AI 루브릭 평가
- 익명 Pairwise 평가
- Expert Evaluation 배정·임시저장·제출
- 평가 결과 분리 저장
- Selection Board의 정성 Gate

### Operations

- Challenge 생성·발행·마감
- 제출안 목록·상태 관리
- 평가자 배정
- 보완 요청과 새 버전 재제출
- Pilot 후보·상태 관리
- 집계 리포트 내보내기
- 감사로그

## 5. MVP 조건부 포함

다음은 P1이며 Closed Beta 일정에 따라 후순위로 내릴 수 있다.

- Pairwise 평가 랭킹 고도화
- PDF 내보내기
- 인앱 알림과 이메일 알림
- 기본 스폰서 대시보드
- 3-Slide Pitch 생성
- 쉬운 문장 모드와 접근성 설정 저장

## 6. MVP 제외 범위

- 팀 실시간 공동 편집
- 아이디어 거래·마켓플레이스
- 특허 자동 출원
- 투자 계약·지분 관리
- 실증비 자동 지급·정산
- 완전한 기관별 화이트라벨
- 다국어 전체 지원
- 네이티브 모바일 앱
- 외부 웹 자동 리서치와 사실검증
- AI 단독 최종 선정
- 고급 포트폴리오 최적화
- 블록체인 기반 권리 증명

## 7. Challenge 제출 정책

- 한 사용자는 동일 Monthly Challenge에서 복수 Draft를 만들 수 있다.
- 최종 제출 수는 Challenge 설정값으로 제한한다.
- 기본값은 참가자 또는 팀당 1개, 허용 범위는 1~3개다.
- 제출한 Idea Version은 불변이다.
- 평가 시작 전 운영자가 `RETURNED_FOR_REVISION`으로 반환한 경우 새 버전을 생성해 재제출할 수 있다.
- 평가 시작 후 변경이 필요하면 기존 평가를 무효화하고 감사로그를 남기는 별도 운영 절차가 필요하다.

## 8. 공개 범위

MVP visibility enum은 다음 네 가지로 고정한다.

- `public`
- `anonymous`
- `evaluators_only`
- `private`

정의와 열람 범위는 `rights-and-visibility.md`를 따른다.

## 9. 외부 의존성

- AI Provider와 이용약관
- Supabase Auth·Database·Storage
- 이메일 또는 메시지 공급자
- 스폰서십 계약과 로고 사용 승인
- 실증 파트너의 참여와 별도 계약
- 개인정보·아이디어 권리 법률 검토

## 10. Scope 변경 규칙

신규 기능이 다음 중 하나를 유발하면 MVP 기본 범위에 바로 추가하지 않는다.

- 새로운 역할 또는 RLS 모델
- 새로운 권리 양도나 결제 계약
- 실시간 협업 인프라
- 비공개 데이터를 외부기관에 제공
- AI가 최종 의사결정 수행
- 별도 worker·queue가 필요한 장기 작업

해당 요청은 Product Change Proposal과 영향 분석을 거쳐야 한다.

## 11. Acceptance Criteria

- 모든 P0 기능이 역할과 사용자 여정에 연결된다.
- 포함·조건부·제외 범위가 구분된다.
- 제출·수정·공개 정책이 모호하지 않다.
- 외부 계약 영역이 제품 기능처럼 오인되지 않는다.
