#!/usr/bin/env python3
from pathlib import Path
import json, re, sys
import yaml

ROOT = Path(__file__).resolve().parents[2]
fails=[]; warns=[]; checks=[]
EXCLUDED={"node_modules", ".next", "coverage", ".git"}
def repo_files(pattern):
    return (p for p in ROOT.rglob(pattern) if not EXCLUDED.intersection(p.relative_to(ROOT).parts))
def check(name, ok, detail=""):
    checks.append((name, ok, detail))
    if not ok: fails.append(f"{name}: {detail}")

# YAML / JSON parsing
yaml_docs={}; json_docs={}
for p in repo_files("*.yaml"):
    try: yaml_docs[p]=yaml.safe_load(p.read_text(encoding="utf-8"))
    except Exception as e: fails.append(f"yaml_parse:{p.relative_to(ROOT)}:{e}")
for p in repo_files("*.json"):
    try: json_docs[p]=json.loads(p.read_text(encoding="utf-8"))
    except Exception as e: fails.append(f"json_parse:{p.relative_to(ROOT)}:{e}")
check("structured_parse", not any(x.startswith(("yaml_parse","json_parse")) for x in fails), f"yaml={len(yaml_docs)} json={len(json_docs)}")

# unique document and contract identifiers
ids={}
for p in repo_files("*"):
    if p.suffix not in {".md", ".yaml", ".json"}: continue
    text=p.read_text(encoding="utf-8", errors="replace")
    for m in re.finditer(r"(?m)^(?:doc_id|contract_id):\s*['\"]?([^'\"\s]+)", text):
        ids.setdefault(m.group(1),[]).append(str(p.relative_to(ROOT)))
dups={k:v for k,v in ids.items() if len(v)>1}
check("unique_ids", not dups, str(dups))

# relative markdown links
broken=[]
for p in repo_files("*.md"):
    text=p.read_text(encoding="utf-8", errors="replace")
    for target in re.findall(r"\[[^\]]*\]\((?!https?://|#|mailto:)([^)#]+)(?:#[^)]+)?\)", text):
        if not (p.parent/target).resolve().exists(): broken.append(f"{p.relative_to(ROOT)}->{target}")
check("internal_links", not broken, ";".join(broken[:20]))

# canonical evaluation weights
ev=yaml.safe_load((ROOT/"contracts/domain/evaluation-model.yaml").read_text())
ref=ev["reference_score"]
check("evaluation_weight_total", ref["ai_evaluation_weight"]+ref["pairwise_field_weight"]+ref["expert_evaluation_weight"]+ref["committee_weight"]==100, str(ref))
check("evaluation_weight_values", [ref["ai_evaluation_weight"],ref["pairwise_field_weight"],ref["expert_evaluation_weight"],ref["committee_weight"]]==[25,25,50,0], str(ref))

# domain enum reuse in selected machine contracts
enums=yaml.safe_load((ROOT/"contracts/domain/domain-enums.yaml").read_text())["enums"]
sp=yaml.safe_load((ROOT/"contracts/domain/sponsorship-access-policy.yaml").read_text())
check("jdc_proposal_default", sp["relationship_defaults"]["jdc_status"]=="proposal", str(sp["relationship_defaults"]))
check("jdc_status_is_enum", sp["relationship_defaults"]["jdc_status"] in enums["sponsor_relationship_status"], "")
all_text="\n".join(p.read_text(encoding="utf-8",errors="replace") for p in repo_files("*.yaml"))
check("no_jdc_active_claim", not re.search(r"jdc_status:\s*(active|agreement_pending)", all_text), "JDC must remain proposal")

# Sponsor and RLS invariant markers
rls=(ROOT/"contracts/data/rls-policy-matrix.yaml").read_text(encoding="utf-8")
check("rls_contract_present", "sponsor" in rls.lower() and "draft" in rls.lower(), "sponsor/draft markers")
sec=(ROOT/"contracts/security/security-policy.yaml").read_text(encoding="utf-8")
check("sponsor_dedicated_read_model", "dedicated_read_model" in sec and "raw_draft: denied" in sec, "")

status="PASS" if not fails else "FAIL"
print(f"WELLB OPENLAB CONTRACT QA: {status}")
for name,ok,detail in checks: print(f"[{'PASS' if ok else 'FAIL'}] {name} {detail}")
for w in warns: print(f"[WARN] {w}")
sys.exit(1 if fails else 0)
