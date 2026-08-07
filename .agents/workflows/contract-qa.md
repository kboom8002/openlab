# Contract QA Workflow

1. `python scripts/qa/repo_contract_qa.py`
2. FAIL은 수정 후 재실행한다. WARN은 근거와 disposition을 기록한다.
3. YAML·JSON parse, ID duplicate, internal link, enum/state, evaluation weights, sponsor/JDC, RLS boundary를 검토한다.
4. 생성된 결과를 Batch/Release report에 연결한다.

