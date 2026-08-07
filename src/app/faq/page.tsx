import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { FAQ } from '@/components/shared/FAQ';

const FAQ_ITEMS = [
  { question: '참여 자격은?', answer: '이메일 인증만으로 누구나 참여할 수 있습니다.' },
  { question: '아이디어 소유권은 누구에게?', answer: '아이디어 권리는 원칙적으로 제출자에게 유지됩니다.' },
  { question: 'AI 코치는 무엇을 하나요?', answer: 'AI가 질문과 제안으로 아이디어 구조화를 돕습니다. 최종 결정은 참여자에게 있습니다.' },
  { question: 'AI 점수로 자동 탈락하나요?', answer: 'AI 평가는 참고 자료이며, AI 점수만으로 자동 탈락하지 않습니다.' },
  { question: '제출 후 수정 가능한가요?', answer: '제출된 버전은 불변입니다. 필요시 새 초안을 작성할 수 있습니다.' },
  { question: '스폰서가 내 아이디어를 볼 수 있나요?', answer: '스폰서는 초안이나 비공개 아이디어에 접근할 수 없습니다. 집계된 통계와 본인이 동의한 쇼케이스만 공유됩니다.' },
  { question: '개인정보는 안전한가요?', answer: '모든 데이터는 행 수준 보안(RLS)으로 보호되며, 본인의 데이터만 접근할 수 있습니다.' },
];

export default function FAQPage() {
  return (
    <>
      <PublicHeader />
      <main id="main" style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--wellb-forest-900)', marginBottom: '1.5rem' }}>자주 묻는 질문</h1>
        <FAQ items={FAQ_ITEMS} />
      </main>
      <PublicFooter />
    </>
  );
}
