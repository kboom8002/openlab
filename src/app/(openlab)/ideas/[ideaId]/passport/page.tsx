import { notFound } from "next/navigation";
import { getPassportDetail } from "@/server/queries/passport";
import { PassportHeader } from "@/features/ideas/components/passport/PassportHeader";
import { PassportSectionView } from "@/features/ideas/components/passport/PassportSectionView";

export const dynamic = "force-dynamic";

interface PassportPageProps {
  params: Promise<{ ideaId: string }>;
}

export default async function IdeaPassportPage({ params }: PassportPageProps) {
  const resolvedParams = await params;
  const { idea, submittedVersion, isOwner, error } = await getPassportDetail(resolvedParams.ideaId);

  if (error || !idea) {
    notFound();
  }

  const isSubmitted = idea.status === "SUBMITTED" && !!submittedVersion;
  const activePassport = isSubmitted ? submittedVersion.passport : idea.working_passport;

  return (
    <main id="main">
      <PassportHeader
        ideaId={idea.id}
        title={isSubmitted ? submittedVersion.title : idea.title}
        status={idea.status}
        isSubmitted={isSubmitted}
        versionNumber={submittedVersion?.version_number}
        submittedAt={submittedVersion?.submitted_at}
        isOwner={isOwner}
      />

      <PassportSectionView passport={activePassport} />
    </main>
  );
}
