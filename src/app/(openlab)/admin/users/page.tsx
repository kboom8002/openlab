import { createSupabaseServerClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/shared/EmptyState';
import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name, created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  const items = profiles ?? [];

  return (
    <main id="main" style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--wellb-forest-900)', margin: 0 }}>사용자 관리</h1>
        <Link href={safeRoute('/admin')} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>← 대시보드</Link>
      </header>

      {items.length === 0 ? (
        <EmptyState icon="👤" title="등록된 사용자가 없습니다" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {items.map((p) => (
            <article key={p.id} className="card-pane" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink-primary)', margin: '0 0 0.25rem' }}>
                  {p.display_name || '미설정'}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', margin: 0 }}>
                  가입일: {new Date(p.created_at).toLocaleDateString('ko-KR')}
                </p>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{p.id.slice(0, 8)}</span>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
