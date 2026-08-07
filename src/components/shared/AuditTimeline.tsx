interface AuditEvent {
  id: string;
  action: string;
  actor_name?: string;
  occurred_at: string;
  metadata?: Record<string, unknown>;
}

interface AuditTimelineProps {
  events: AuditEvent[];
  title?: string;
}

export function AuditTimeline({ events, title = '감사 이력' }: AuditTimelineProps) {
  if (events.length === 0) return null;

  return (
    <section aria-label={title}>
      <h3 style={{ fontSize: '1rem', color: 'var(--wellb-forest-900)', marginBottom: '0.75rem' }}>{title}</h3>
      <div style={{ borderLeft: '2px solid var(--border-soft)', paddingLeft: '1rem' }}>
        {events.map((event) => (
          <div key={event.id} style={{ marginBottom: '1rem', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '-1.35rem',
                top: '0.25rem',
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                background: 'var(--wellb-forest-700)',
              }}
            />
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-primary)', margin: '0 0 0.25rem' }}>
              {event.action}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', margin: 0 }}>
              {event.actor_name && <span>{event.actor_name} · </span>}
              {new Date(event.occurred_at).toLocaleString('ko-KR')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
