---
doc_id: WOL-GOV-008
title: Antigravity Project Permissions Policy
status: approved
authority: normative
owner: security-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-AGENT-001
affects:
  - contracts/antigravity/**
  - .agents/**
supersedes: null
---

# Antigravity Project Permissions Policy

## 1. 목적

Antigravity agent가 안전한 조회·검증 작업은 반복 승인 없이 수행하되, 패키지·데이터·배포·외부 시스템·비밀정보에 영향을 주는 작업은 명시적으로 승인받도록 한다.

## 2. 공식 permission model

권한은 `action(target)` 형식의 `allow`, `ask`, `deny` 목록으로 관리한다. 충돌 시 우선순위는 다음과 같다.

```text
deny > ask > allow
```

따라서 `ask`에 `command(*)`를 넣으면 세부 `allow` command도 ask가 우선될 수 있으므로 본 프로젝트 예시에는 광범위 ask wildcard를 넣지 않는다. 명시되지 않은 command는 기본적으로 승인 요청 대상이 된다.

## 3. 적용 방법

- Antigravity Project 또는 CLI에서 `/permissions`를 열어 Project 범위에 적용한다.
- `contracts/antigravity/project-permissions.example.json`은 검토·입력용 예시다.
- 이 JSON이 레포에 존재한다고 자동 적용된 것으로 간주하지 않는다.
- 팀의 OS, sandbox, CI, 실제 script 이름에 맞게 검토한다.

## 4. Allow 원칙

자동 허용은 읽기 중심의 Git 검사와 이미 정의된 비파괴적 검증 script로 제한한다.

권장 예:

- `git status`, `git diff`, `git log`, `git show`
- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`
- `pnpm test:rls`, `pnpm test:e2e`, `pnpm test:a11y`, `pnpm eval:ai`
- `supabase status`

## 5. Ask 원칙

다음은 매번 목적과 영향을 설명한 뒤 승인을 받는다.

- dependency 설치·삭제·업그레이드
- migration 적용, DB reset, seed, push
- 브라우저에서 외부 시스템에 입력·클릭
- 외부 URL·API 호출
- staging·production 배포
- environment variable 변경
- commit, push, PR 생성
- production 또는 실제 사용자 데이터 접근
- MCP mutation

## 6. Deny 원칙

다음은 프로젝트에서 상시 차단한다.

- `.env*`, SSH, cloud credential, secret directory 읽기·쓰기
- `.git/` 내부 직접 쓰기
- `rm -rf`, `git reset --hard`, force push
- DB drop, truncate, production reset
- Service Role key 출력 또는 브라우저 삽입
- workspace 외 임의 쓰기

## 7. Secret handling

- Secret 값은 agent prompt, artifact, log, screenshot, test fixture에 기록하지 않는다.
- 환경변수 이름만 문서화한다.
- 비밀이 필요하면 사용자가 안전한 환경에 직접 설정하고 agent는 존재 여부만 확인한다.
- accidental exposure가 의심되면 즉시 작업을 중단하고 credential rotation을 요청한다.

## 8. 권한 검토 Gate

Batch 또는 release 전 확인한다.

- broad wildcard가 세부 allow를 무효화하지 않는가
- 새 package script가 permission list와 일치하는가
- production command가 allow에 들어가지 않았는가
- 외부 domain과 MCP mutation이 ask 또는 deny인가
- secret 경로가 deny인가

## 9. 공식 근거

- https://antigravity.google/docs/permissions
- https://antigravity.google/docs/cli-permissions
- https://antigravity.google/docs/cli/commands/permissions
