import Link from 'next/link';
import { safeRoute } from '@/lib/routes';
import { getPublicIdeas } from '@/server/queries/ideas';
import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';

export const dynamic = 'force-dynamic';

export default async function IdeaGalleryPage() {
  const { ideas, error } = await getPublicIdeas();

  return (
    <>
      <PublicHeader />
      <main id="main" style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--wellb-forest-900)', marginBottom: '0.5rem' }}>
            아이디어 갤러리
          </h1>
          <p style={{ color: 'var(--ink-secondary)', fontSize: '1rem', margin: 0 }}>
            참여자들이 공개한 아이디어를 둘러보세요.
          </p>
        </header>

        {error && (
          <div className="alert-box alert-error" role="alert">
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {!error && ideas.length === 0 && (
          <EmptyState
            icon="💡"
            title="공개된 아이디어가 아직 없습니다"
            description="챌린지에 참여하고 공개 아이디어를 제출해보세요."
            action={{ label: '챌린지 둘러보기', href: '/challenges' }}
          />
        )}

        {!error && ideas.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {ideas.map((idea) => (
              <article key={idea.id} className="card-pane" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <StatusBadge status={idea.status} />
                  <time style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>
                    {new Date(idea.updated_at).toLocaleDateString('ko-KR')}
                  </time>
                </div>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '0.75rem', flex: 1 }}>
                  <Link href={safeRoute(`/ideas/${idea.id}`)} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {idea.title}
                  </Link>
                </h3>
                <Link href={safeRoute(`/ideas/${idea.id}`)} className="btn-secondary" style={{ textAlign: 'center', width: '100%' }}>
                  상세 보기
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
      <PublicFooter />
    </>
  );
}
