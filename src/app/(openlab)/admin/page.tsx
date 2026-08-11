import { createSupabaseServerClient } from '@/lib/supabase/server';
import { StatusBadge } from '@/components/shared/StatusBadge';
import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Dashboard stats
  const [challengeCount, ideaCount, userCount] = await Promise.all([
    supabase.from('monthly_challenges').select('id', { count: 'exact', head: true }),
    supabase.from('ideas').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
  ]);

  const stats = [
    { label: '챌린지', count: challengeCount.count ?? 0, icon: '🏆' },
    { label: '아이디어', count: ideaCount.count ?? 0, icon: '💡' },
    { label: '사용자', count: userCount.count ?? 0, icon: '👤' },
  ];

  // Recent challenges
  const { data: challenges } = await supabase
    .from('monthly_challenges')
    .select('id, slug, title, status, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <main id="main" style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--wellb-forest-900)', marginBottom: '0.25rem' }}>관리자 대시보드</h1>
        <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', margin: 0 }}>WELLB OPENLAB 플랫폼 관리</p>
      </header>

      {/* Stats */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s) => (
          <div key={s.label} className="card-pane" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <p style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{s.icon}</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--wellb-forest-900)', margin: '0 0 0.25rem' }}>{s.count}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Recent Challenges */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', color: 'var(--wellb-forest-900)', margin: 0 }}>최근 챌린지</h2>
          <Link href={safeRoute('/admin/challenges')} style={{ fontSize: '0.85rem', fontWeight: 600 }}>전체 보기 →</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {(challenges ?? []).map((c) => (
            <article key={c.id} className="card-pane" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink-primary)', margin: '0 0 0.25rem' }}>{c.title}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', margin: 0 }}>
                  {new Date(c.created_at).toLocaleDateString('ko-KR')}
                </p>
              </div>
              <StatusBadge status={c.status} />
            </article>
          ))}
        </div>
      </section>

      {/* Admin Nav */}
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.15rem', color: 'var(--wellb-forest-900)', marginBottom: '1rem' }}>관리 메뉴</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { href: '/admin/challenges', label: '챌린지 관리', icon: '🏆' },
            { href: '/admin/users', label: '사용자 관리', icon: '👥' },
            { href: '/admin/evaluations', label: '평가 관리', icon: '📊' },
            { href: '/admin/pilots', label: '파일럿 프로젝트 관리', icon: '🚀' },
            { href: '/admin/audit', label: '감사 로그', icon: '📝' },
          ].map((item) => (
            <Link
              key={item.href}
              href={safeRoute(item.href)}
              className="card-pane"
              style={{ textAlign: 'center', padding: '1.25rem', textDecoration: 'none', display: 'block' }}
            >
              <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink-primary)', margin: 0 }}>{item.label}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
