# context-bootstrap

1. AGENTS.md와 docs/INDEX.md를 읽는다.
2. Task가 참조하는 Feature, Page, API, Data/RLS, AI, Security contract를 연다.
3. `contracts/domain/domain-enums.yaml`과 open decision을 비교한다.
4. 허용·금지 경로와 acceptance criteria를 기록한다.
5. P0 또는 계약 충돌이면 구현하지 않고 Stop Report를 만든다.

출력: Context Digest(읽은 doc_id·contract_id), Decision Check, Scope, Stop/Proceed.

