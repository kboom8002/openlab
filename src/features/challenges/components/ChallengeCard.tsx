import Link from 'next/link';
import { safeRoute } from '@/lib/routes';
import { StatusBadge } from '@/components/shared/StatusBadge';
import type { MonthlyChallengeStatus } from '@/types/domain';

interface ChallengeCardProps {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: MonthlyChallengeStatus;
  opens_at?: string | null;
  closes_at?: string | null;
}

export function ChallengeCard({ slug, title, summary, status, closes_at }: ChallengeCardProps) {
  return (
    <article className="card-pane" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <StatusBadge status={status} />
        {closes_at && (
          <time style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
            마감: {new Date(closes_at).toLocaleDateString('ko-KR')}
          </time>
        )}
      </div>
      <h3 style={{ fontSize: '1.1rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '0.5rem' }}>
        <Link href={safeRoute(`/challenges/${slug}`)} style={{ textDecoration: 'none', color: 'inherit' }}>
          {title}
        </Link>
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', flex: 1, marginBottom: '1rem', lineHeight: 1.5 }}>
        {summary}
      </p>
      <Link
        href={safeRoute(`/challenges/${slug}`)}
        className="btn-secondary"
        style={{ textAlign: 'center', width: '100%' }}
      >
        상세 보기
      </Link>
    </article>
  );
}
