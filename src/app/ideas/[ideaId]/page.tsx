import Link from 'next/link';
import { notFound } from 'next/navigation';
import { safeRoute } from '@/lib/routes';
import { getPublicIdeaById } from '@/server/queries/ideas';
import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { RightsNotice } from '@/components/shared/RightsNotice';

export const dynamic = 'force-dynamic';

interface IdeaDetailPageProps {
  params: Promise<{ ideaId: string }>;
}

export default async function PublicIdeaDetailPage({ params }: IdeaDetailPageProps) {
  const resolvedParams = await params;
  const { idea, error } = await getPublicIdeaById(resolvedParams.ideaId);

  if (error || !idea) {
    notFound();
  }

  return (
    <>
      <PublicHeader />
      <main id="main" style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <nav aria-label="브레드크럼" style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--ink-muted)' }}>
          <Link href={safeRoute('/ideas')}>아이디어 갤러리</Link>{' > '}
          <span>{idea.title}</span>
        </nav>

        <section className="card-pane" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <StatusBadge status={idea.status} />
            <time style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
              최근 수정: {new Date(idea.updated_at).toLocaleDateString('ko-KR')}
            </time>
          </div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '1rem' }}>
            {idea.title}
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
            이 아이디어는 공개된 상태로, 현재 {idea.status} 단계에 있습니다.
            제출된 Idea Passport의 전뤨은 제출자의 동의 하에 Showcase를 통해 공개됩니다.
          </p>
        </section>

        <RightsNotice />

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href={safeRoute('/ideas')} className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>
            ← 갤러리로 돌아가기
          </Link>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
