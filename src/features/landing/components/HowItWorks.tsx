const STEPS = [
  { icon: '🔍', title: '챌린지 발견', desc: '월간 챌린지에서 관심 있는 주제를 찾으세요.' },
  { icon: '💡', title: 'AI 코칭과 아이디어 구조화', desc: 'AI 코치의 질문과 제안으로 아이디어를 정밀하게 다듬으세요.' },
  { icon: '📋', title: 'Idea Passport 완성', desc: '문제, 대상, 솔루션, 실험 계획까지 체계적으로 정리하세요.' },
  { icon: '🔬', title: '다층 평가', desc: 'AI·동료·전문가 3단계 검증을 통해 아이디어의 완성도를 높이세요.' },
  { icon: '🚀', title: '실증 파일럿', desc: '선발된 아이디어는 실제 현장에서 검증하는 파일럿에 참여합니다.' },
];

export function HowItWorks() {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontSize: '1.35rem', color: 'var(--wellb-forest-900)', marginBottom: '1.5rem' }}>
        참여 과정
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {STEPS.map((step, i) => (
          <div key={i} className="card-pane" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{step.icon}</div>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wellb-forest-700)', marginBottom: '0.25rem' }}>
              STEP {i + 1}
            </p>
            <h3 style={{ fontSize: '1rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '0.5rem' }}>
              {step.title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', margin: 0, lineHeight: 1.5 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
