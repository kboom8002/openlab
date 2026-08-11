import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

export default function OrganizationsPage() {
  return (
    <>
      <PublicHeader />
      <main id="main" style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--wellb-forest-900)', marginBottom: '1.5rem' }}>기관 참여 안내</h1>
        <section className="card-pane" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '1rem' }}>기관이 할 수 있는 것</h2>
          <ul style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>월간 챌린지 주제 제안</li>
            <li>참여자 아이디어에 대한 집계 보고서 열람</li>
            <li>선발된 아이디어의 파일럿 실증 지원</li>
          </ul>
          <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: '1rem', fontStyle: 'italic' }}>
            ※ 스폰서는 초안·비공개 아이디어·AI 대화에 자동 접근할 수 없습니다.
          </p>
        </section>
        <div style={{ textAlign: 'center' }}>
          <Link href={safeRoute('/about')} className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>
            플랫폼 소개 보기
          </Link>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
