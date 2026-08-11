import { createSupabaseServerClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/shared/EmptyState';

export const dynamic = 'force-dynamic';

export default async function NotificationsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  const items = notifications ?? [];

  return (
    <main id="main" style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', color: 'var(--wellb-forest-900)', marginBottom: '1.5rem' }}>알림</h1>

      {items.length === 0 ? (
        <EmptyState icon="🔔" title="새로운 알림이 없습니다" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {items.map((n) => (
            <article
              key={n.id}
              className="card-pane"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                opacity: n.read_at ? 0.6 : 1,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.9rem', fontWeight: n.read_at ? 400 : 600, color: 'var(--ink-primary)', margin: '0 0 0.25rem' }}>
                  {n.title}
                </p>
                {n.body && <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', margin: 0 }}>{n.body}</p>}
              </div>
              <time style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                {new Date(n.created_at).toLocaleDateString('ko-KR')}
              </time>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
