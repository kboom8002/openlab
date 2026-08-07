import Link from 'next/link';
import { safeRoute } from '@/lib/routes';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import type { IdeaStatus } from '@/types/domain';

export const dynamic = 'force-dynamic';

interface DashboardIdea {
  id: string;
  title: string;
  status: IdeaStatus;
  updated_at: string;
  challenge: { slug: string; title: string } | null;
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null; // Middleware handles redirect
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', user.id)
    .single();

  const { data: ideas } = await supabase
    .from('ideas')
    .select('id, title, status, updated_at, monthly_challenges(slug, title)')
    .eq('owner_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(5);

  const myIdeas = (ideas ?? []) as unknown as DashboardIdea[];

  return (
    <main id="main" style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--wellb-forest-900)', marginBottom: '0.5rem' }}>
          안녕하세요, {profile?.display_name ?? '참여자'}님 👋
        </h1>
        <p style={{ color: 'var(--ink-secondary)', margin: 0 }}>오늘의 활동을 확인하세요.</p>
      </header>

      <section style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', color: 'var(--wellb-forest-900)', margin: 0 }}>내 아이디어</h2>
          <Link href={safeRoute('/my/ideas')} style={{ fontSize: '0.85rem', fontWeight: 600 }}>전체 보기 →</Link>
        </div>

        {myIdeas.length === 0 ? (
          <EmptyState
            icon="💡"
            title="아직 작성한 아이디어가 없습니다"
            description="챌린지에 참여해 첫 번째 아이디어를 시작해보세요."
            action={{ label: '챌린지 둘러보기', href: '/challenges' }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {myIdeas.map((idea) => (
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
      </section>

      <section>
        <h2 style={{ fontSize: '1.15rem', color: 'var(--wellb-forest-900)', marginBottom: '1rem' }}>추천 챌린지</h2>
        <div className="card-pane" style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--ink-muted)', margin: 0 }}>
            <Link href={safeRoute('/challenges')} style={{ fontWeight: 600 }}>진행 중인 챌린지 →</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
