---
doc_id: WOL-UX-006
title: Component Inventory and Ownership
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-UX-004
  - WOL-UX-005
  - WOL-DOM-003
  - WOL-DOM-005
affects:
  - contracts/ux/component-inventory.yaml
  - src/components/**
  - src/features/**
supersedes: null
---

# Component Inventory and Ownership

## 1. 목적

shadcn/ui primitive, shared composition, feature component와 page composition의 소유 경계를 정의한다.

## 2. 계층

| 계층 | 경로 | 책임 |
|---|---|---|
| UI Primitive | `src/components/ui/` | shadcn 기반 접근 가능한 최소 component |
| Shared | `src/components/shared/` | 여러 feature에서 재사용하는 composition |
| Feature | `src/features/<domain>/components/` | 도메인 의미·상태를 가진 component |
| Page | `src/app/**/page.tsx` | data 조합과 page layout |

Page 파일에 복잡한 도메인 로직·LLM 호출·직접 SQL을 넣지 않는다.

## 3. UI Primitive 후보

- Button
- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Switch
- Label
- Badge
- Alert
- Card
- Dialog
- Sheet
- Popover
- Tooltip
- Tabs
- Accordion
- Progress
- Skeleton
- Table
- Dropdown Menu
- Breadcrumb
- Separator
- Toast/Sonner

Primitive 선택은 D-T01 ADR 전까지 특정 내부 API에 의존하지 않는다.

## 4. Shared Components

- AppLogo
- PublicHeader
- WorkspaceHeader
- WorkspaceSidebar
- MobileNavigation
- PageHeader
- EmptyState
- ErrorState
- PermissionState
- LoadingRegion
- SaveStatus
- StatusBadge
- ClaimTypeBadge
- VisibilityBadge
- ConsentNotice
- SponsorDisclosure
- ResponsiveDataList
- ConfirmActionDialog

## 5. Challenge Components

- ChallengeCard
- ChallengeStatusFilter
- ChallengeTrackFilter
- ChallengeTimeline
- EligibilitySummary
- EvaluationMethodSummary
- ChallengeSponsorPanel
- ParticipationCTA

Sponsor panel은 관계 status에 따라 `proposal`, `under_discussion`, `approved` copy를 다르게 사용한다.

## 6. Idea Studio Components

- StudioShell
- StudioHeader
- StageNavigation
- StageProgress
- ConversationPanel
- ConversationMessage
- AIMessage
- UserMessage
- AIThinkingState
- AISuggestionCard
- SuggestionDiff
- AnswerComposer
- QuickAnswerOptions
- IdeaMapPanel
- IdeaMapSheet
- PassportFieldSummary
- EvidencePrompt
- StageFooter

## 7. Passport·Submission Components

- IdeaPassportHeader
- PassportSection
- ProvenanceIndicator
- ClaimList
- FeasibilitySummary
- ImpactSummary
- ExperimentCard
- PreflightSummary
- PreflightIssue
- VisibilitySelector
- RightsNotice
- ConsentChecklist
- SubmissionConfirmation

## 8. Evaluation Components

- PairwiseComparison
- PairwiseIdeaSummary
- PairwiseChoice
- ExpertReviewShell
- ConflictDeclaration
- RubricCriterion
- ScoreInput
- ReviewSummary
- EvaluationProgress
- EvaluationLimitNotice

## 9. Manager Components

- OperationsMetrics
- ChallengeFunnel
- IdeaAdminTable
- EligibilityReviewPanel
- EvaluationCoverage
- SelectionComparison
- DecisionReasonForm
- PilotStatusBoard
- AuditTimeline

## 10. Sponsor Components

- SponsorPortfolioSummary
- AggregatedFunnel
- MonthlyImpactCard
- ShowcaseCard
- PilotPortfolioSummary
- DataBoundaryNotice

## 11. Component 상태 계약

모든 data component는 최소한 다음 상태를 설계한다.

```text
loading
ready
empty
error
permission_denied
```

AI·저장 component는 추가로:

```text
thinking
streaming
saving
saved
offline
retrying
safety_review
```

## 12. Story·Test 요구

- Primitive: interaction·accessibility test
- Shared: 주요 variant
- Feature: domain state와 permission variant
- Page: E2E에서 검증
- visual-only story가 product acceptance를 대체하지 않음

## 13. Acceptance Criteria

- 모든 page spec의 component가 inventory 또는 page-local로 분류된다.
- 같은 상태 badge를 feature마다 중복 구현하지 않는다.
- Sponsor component가 raw Idea component를 재사용해 권한을 넓히지 않는다.
- shadcn source 수정은 이유와 접근성 영향을 기록한다.
