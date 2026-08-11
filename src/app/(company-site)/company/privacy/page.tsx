import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

export default function Privacy() {
  return (
    <main id="main">
      <section style={{ padding: '5rem 0 4rem', background: 'linear-gradient(180deg, var(--company-mist), #fff)' }}>
        <div style={{ maxWidth: '76rem', margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{ color: 'var(--company-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            <Link href={safeRoute('/company')} style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <span style={{ color: 'var(--company-ink)' }}>Privacy Policy</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--company-ink)', marginBottom: '1.5rem', wordBreak: 'keep-all' }}>
            개인정보 처리방침
          </h1>
          <div style={{ background: '#f6ead2', color: '#846020', padding: '1rem', borderRadius: '0.5rem', display: 'inline-block', fontWeight: 600 }}>
            본 페이지는 프로토타입용 자리표시자입니다
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: '#fff' }}>
        <div style={{ maxWidth: '76rem', margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{ color: 'var(--company-muted)', lineHeight: 1.8 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--company-ink)', marginTop: '2rem', marginBottom: '1rem' }}>1. 개인정보의 처리 목적</h3>
            <p>[내용 준비 중]</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--company-ink)', marginTop: '2rem', marginBottom: '1rem' }}>2. 처리하는 개인정보의 항목</h3>
            <p>[내용 준비 중]</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--company-ink)', marginTop: '2rem', marginBottom: '1rem' }}>3. 개인정보의 처리 및 보유 기간</h3>
            <p>[내용 준비 중]</p>
          </div>
        </div>
      </section>
    </main>
  );
}
