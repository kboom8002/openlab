import Link from 'next/link';
import { safeRoute } from '@/lib/routes';
import { ChallengeCard } from '@/features/challenges/components/ChallengeCard';
import { EmptyState } from '@/components/shared/EmptyState';
import type { MonthlyChallengeStatus } from '@/types/domain';

interface Challenge {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: MonthlyChallengeStatus;
  opens_at: string | null;
  closes_at: string | null;
}

interface ActiveChallengeSectionProps {
  challenges: Challenge[];
}

export function ActiveChallengeSection({ challenges }: ActiveChallengeSectionProps) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--wellb-forest-900)', margin: 0 }}>
          🔥 주목할 만한 챌린지
        </h2>
        <Link href={safeRoute('/challenges')} style={{ fontSize: '0.9rem', fontWeight: 600 }}>
          전체 보기 →
        </Link>
      </div>

      {challenges.length === 0 ? (
        <EmptyState
          icon="📋"
          title="현재 접수 중인 챌린지를 불러오고 있습니다."
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {challenges.slice(0, 3).map((c) => (
            <ChallengeCard key={c.id} {...c} />
          ))}
        </div>
      )}
    </section>
  );
}
