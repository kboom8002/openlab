"use client";

import { useState, useTransition } from "react";
import type { ConversationMessageItem } from "@/server/queries/ideas";
import type { StudioStage } from "./StageNavigation";

interface ConversationPanelProps {
  conversationId: string | null;
  stage: StudioStage;
  messages: ConversationMessageItem[];
  onSendMessage: (content: string) => Promise<void>;
  onConfirmSuggestion: (messageId: string, action: "accepted" | "rejected", fieldPath: string, suggestedValue: unknown) => Promise<void>;
}

export function ConversationPanel({
  stage,
  messages,
  onSendMessage,
  onConfirmSuggestion,
}: ConversationPanelProps) {
  const [inputContent, setInputContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    const content = inputContent;
    setInputContent("");

    startTransition(async () => {
      await onSendMessage(content);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: "450px" }}>
      {/* Messages Scroll Area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--ink-muted)", marginTop: "3rem", fontSize: "0.9rem" }}>
            🤖 AI 코치와의 대화를 통해 생각하고 계신 이슈나 해결책을 자유롭게 적어주세요.
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              style={{
                alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                background: m.sender === "user" ? "var(--primary)" : "var(--surface)",
                color: m.sender === "user" ? "white" : "var(--ink-primary)",
                border: m.sender === "user" ? "none" : "1px solid var(--surface-border)",
                borderRadius: "var(--radius-md)",
                padding: "0.875rem 1rem",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "0.25rem", fontWeight: 600 }}>
                {m.sender === "user" ? "참가자" : "AI 코치"}
              </div>
              <p style={{ margin: 0, lineHeight: 1.5, fontSize: "0.95rem", whiteSpace: "pre-wrap" }}>
                {m.content}
              </p>

              {/* AI Suggestion Card with Acceptance Invariant */}
              {m.suggestion_payload && (
                <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px dashed var(--surface-border)", background: "#f8fafc", padding: "0.75rem", borderRadius: "var(--radius-sm)", color: "var(--ink-primary)" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--wellb-forest-700)", marginBottom: "0.25rem" }}>
                    💡 제안 카드 (확인 후 Working Passport 반영)
                  </div>
                  <p style={{ fontSize: "0.85rem", margin: "0 0 0.5rem 0" }}>
                    <strong>요약:</strong> {String(m.suggestion_payload.suggested_text || "")}
                  </p>
                  
                  {m.suggestion_status === "accepted" ? (
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--success-ink)" }}>
                      ✓ Passport에 반영됨
                    </span>
                  ) : m.suggestion_status === "rejected" ? (
                    <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>
                      ✕ 반영 거절됨
                    </span>
                  ) : (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                      <button
                        type="button"
                        className="btn-primary"
                        style={{ padding: "0.25rem 0.625rem", fontSize: "0.85rem" }}
                        onClick={() =>
                          onConfirmSuggestion(
                            m.id,
                            "accepted",
                            `${stage}.context`,
                            m.suggestion_payload?.suggested_text
                          )
                        }
                      >
                        수락 & Passport 반영
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ padding: "0.25rem 0.625rem", fontSize: "0.85rem" }}
                        onClick={() =>
                          onConfirmSuggestion(
                            m.id,
                            "rejected",
                            `${stage}.context`,
                            m.suggestion_payload?.suggested_text
                          )
                        }
                      >
                        거절
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Composer */}
      <form onSubmit={handleSend} style={{ borderTop: "1px solid var(--surface-border)", padding: "0.75rem 1rem", background: "white", display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          className="form-input"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder={`${stage} 단계에 대한 생각이나 의견을 입력하세요...`}
          disabled={isPending}
          aria-label="코치 대화 입력"
        />
        <button type="submit" className="btn-primary" disabled={isPending || !inputContent.trim()}>
          {isPending ? "전송 중..." : "전송"}
        </button>
      </form>
    </div>
  );
}
