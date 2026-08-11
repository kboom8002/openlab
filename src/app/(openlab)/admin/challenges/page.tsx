import { createSupabaseServerClient } from '@/lib/supabase/server';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

export const dynamic = 'force-dynamic';

export default async function AdminChallengesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: challenges } = await supabase
    .from('monthly_challenges')
    .select('*')
    .order('created_at', { ascending: false });

  const items = challenges ?? [];

  return (
    <main id="main" style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--wellb-forest-900)', marginBottom: '0.25rem' }}>챌린지 관리</h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem', margin: 0 }}>전체 {items.length}개</p>
        </div>
        <Link href={safeRoute('/admin')} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          ← 대시보드
        </Link>
      </header>

      {items.length === 0 ? (
        <EmptyState icon="🏆" title="등록된 챌린지가 없습니다" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((c) => (
            <article key={c.id} className="card-pane" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink-primary)', margin: '0 0 0.25rem' }}>{c.title}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', margin: 0 }}>
                  slug: {c.slug} · {new Date(c.created_at).toLocaleDateString('ko-KR')}
                </p>
              </div>
              <StatusBadge status={c.status} />
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
