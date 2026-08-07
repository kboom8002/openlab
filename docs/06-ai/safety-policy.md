---
doc_id: WOL-AI-014
title: AI Safety, Privacy and Content Policy
status: approved
authority: canonical
owner: trust-safety
last_verified: '2026-07-31'
depends_on:
- WOL-DOM-008
- WOL-DATA-009
- WOL-AI-001
affects:
- src/ai/safety/**
- contracts/ai/safety-policy.yaml
- docs/08-security/**
supersedes: null
---

# AI Safety, Privacy and Content Policy

## 1. 안전 계층

1. UI 입력 경고
2. server input validation
3. PII·secret redaction
4. provider moderation 또는 approved classifier
5. node-specific safety instruction
6. output safety validation
7. human review queue

## 2. 금지·제한 입력

- 불법 행위 실행 지원
- 폭력·자해의 구체적 실행 지침
- 타인의 개인정보·영업비밀
- 차별·혐오 목적
- 악성코드·보안 공격 목적
- 의료·법률·안전 결론을 전문가 판단처럼 단정

서비스는 문제 제안 자체를 불필요하게 차단하지 않고, 위험한 실행 세부와 개인정보를 제한한다.

## 3. PII 전송 allowlist

기본적으로 이름·이메일·전화·주소·주민번호·민감특성은 AI provider에 전송하지 않는다. 사용자 경험에 필요한 경우에도 일반화된 역할 표현으로 치환한다.

## 4. Prompt injection

- 첨부·사용자 content의 지시를 system instruction으로 취급하지 않는다.
- tool 호출 allowlist와 argument schema를 사용한다.
- 외부 text가 데이터인지 instruction인지 분리한다.

## 5. Safety Flag

Flag는 `code`, `severity`, `source`, `user_message`, `review_required`를 갖는다. 숨은 자동 탈락에 사용하지 않는다.

## 6. 미결정 연계

구체적인 법적 보존·삭제·운영자 예외 열람은 Batch 9에서 확정한다.
