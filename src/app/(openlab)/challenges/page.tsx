import { getPublicChallenges } from '@/server/queries/challenges';
import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { EmptyState } from '@/components/shared/EmptyState';
import { ChallengeCard, ChallengeStatusTabs } from '@/features/challenges/components';
import type { MonthlyChallengeStatus } from '@/types/domain';

export const dynamic = 'force-dynamic';

interface ChallengesPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function ChallengesPage({ searchParams }: ChallengesPageProps) {
  const resolvedParams = await searchParams;
  const currentStatus = resolvedParams.status || 'ALL';

  const { challenges, error } = await getPublicChallenges(currentStatus);

  return (
    <>
      <PublicHeader />
      <main id="main" style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--wellb-forest-900)', marginBottom: '0.5rem' }}>
            월간 오픈이노베이션 챌린지
          </h1>
          <p style={{ color: 'var(--ink-secondary)', fontSize: '1rem', margin: 0 }}>
            현장과 일상의 문제를 함께 정의하고 실증 가능한 제안으로 발전시킵니다.
          </p>
        </header>

        <ChallengeStatusTabs currentStatus={currentStatus} />

        {error && (
          <div className="alert-box alert-error" role="alert">
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {!error && challenges.length === 0 && (
          <EmptyState
            icon="📂"
            title="해당 조건의 챌린지가 없습니다"
            description="다른 상태 필터를 선택하거나 전체 목록을 확인해보세요."
            action={{ label: '필터 초기화', href: '/challenges' }}
          />
        )}

        {!error && challenges.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {challenges.map((c) => (
              <ChallengeCard
                key={c.id}
                id={c.id}
                slug={c.slug}
                title={c.title}
                summary={c.summary}
                status={c.status as MonthlyChallengeStatus}
                opens_at={c.opens_at}
                closes_at={c.closes_at}
              />
            ))}
          </div>
        )}
      </main>
      <PublicFooter />
    </>
  );
}
