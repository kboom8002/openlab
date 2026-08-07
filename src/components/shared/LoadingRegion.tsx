interface LoadingRegionProps {
  label?: string;
  height?: string;
}

export function LoadingRegion({ label = '로딩 중...', height = '12rem' }: LoadingRegionProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={label}
      className="card-pane"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height,
        color: 'var(--ink-muted)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '2rem',
            height: '2rem',
            border: '3px solid var(--border-soft)',
            borderTopColor: 'var(--wellb-forest-700)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 0.75rem',
          }}
        />
        <p style={{ fontSize: '0.85rem', margin: 0 }}>{label}</p>
      </div>
    </div>
  );
}
