import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

export function FinalCTA() {
  return (
    <section
      className="card-pane"
      style={{
        textAlign: 'center',
        padding: '2.5rem 2rem',
        background: 'var(--wellb-sage-100)',
        marginBottom: '2rem',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '0.75rem' }}>
        지금 시작하세요
      </h2>
      <p style={{ fontSize: '0.95rem', color: 'var(--ink-secondary)', maxWidth: '32rem', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
        당신의 아이디어가 실제 변화를 만들어낼 수 있습니다. AI 코치와 함께 첫 걸음을 내딛으세요.
      </p>
      <Link href={safeRoute('/sign-in')} className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
        참여하기 →
      </Link>
    </section>
  );
}
