interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div
      className="card-pane"
      role="status"
      style={{
        textAlign: 'center',
        padding: '3rem 2rem',
      }}
    >
      <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{icon}</p>
      <h3 style={{ fontSize: '1.1rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '0.5rem' }}>
        {title}
      </h3>
      {description && (
        <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', margin: '0 auto', maxWidth: '24rem' }}>
          {description}
        </p>
      )}
      {action && (
        <a href={action.href} className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block', padding: '0.5rem 1.25rem' }}>
          {action.label}
        </a>
      )}
    </div>
  );
}
