export function SponsorDisclosure() {
  return (
    <aside
      className="card-pane"
      aria-label="후원 관계 공시"
      style={{
        padding: '1rem 1.25rem',
        marginBottom: '2rem',
        fontSize: '0.8rem',
        color: 'var(--ink-muted)',
        borderLeft: '3px solid var(--border-soft)',
      }}
    >
      <p style={{ margin: 0 }}>
        <strong>후원 관계 공시:</strong> 본 플랫폼은 제주창조경제혁신센터(JDC)와의 협력을 협의 중(proposal)이며, 공식 협약이 체결되기 전까지 JDC의 공식 후원·공동주최·로고 사용을 표시하지 않습니다.
      </p>
    </aside>
  );
}
