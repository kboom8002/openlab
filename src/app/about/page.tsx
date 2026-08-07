import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { SponsorDisclosure } from '@/features/landing/components/SponsorDisclosure';

export default function AboutPage() {
  return (
    <>
      <PublicHeader />
      <main id="main" style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--wellb-forest-900)', marginBottom: '1.5rem' }}>소개</h1>
        <section className="card-pane" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '1rem' }}>WELLB OPENLAB이란?</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.7 }}>
            WELLB OPENLAB은 사용자가 생활·업무·지역사회에서 발견한 문제와 아이디어를 AI 코치의 도움으로 구조화·시각화하고,
            AI·사용자·현장 전문가의 다층 검토를 거쳐 실증 가능한 제안으로 발전시키는 AI 증강 오픈이노베이션 플랫폼입니다.
          </p>
        </section>
        <SponsorDisclosure />
      </main>
      <PublicFooter />
    </>
  );
}
