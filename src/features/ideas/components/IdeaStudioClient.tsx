"use client";

import { useState, useTransition } from "react";
import type { WorkingPassport, ConversationMessageItem, IdeaItem } from "@/server/queries/ideas";
import { updateWorkingPassportAction, sendStudioMessageAction, confirmAiSuggestionAction } from "@/server/actions/idea-draft";
import { StudioHeader } from "./StudioHeader";
import { StageNavigation, type StudioStage } from "./StageNavigation";
import { ConversationPanel } from "./ConversationPanel";
import { IdeaMapPanel } from "./IdeaMapPanel";

interface IdeaStudioClientProps {
  initialIdea: IdeaItem & { working_passport: WorkingPassport };
  initialConversationId: string | null;
  initialMessages: ConversationMessageItem[];
}

export function IdeaStudioClient({
  initialIdea,
  initialConversationId,
  initialMessages,
}: IdeaStudioClientProps) {
  const [idea, setIdea] = useState<IdeaItem & { working_passport: WorkingPassport }>(initialIdea);
  const [messages, setMessages] = useState(initialMessages);
  const [currentStage, setCurrentStage] = useState<StudioStage>("identity");

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handleSendMessage = async (content: string) => {
    if (!initialConversationId) return;

    // Optimistic user message addition
    const tempUserMsg: ConversationMessageItem = {
      id: crypto.randomUUID(),
      role: "user",
      sender: "user",
      content,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    const res = await sendStudioMessageAction({
      conversationId: initialConversationId,
      content,
      stage: currentStage,
    });

    if (res.ok) {
      // Optimistic AI message addition from stub response
      const tempAiMsg: ConversationMessageItem = {
        id: res.data.aiMessageId,
        role: "assistant",
        sender: "ai_coach",
        content: `💡 AI 코치 의견: "${content}" 관점에 대해 작성해주셨군요. 아래 제안 내용을 확인하고 Working Passport에 반영할지 선택하세요.`,
        suggestion_payload: {
          stage: currentStage,
          suggested_field: `${currentStage}.context`,
          suggested_text: `${content} (AI 구조화 요약)`,
          rationale: "현장 문제와 직접 연계된 실증 가능 요소로 요약되었습니다.",
        },
        suggestion_status: "pending",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, tempAiMsg]);
    } else {
      setErrorMessage(res.error.message);
    }
  };

  const handleConfirmSuggestion = async (
    messageId: string,
    action: "accepted" | "rejected",
    fieldPath: string,
    suggestedValue: unknown
  ) => {
    setIsSaving(true);
    const res = await confirmAiSuggestionAction({
      messageId,
      ideaId: idea.id,
      expectedRevision: idea.revision,
      action,
      fieldPath,
      suggestedValue,
      currentPassport: idea.working_passport as unknown as Record<string, unknown>,
    });

    if (res.ok) {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, suggestion_status: action } : m))
      );
      if (action === "accepted" && res.data.revision) {
        const [section, field] = fieldPath.split(".");
        const updatedPassport = { ...(idea.working_passport as unknown as Record<string, Record<string, unknown>>) };
        if (section && field) {
          const secObj = { ...(updatedPassport[section] || {}) };
          secObj[field] = suggestedValue;
          updatedPassport[section] = secObj;
        }
        setIdea((prev: typeof idea) => ({
          ...prev,
          revision: res.data.revision as number,
          working_passport: updatedPassport as unknown as WorkingPassport,
        }));
      }
    } else {
      setErrorMessage(res.error.message);
    }
    setIsSaving(false);
  };

  const handleSaveField = async (fieldPath: string, value: string) => {
    setIsSaving(true);
    const [section, field] = fieldPath.split(".");
    const updatedPassport = { ...(idea.working_passport as unknown as Record<string, Record<string, unknown>>) };

    if (section && field) {
      const secObj = { ...(updatedPassport[section] || {}) };
      secObj[field] = value;
      updatedPassport[section] = secObj;
    }

    startTransition(async () => {
      const res = await updateWorkingPassportAction({
        ideaId: idea.id,
        passport: updatedPassport,
        expectedRevision: idea.revision,
      });

      if (res.ok) {
        setIdea((prev: typeof idea) => ({
          ...prev,
          revision: res.data.revision,
          working_passport: updatedPassport as unknown as WorkingPassport,
        }));
      } else {
        setErrorMessage(res.error.message);
      }
      setIsSaving(false);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 10rem)", margin: "-1.5rem" }}>
      <StudioHeader
        title={idea.title}
        revision={idea.revision ?? 0}
        challengeTitle={idea.monthly_challenges?.title}
        isSaving={isSaving}
      />

      {errorMessage && (
        <div className="alert-box alert-error" style={{ margin: "1rem" }} role="alert">
          {errorMessage}
        </div>
      )}

      {/* 3-Panel Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", flex: 1, gap: "1px", background: "var(--surface-border)" }}>
        {/* Panel 1: Stage Navigator */}
        <aside style={{ background: "white", padding: "1rem" }}>
          <h2 style={{ fontSize: "1rem", color: "var(--wellb-forest-900)", marginTop: 0, marginBottom: "0.75rem" }}>
            7단계 Working Passport
          </h2>
          <StageNavigation currentStage={currentStage} onSelectStage={(s) => setCurrentStage(s)} />
        </aside>

        {/* Panel 2: Conversation & Composer */}
        <main style={{ background: "white", display: "flex", flexDirection: "column" }}>
          <ConversationPanel
            conversationId={initialConversationId}
            stage={currentStage}
            messages={messages}
            onSendMessage={handleSendMessage}
            onConfirmSuggestion={handleConfirmSuggestion}
          />
        </main>

        {/* Panel 3: Live Idea Map */}
        <aside style={{ background: "white", borderLeft: "1px solid var(--surface-border)" }}>
          <IdeaMapPanel
            stage={currentStage}
            passport={idea.working_passport}
            onSaveField={handleSaveField}
          />
        </aside>
      </div>
    </div>
  );
}
