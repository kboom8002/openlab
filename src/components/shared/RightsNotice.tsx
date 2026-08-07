export function RightsNotice() {
  return (
    <aside
      className="card-pane"
      aria-label="권리 안내"
      style={{
        padding: '1.25rem 1.5rem',
        borderLeft: '3px solid var(--wellb-forest-700)',
        background: 'var(--wellb-sage-100)',
      }}
    >
      <h3 style={{ fontSize: '0.95rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '0.5rem' }}>
        💡 아이디어 권리 안내
      </h3>
      <ul style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', margin: 0, paddingLeft: '1.25rem', lineHeight: 1.7 }}>
        <li>아이디어 권리는 원칙적으로 제출자에게 유지됩니다.</li>
        <li>제출만으로 소유권이 운영기관이나 스폰서에게 이전되지 않습니다.</li>
        <li>AI 평가는 참고 자료이며, AI 점수만으로 자동 탈락하지 않습니다.</li>
        <li>제출된 아이디어 버전은 변경할 수 없으며, 평가는 해당 버전을 기준으로 이루어집니다.</li>
      </ul>
    </aside>
  );
}
