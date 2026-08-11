import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getChallengeBySlug } from '@/server/queries/challenges';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { safeRoute } from '@/lib/routes';
import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { RightsNotice } from '@/components/shared/RightsNotice';
import { ChallengeHero, ChallengeTimeline, ParticipationCTA } from '@/features/challenges/components';
import { SponsorDisclosure } from '@/features/landing/components/SponsorDisclosure';
import type { MonthlyChallengeStatus } from '@/types/domain';

export const dynamic = 'force-dynamic';

interface ChallengeDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const resolvedParams = await params;
  const { challenge, error } = await getChallengeBySlug(resolvedParams.slug);

  if (error || !challenge) {
    notFound();
  }

  let user = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Auth context optional for public detail view
  }

  const isOpen = challenge.status === 'OPEN';

  return (
    <>
      <PublicHeader />
      <main id="main" style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Breadcrumb */}
        <nav aria-label="브레드크럼" style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--ink-muted)' }}>
          <Link href={safeRoute('/challenges')}>챌린지 목록</Link>{' > '}
          <span>{challenge.title}</span>
        </nav>

        <ChallengeHero
          title={challenge.title}
          summary={challenge.summary}
          status={challenge.status as MonthlyChallengeStatus}
          closes_at={challenge.closes_at}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <article className="card-pane">
              <h2 style={{ fontSize: '1.25rem', color: 'var(--wellb-forest-900)', marginTop: 0 }}>
                🎯 핵심 과제 및 배경
              </h2>
              <p style={{ lineHeight: '1.6', color: 'var(--ink-secondary)' }}>
                본 챌린지는 현장과 지역사회에서 지속적으로 발생하는 복합적 문제에 대해, 참가자가 현장 관찰 및 문제 정의부터 출발하여 AI 코칭과 함께 실증 가능성을 갖춴 제안(Idea Passport)으로 완성하는 과정입니다.
              </p>
            </article>

            <ChallengeTimeline />
            <RightsNotice />
            <SponsorDisclosure />
          </div>

          <ParticipationCTA
            challengeId={challenge.id}
            challengeSlug={challenge.slug}
            isOpen={isOpen}
            isAuthenticated={!!user}
          />
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
