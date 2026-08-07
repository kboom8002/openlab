import Link from 'next/link';
import { safeRoute } from '@/lib/routes';
import { getMyIdeas } from '@/server/queries/ideas';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';

export const dynamic = 'force-dynamic';

export default async function MyIdeasPage() {
  const { ideas, error } = await getMyIdeas();

  return (
    <main id="main" style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--wellb-forest-900)', margin: 0 }}>내 아이디어</h1>
        <Link href={safeRoute('/challenges')} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
          새 아이디어 →
        </Link>
      </header>

      {error && (
        <div className="alert-box alert-error" role="alert">
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}

      {!error && ideas.length === 0 && (
        <EmptyState
          icon="💡"
          title="아직 작성한 아이디어가 없습니다"
          description="챌린지에 참여해 첫 번째 아이디어를 시작해보세요."
          action={{ label: '챌린지 둘러보기', href: '/challenges' }}
        />
      )}

      {!error && ideas.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {ideas.map((idea) => (
            <article key={idea.id} className="card-pane" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link
                  href={safeRoute(`/my/ideas/${idea.id}`)}
                  style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink-primary)', textDecoration: 'none' }}
                >
                  {idea.title}
                </Link>
                <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', margin: '0.25rem 0 0' }}>
                  최근 수정: {new Date(idea.updated_at).toLocaleDateString('ko-KR')}
                </p>
              </div>
              <StatusBadge status={idea.status} />
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
