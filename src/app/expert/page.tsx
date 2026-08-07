import { createSupabaseServerClient } from '@/lib/supabase/server';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

export const dynamic = 'force-dynamic';

export default async function ExpertWorkspacePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: assignments } = await supabase
    .from('evaluation_assignments')
    .select('id, status, created_at, updated_at, idea_versions(id, title)')
    .eq('evaluator_id', user.id)
    .order('created_at', { ascending: false });

  const items = assignments ?? [];

  return (
    <main id="main" style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--wellb-forest-900)', margin: 0 }}>전문가 워크스페이스</h1>
        <Link href={safeRoute('/expert/guide')} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          평가 가이드
        </Link>
      </header>

      <section className="card-pane" style={{ marginBottom: '1.5rem', display: 'flex', gap: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--wellb-forest-900)', margin: '0 0 0.25rem' }}>
            {items.length}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', margin: 0 }}>전체 배정</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--wellb-forest-900)', margin: '0 0 0.25rem' }}>
            {items.filter((a) => a.status === 'SUBMITTED').length}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', margin: 0 }}>완료</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--wellb-forest-900)', margin: '0 0 0.25rem' }}>
            {items.filter((a) => a.status === 'ASSIGNED' || a.status === 'IN_PROGRESS').length}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', margin: 0 }}>대기 중</p>
        </div>
      </section>

      {items.length === 0 ? (
        <EmptyState icon="📝" title="배정된 평가가 없습니다" description="새로운 평가 배정이 있으면 알림을 보내드립니다." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((a) => (
            <article key={a.id} className="card-pane" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink-primary)', margin: '0 0 0.25rem' }}>
                  평가 배정 #{a.id.slice(0, 8)}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', margin: 0 }}>
                  배정일: {new Date(a.created_at).toLocaleDateString('ko-KR')}
                </p>
              </div>
              <StatusBadge status={a.status} />
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
