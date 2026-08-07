import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

export function PublicFooter() {
  return (
    <footer
      role="contentinfo"
      style={{
        padding: '2rem',
        borderTop: '1px solid var(--border-soft)',
        background: 'var(--wellb-forest-900)',
        color: 'rgba(255,255,255,0.7)',
        marginTop: '3rem',
      }}
    >
      <div style={{ maxWidth: '64rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <p style={{ fontWeight: 700, color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>
            WELLB OPENLAB
          </p>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.5, maxWidth: '20rem' }}>
            AI 증강 오픈이노베이션 플랫폼
          </p>
        </div>
        <nav aria-label="하단 링크" style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href={safeRoute('/about')} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>소개</Link>
            <Link href={safeRoute('/how-it-works')} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>참여 방법</Link>
            <Link href={safeRoute('/faq')} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>자주 묻는 질문</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href={safeRoute('/organizations')} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>기관 참여</Link>
            <Link href={safeRoute('/challenges')} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>챌린지</Link>
          </div>
        </nav>
      </div>
      <div style={{ maxWidth: '64rem', margin: '1.5rem auto 0', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: '0.75rem' }}>
        © {new Date().getFullYear()} WELLB Company. 아이디어 권리는 원칙적으로 제출자에게 유지됩니다.
      </div>
    </footer>
  );
}
