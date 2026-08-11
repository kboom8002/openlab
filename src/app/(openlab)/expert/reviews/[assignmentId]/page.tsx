import { notFound } from "next/navigation";
import { getExpertAssignment } from "@/server/queries/evaluation";
import { ExpertReviewClient } from "@/features/evaluation/components/ExpertReviewClient";

export const dynamic = "force-dynamic";

interface ExpertReviewPageProps {
  params: Promise<{ assignmentId: string }>;
}

export default async function ExpertReviewPage({ params }: ExpertReviewPageProps) {
  const resolvedParams = await params;
  const { assignment, error } = await getExpertAssignment(resolvedParams.assignmentId);

  if (error || !assignment) {
    notFound();
  }

  return <ExpertReviewClient assignment={assignment} />;
}
