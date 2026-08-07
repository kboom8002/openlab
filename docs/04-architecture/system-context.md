---
doc_id: WOL-ARCH-001
title: System Context
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-PROD-001
- WOL-DOM-001
- WOL-UX-001
affects:
- src/app/**
- src/features/**
- src/server/**
- src/ai/**
- supabase/**
supersedes: null
---


# System Context

## 1. 목적

WELLB OPENLAB과 사용자·조직·AI provider·Sponsor·운영 도구 사이의 신뢰 경계를 정의한다.

## 2. 시스템 경계

```text
Participant · Evaluator · Expert · Manager · Sponsor Viewer
                         │
                         ▼
                 WELLB OPENLAB Web
      Next.js App Router · Server Actions · Route Handlers
             │              │               │
             ▼              ▼               ▼
       Supabase Auth   PostgreSQL/RLS   Supabase Storage
             │              │
             └──────┬───────┘
                    ▼
           AI Orchestration Service
       LangGraph.js · Prompt Registry · Schemas
                    │
                    ▼
             Approved AI Provider
```

## 3. Primary actors

| Actor | 허용 목적 | 기본 제한 |
|---|---|---|
| Participant | Challenge 참여·Idea 작성·제출 | 본인 Draft만 원문 접근 |
| Pairwise evaluator | 익명 비교 평가 | 작성자·AI 점수·현재 순위 비공개 |
| Expert | 배정된 Submitted Version 평가 | 배정 외 Idea 접근 금지 |
| Manager | Challenge·평가·Selection 운영 | Draft 예외 접근은 별도 승인·audit 필요 |
| Sponsor viewer | 집계·동의 Showcase·허용 Pilot 확인 | raw Draft·대화·평가자 신원 접근 금지 |
| Service worker | 승인된 비동기 작업 | 최소 권한 credential과 job scope |

## 4. External systems

- AI Provider: 최소화·redaction된 입력만 전송한다.
- Email·Notification Provider: P2 결정 전 adapter 경계만 정의한다.
- Analytics·Error Tracking: P2 결정 전 민감정보 비수집 원칙을 적용한다.
- Deployment Platform: Batch 11에서 확정한다.

## 5. Trust boundaries

### Browser boundary

브라우저는 publishable Supabase key만 가질 수 있다. Service Role, provider secret, prompt registry 원문과 비공개 audit data를 가질 수 없다.

### Server boundary

서버는 session·role·object scope를 확인하고 Supabase user-context client를 기본으로 사용한다. Service Role은 명시적으로 승인된 system task에서만 별도 module을 통해 사용한다.

### Database boundary

공개 schema의 사용자 데이터는 RLS를 활성화한다. UI나 Server Action 검사는 RLS를 대체하지 않는다.

### AI boundary

Provider 응답은 신뢰된 domain state가 아니다. schema validation, safety check, provenance와 사용자 confirmation을 통과해야 한다.

### Sponsor boundary

Sponsor surface는 dedicated read model만 읽는다. 운영 table에 Sponsor policy를 추가해 원문을 직접 읽히는 방식은 기본안이 아니다.

## 6. 비적용 범위

- 외부 Idea marketplace
- 자동 특허 출원·투자 계약
- Sponsor의 자동 선정권
- AI 단독 의사결정
- 생산 환경 topology 확정

## 7. Acceptance Criteria

- 모든 actor가 role과 object scope를 가진다.
- Sponsor·AI·Service Role 경계가 명시된다.
- 외부 시스템 장애가 canonical Idea를 손상시키지 않는다.
- Context diagram이 container architecture와 일치한다.
