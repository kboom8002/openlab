import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { HowItWorks } from '@/features/landing/components/HowItWorks';
import { FAQ } from '@/components/shared/FAQ';
import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

const FAQ_ITEMS = [
  { question: '누구나 참여할 수 있나요?', answer: '네, 이메일 인증만으로 누구나 참여할 수 있습니다. 전문 지식이 없어도 일상에서 발견한 문제와 아이디어를 나눌 수 있습니다.' },
  { question: 'AI 코치는 어떤 역할을 하나요?', answer: 'AI 코치는 아이디어를 구조화하는 질문을 던지고, 관련 정보를 제안하며, Idea Passport 양식을 완성하는 데 도움을 줍니다. 최종 결정은 항상 참여자에게 있습니다.' },
  { question: '제출한 아이디어의 소유권은?', answer: '아이디어 권리는 원칙적으로 제출자에게 유지됩니다. 제출만으로 운영기관이나 스폰서에게 소유권이 이전되지 않습니다.' },
  { question: 'AI 평가로 자동 탈락하나요?', answer: '아닙니다. AI 평가는 참고 자료이며, AI 점수만으로 자동 탈락시키지 않습니다.' },
];

export default function HowItWorksPage() {
  return (
    <>
      <PublicHeader />
      <main id="main" style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--wellb-forest-900)', marginBottom: '0.5rem' }}>참여 방법</h1>
        <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
          WELLB OPENLAB은 5단계로 아이디어를 실증 가능한 제안으로 발전시킵니다.
        </p>
        <HowItWorks />
        <FAQ items={FAQ_ITEMS} />
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href={safeRoute('/challenges')} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
            챌린지 둘러보기 →
          </Link>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
