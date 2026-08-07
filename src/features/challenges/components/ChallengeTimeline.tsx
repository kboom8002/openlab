export function ChallengeTimeline() {
  return (
    <article className="card-pane">
      <h2 style={{ fontSize: '1.25rem', color: 'var(--wellb-forest-900)', marginTop: 0 }}>
        📅 주요 일정 및 제출물
      </h2>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8', color: 'var(--ink-secondary)' }}>
        <li><strong>아이디어 수립 및 Preflight:</strong> 개막일 ~ 마감일</li>
        <li><strong>AI 및 다층 검토:</strong> 마감 후 14일간 진행</li>
        <li><strong>최종 제출물:</strong> 9개 필수 영역이 검증된 canonical Idea Passport</li>
      </ul>
    </article>
  );
}
