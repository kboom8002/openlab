---
doc_id: WOL-WF-002
title: Plan Feature Workflow
status: approved
authority: normative
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-WF-001
affects:
  - .agents/artifacts/runs/**
supersedes: null
---

# Plan Feature

## Description

Create an implementation-ready plan without modifying code.

## Steps

1. Call or perform `/bootstrap-context`.
2. Read the task card and all listed context files.
3. Inspect existing routes, feature modules, schema, migrations, policies, prompts, and tests relevant to the task.
4. Define:
   - objective
   - non-objectives
   - user stories and roles
   - data and authorization behavior
   - UI states
   - AI graph or prompt impact
   - analytics and audit events
5. Identify files to create, modify, and explicitly not modify.
6. Break the work into ordered vertical steps that keep the build valid.
7. Define acceptance tests and exact commands.
8. Define migration, rollback, feature-flag, and data-compatibility needs.
9. List risks, open decisions, and approval points.
10. Write `.agents/artifacts/runs/<task-id>/implementation-plan.md` using the template.
11. Do not change production code, migration, dependency, or configuration files.

## Plan quality gate

The plan must make it possible for another agent to implement without guessing rights, roles, RLS, graph state, or completion criteria.
