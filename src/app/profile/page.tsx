import { createSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <main id="main" style={{ maxWidth: '40rem', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', color: 'var(--wellb-forest-900)', marginBottom: '1.5rem' }}>내 프로필</h1>

      <section className="card-pane" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '1rem' }}>기본 정보</h2>
        <dl style={{ display: 'grid', gridTemplateColumns: '8rem 1fr', gap: '0.75rem', fontSize: '0.9rem' }}>
          <dt style={{ fontWeight: 600, color: 'var(--ink-secondary)' }}>이메일</dt>
          <dd style={{ margin: 0, color: 'var(--ink-primary)' }}>{user.email}</dd>
          <dt style={{ fontWeight: 600, color: 'var(--ink-secondary)' }}>표시 이름</dt>
          <dd style={{ margin: 0, color: 'var(--ink-primary)' }}>{profile?.display_name ?? '-'}</dd>
          <dt style={{ fontWeight: 600, color: 'var(--ink-secondary)' }}>가입일</dt>
          <dd style={{ margin: 0, color: 'var(--ink-primary)' }}>
            {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('ko-KR') : '-'}
          </dd>
        </dl>
      </section>

      <section className="card-pane">
        <h2 style={{ fontSize: '1.1rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '0.75rem' }}>개인정보 및 데이터</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
          데이터 내보내기 또는 계정 삭제를 요청하려면 관리자에게 문의하세요.
        </p>
      </section>
    </main>
  );
}
