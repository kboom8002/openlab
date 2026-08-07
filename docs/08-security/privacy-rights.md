---
doc_id: WOL-SEC-002
title: Privacy Rights and Consent
status: approved
authority: canonical
owner: security-product
last_verified: 2026-08-01
depends_on: [WOL-SEC-001]
affects: [contracts/security/**]
supersedes: null
---

# Privacy, Rights and Consent

Consent는 목적·대상·버전·시각·철회 상태를 receipt로 기록한다. 서비스 필수 처리와 선택 공개·Showcase·AI provider 전송을 묶어서 동의받지 않는다. 삭제 요청은 identity unlink, content lifecycle, checkpoint, export, audit 최소보존을 각각 판정한다. D-S04·D-S05 법률 결정 전 production 삭제 SLA와 보존일수를 확정하지 않는다.

AI provider allowlist는 필요한 필드만 허용하고 직접 식별자·연락처·첨부 EXIF·access token을 금지한다. 법률 승인 상태는 `pending_legal_review`다.

