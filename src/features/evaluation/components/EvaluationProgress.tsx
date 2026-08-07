interface EvaluationProgressProps {
  completed: number;
  total: number;
  label?: string;
}

export function EvaluationProgress({ completed, total, label = '평가 진행 상황' }: EvaluationProgressProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="card-pane" style={{ padding: '1rem 1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-primary)' }}>{label}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>{completed}/{total}</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct}% 완료`}
        style={{
          height: '0.5rem',
          borderRadius: '9999px',
          background: 'var(--border-soft)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            borderRadius: '9999px',
            background: 'var(--wellb-forest-700)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
