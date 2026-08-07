import { StatusBadge } from '@/components/shared/StatusBadge';
import type { MonthlyChallengeStatus } from '@/types/domain';

interface ChallengeHeroProps {
  title: string;
  summary: string;
  status: MonthlyChallengeStatus;
  closes_at: string | null;
}

export function ChallengeHero({ title, summary, status, closes_at }: ChallengeHeroProps) {
  return (
    <section className="card-pane" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
        <StatusBadge status={status} />
        <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
          마감일: {closes_at ? new Date(closes_at).toLocaleDateString('ko-KR') : '상세 참조'}
        </span>
      </div>
      <h1 style={{ fontSize: '1.75rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '1rem' }}>
        {title}
      </h1>
      <p style={{ fontSize: '1.05rem', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
        {summary}
      </p>
    </section>
  );
}
