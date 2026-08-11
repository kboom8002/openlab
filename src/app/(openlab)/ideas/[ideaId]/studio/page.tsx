import { notFound } from "next/navigation";
import { getIdeaStudioContext } from "@/server/queries/ideas";
import { IdeaStudioClient } from "@/features/ideas/components/IdeaStudioClient";

export const dynamic = "force-dynamic";

interface StudioPageProps {
  params: Promise<{ ideaId: string }>;
}

export default async function IdeaStudioPage({ params }: StudioPageProps) {
  const resolvedParams = await params;
  const ctx = await getIdeaStudioContext(resolvedParams.ideaId);

  if (ctx.error || !ctx.idea) {
    notFound();
  }

  return (
    <IdeaStudioClient
      initialIdea={ctx.idea}
      initialConversationId={ctx.conversationId}
      initialMessages={ctx.messages}
    />
  );
}
