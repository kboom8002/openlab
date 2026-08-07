---
doc_id: WOL-AI-003
title: LangGraph State Schema
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-002
- WOL-DOM-003
- WOL-DATA-002
affects:
- src/ai/state/**
- contracts/ai/state-schema.yaml
supersedes: null
---

# LangGraph State Schema

## 1. 공통 상태

```ts
type OpenLabGraphState = {
  runId: string
  threadId: string
  graphKey: string
  graphVersion: string
  ideaId: string
  ideaVersionId?: string
  challengeId: string
  actorId: string
  currentStage?: IdeaStage
  locale: 'ko-KR' | 'en'
  accessibilityMode: 'standard' | 'easy_language'
  messages: GraphMessage[]
  passportSnapshot: IdeaPassport
  confirmedFields: string[]
  inferredFields: string[]
  missingFields: string[]
  evidenceRefs: EvidenceRef[]
  pendingSuggestion?: AISuggestion
  safetyFlags: SafetyFlag[]
  modelKey: string
  promptVersions: Record<string, string>
  schemaVersions: Record<string, string>
  usage: UsageAccumulator
  errors: AIErrorRecord[]
}
```

## 2. Reducer 원칙

- `messages`: append-only reducer
- `confirmedFields`: set union
- `inferredFields`: set union, confirmation 시 제거
- `missingFields`: replace by latest node assessment
- `safetyFlags`: append + deduplicate by code
- `usage`: numeric accumulation
- `pendingSuggestion`: single replaceable value

## 3. 저장 금지 필드

- API key·secret
- raw authorization header
- signed storage URL
- 다른 사용자 PII
- hidden chain-of-thought
- provider 내부 debugging payload 전체

## 4. Snapshot 정책

- Checkpoint state는 실행 재개를 위한 기술 snapshot이다.
- Idea Version은 사용자가 확인한 canonical content snapshot이다.
- 두 객체를 동일 row 또는 동일 lifecycle로 관리하지 않는다.

## 5. Compatibility

State schema 변경 시 다음을 정의한다.

- additive field default
- old checkpoint resume 가능 여부
- graph version migration
- orphaned interrupt 처리
- retention·deletion 영향
