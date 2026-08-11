export default function ExpertGuidePage() {
  return (
    <main id="main" style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', color: 'var(--wellb-forest-900)', marginBottom: '1.5rem' }}>전문가 평가 가이드</h1>

      <section className="card-pane" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '1rem' }}>평가 원칙</h2>
        <ol style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
          <li>제출된 Idea Passport의 내용만을 기준으로 평가합니다.</li>
          <li>평가자 간 교차 영향을 방지하기 위해 다른 평가자의 점수는 공개되지 않습니다.</li>
          <li>이해충돌이 있는 경우 즉시 신고하고 해당 평가에서 제외됩니다.</li>
          <li>AI 점수는 참고 자료이며 최종 판정에 사용되지 않습니다.</li>
          <li>평가 제출 후에는 수정할 수 없습니다 (불변 원칙).</li>
        </ol>
      </section>

      <section className="card-pane">
        <h2 style={{ fontSize: '1.1rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '1rem' }}>평가 기준</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
          각 아이디어는 문제 정의의 명확성, 솔루션의 구체성, 실험 가능성, 영향력 잠재성, 그리고 근거의 충분성을 기준으로 평가됩니다.
          루브릭의 각 항목을 0~100 척도로 채점하고, 전체적인 평가 의견을 작성해주세요.
        </p>
      </section>
    </main>
  );
}
