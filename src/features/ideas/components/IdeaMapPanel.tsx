"use client";

import { useState } from "react";
import type { WorkingPassport } from "@/server/queries/ideas";
import type { StudioStage } from "./StageNavigation";

interface IdeaMapPanelProps {
  stage: StudioStage;
  passport: WorkingPassport;
  onSaveField: (fieldPath: string, value: string) => Promise<void>;
}

export function IdeaMapPanel({ stage, passport, onSaveField }: IdeaMapPanelProps) {
  const currentSection = (passport[stage] as Record<string, string>) || {};
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingVal, setEditingVal] = useState("");

  const handleEditStart = (key: string, currentVal: string) => {
    setEditingKey(key);
    setEditingVal(currentVal || "");
  };

  const handleSave = async (key: string) => {
    await onSaveField(`${stage}.${key}`, editingVal);
    setEditingKey(null);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ fontSize: "1.1rem", color: "var(--wellb-forest-900)", marginTop: 0, marginBottom: "0.5rem" }}>
        🗺️ Live Idea Map ({stage.toUpperCase()})
      </h2>
      <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", marginBottom: "1rem" }}>
        AI 대화 수락 제안 또는 수동 입력으로 완성되는 Working Passport의 실시간 맵입니다.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {Object.keys(currentSection).length === 0 ? (
          <div style={{ fontSize: "0.85rem", color: "var(--ink-muted)", padding: "1rem", border: "1px dashed var(--surface-border)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
            아직 입력되거나 수락된 데이터가 없습니다. 대화를 나누거나 직접 작성해 보세요.
          </div>
        ) : (
          Object.entries(currentSection).map(([key, val]) => (
            <div key={key} style={{ background: "white", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-md)", padding: "0.75rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wellb-forest-700)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                {key}
              </div>

              {editingKey === key ? (
                <div>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    value={editingVal}
                    onChange={(e) => setEditingVal(e.target.value)}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button type="button" className="btn-primary" style={{ padding: "0.2rem 0.5rem", fontSize: "0.8rem" }} onClick={() => handleSave(key)}>
                      저장
                    </button>
                    <button type="button" className="btn-secondary" style={{ padding: "0.2rem 0.5rem", fontSize: "0.8rem" }} onClick={() => setEditingKey(null)}>
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink-primary)", whiteSpace: "pre-wrap" }}>
                    {val || "(비어 있음)"}
                  </p>
                  <button type="button" style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }} onClick={() => handleEditStart(key, val)}>
                    수정
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        {/* Quick add field */}
        <div style={{ marginTop: "0.5rem" }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ width: "100%", fontSize: "0.85rem", padding: "0.4rem" }}
            onClick={() => handleEditStart("context", "")}
          >
            + 필드 직접 작성하기
          </button>
        </div>
      </div>
    </div>
  );
}
