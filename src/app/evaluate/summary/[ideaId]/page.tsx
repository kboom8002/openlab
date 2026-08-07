import { notFound } from "next/navigation";
import { getPassportDetail } from "@/server/queries/passport";
import { getCompositeEvaluationSummary } from "@/server/queries/evaluation";
import { CompositeScoreCard } from "@/features/evaluation/components/CompositeScoreCard";

export const dynamic = "force-dynamic";

interface SummaryPageProps {
  params: Promise<{ ideaId: string }>;
}

export default async function CompositeSummaryPage({ params }: SummaryPageProps) {
  const resolvedParams = await params;
  const { idea, submittedVersion, error } = await getPassportDetail(resolvedParams.ideaId);

  if (error || !idea) {
    notFound();
  }

  const versionId = idea.submitted_version_id || idea.id;
  const { summary } = await getCompositeEvaluationSummary(versionId);

  return (
    <main id="main" style={{ maxWidth: "52rem", margin: "2rem auto" }}>
      <header className="card-pane" style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.6rem", color: "var(--wellb-forest-900)", margin: 0 }}>
          📊 다층 심사 종합 결과 대시보드
        </h1>
        <p style={{ color: "var(--ink-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
          아이디어: <strong>{idea.title}</strong> ({submittedVersion ? `제출 버전 v${submittedVersion.version_number}` : "Working Version"})
        </p>
      </header>

      {summary && <CompositeScoreCard summary={summary} />}
    </main>
  );
}
