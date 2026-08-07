---
doc_id: WOL-RULE-006
title: UI, Design System, and Accessibility Rules
status: approved
authority: normative
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-006
  - WOL-UX-000
  - WOL-UX-005
  - WOL-UX-007
  - WOL-UX-008
affects:
  - src/**/*.tsx
  - src/**/*.css
  - src/components/ui/**
supersedes: null
---

# UI, Design System, and Accessibility Rules

> Recommended activation: Glob for UI and style files.

## Required context

UI 작업 전에 다음을 읽는다.

1. 해당 Page Spec
2. `contracts/ux/routes.yaml`
3. `docs/03-ux/component-inventory.md`
4. `docs/03-ux/accessibility-contract.md`
5. `docs/03-ux/loading-empty-error-states.md`
6. 관련 Domain Canon

## Design system

- Use WellB Forest, Deep Forest, Sage, Mist, and restrained Gold through CSS variables.
- Do not hardcode brand colors repeatedly in components.
- Use shadcn/ui components as repo-owned source and document meaningful deviations.
- Use one approved primitive system; do not mix Base UI, Radix, and React Aria implementations.
- Preserve semantic HTML and primitive accessibility behavior during visual customization.
- Status and claim types must include text or icon semantics, not color alone.

## Product UI

- Idea Studio desktop pattern: stage navigation + conversation + live Idea Map.
- Mobile pattern: one primary flow with Idea Map in a Sheet.
- AI suggestion cards visibly distinguish pending, accepted, edited, and rejected states.
- Always show save, loading, empty, error, offline, and permission-denied states.
- Submitted Versions are read-only.
- Sponsor UI contains aggregate and consented Showcase only and must not reuse Manager raw-data views.
- Public Idea and Gallery remain noindex until policy approval.

## Accessibility baseline

Target WCAG 2.2 AA.

- All core flows work with keyboard only.
- Focus is visible and returns logically after dialogs, sheets, and menus close.
- Form controls have persistent labels and actionable error messages.
- Dynamic AI and save states use appropriate live-region announcements without excessive chatter.
- Touch targets are at least 44 by 44 CSS pixels where practical.
- Content remains usable at 200% zoom and 360px width.
- Reduced-motion preference is respected.
- Diagrams and visual Idea Maps have equivalent text descriptions.
- Do not disable outline without an accessible replacement.

## Copy and trust

- Use canonical copy and labels from `contracts/ux/copy-state-labels.yaml`.
- Do not imply AI objectivity, guaranteed selection, protected IP, official sponsorship, or verified safety without evidence.
- Make rights, visibility, AI contribution, and evaluation limits understandable before submission.

## Verification

UI changes require desktop, tablet, mobile, keyboard, focus, empty/error, offline where applicable, and reduced-motion checks recorded in the UI verification report.
