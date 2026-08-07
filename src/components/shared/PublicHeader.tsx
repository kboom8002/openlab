import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

export function PublicHeader() {
  return (
    <header
      role="banner"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--border-soft)',
        background: 'var(--surface-base)',
      }}
    >
      <Link
        href={safeRoute('/')}
        style={{
          textDecoration: 'none',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--wellb-forest-900)',
          letterSpacing: '-0.02em',
        }}
      >
        WELLB OPENLAB
      </Link>
      <nav aria-label="주요 탐색" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href={safeRoute('/challenges')} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--ink-secondary)' }}>
          챌린지
        </Link>
        <Link href={safeRoute('/how-it-works')} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--ink-secondary)' }}>
          참여 방법
        </Link>
        <Link href={safeRoute('/sign-in')} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
          로그인
        </Link>
      </nav>
    </header>
  );
}
