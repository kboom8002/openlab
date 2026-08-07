import { notFound, redirect } from "next/navigation";
import { getPassportDetail, runPreflightAnalysis } from "@/server/queries/passport";
import { SubmissionWizardClient } from "@/features/ideas/components/passport/SubmissionWizardClient";
import { safeRoute } from "@/lib/routes";

export const dynamic = "force-dynamic";

interface SubmitPageProps {
  params: Promise<{ ideaId: string }>;
}

export default async function IdeaSubmitPage({ params }: SubmitPageProps) {
  const resolvedParams = await params;
  const { idea, isOwner, error } = await getPassportDetail(resolvedParams.ideaId);

  if (error || !idea || !isOwner) {
    notFound();
  }

  // If already submitted, redirect to immutable passport view
  if (idea.status === "SUBMITTED") {
    redirect(safeRoute(`/ideas/${idea.id}/passport`));
  }

  const preflightResult = runPreflightAnalysis(idea.working_passport);

  return (
    <SubmissionWizardClient
      idea={idea}
      preflightResult={preflightResult}
    />
  );
}
