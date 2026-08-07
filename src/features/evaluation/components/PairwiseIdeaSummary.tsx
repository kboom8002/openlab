interface PairwiseIdeaSummaryProps {
  title: string;
  summary: string;
  sections: { label: string; value: string }[];
  label: string;
}

export function PairwiseIdeaSummary({ title, summary, sections, label }: PairwiseIdeaSummaryProps) {
  return (
    <article className="card-pane" aria-label={`${label} 아이디어`}>
      <div style={{ marginBottom: '0.75rem' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '0.2rem 0.6rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            borderRadius: '0.25rem',
            background: label === 'A' ? '#dbeafe' : '#ede9fe',
            color: label === 'A' ? '#1e40af' : '#5b21b6',
          }}
        >
          {label}
        </span>
      </div>
      <h3 style={{ fontSize: '1.1rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
        {summary}
      </p>
      {sections.length > 0 && (
        <dl style={{ fontSize: '0.85rem', margin: 0 }}>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: '0.5rem' }}>
              <dt style={{ fontWeight: 600, color: 'var(--ink-secondary)', marginBottom: '0.15rem' }}>{s.label}</dt>
              <dd style={{ margin: 0, color: 'var(--ink-primary)', lineHeight: 1.5 }}>{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
