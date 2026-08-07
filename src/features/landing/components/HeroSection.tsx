import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

export function HeroSection() {
  return (
    <section
      className="card-pane"
      style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        marginBottom: '2rem',
        background: 'linear-gradient(180deg, #ffffff 0%, var(--wellb-sage-100) 100%)',
      }}
    >
      <p
        style={{
          fontSize: '0.9rem',
          fontWeight: 700,
          color: 'var(--wellb-forest-700)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
        }}
      >
        WELLB OPENLAB — AI-Augmented Open Innovation
      </p>
      <h1
        style={{
          fontSize: '2.25rem',
          color: 'var(--wellb-forest-900)',
          marginTop: 0,
          marginBottom: '1rem',
          lineHeight: 1.3,
        }}
      >
        지역과 일상의 문제를<br />실증 가능한 제안으로 발전시키세요
      </h1>
      <p
        style={{
          fontSize: '1.05rem',
          color: 'var(--ink-secondary)',
          maxWidth: '40rem',
          margin: '0 auto 2rem auto',
          lineHeight: 1.6,
        }}
      >
        AI 코치와 함께 아이디어를 구조화하고, 다층 검토를 거쳐 실제 현장에서 검증되는 오픈이노베이션 생태계에 참여해보세요.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          href={safeRoute('/challenges')}
          className="btn-primary"
          style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}
        >
          진행 중인 챌린지 둘러보기 →
        </Link>
        <Link
          href={safeRoute('/sign-in')}
          className="btn-secondary"
          style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}
        >
          시작하기 (로그인/가입)
        </Link>
      </div>
    </section>
  );
}
