'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function FAQ({ items, title = '자주 묻는 질문' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-label={title}>
      <h2 style={{ fontSize: '1.25rem', color: 'var(--wellb-forest-900)', marginBottom: '1rem' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {items.map((item, i) => (
          <div key={i} className="card-pane" style={{ padding: 0, overflow: 'hidden' }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--ink-primary)',
                textAlign: 'left',
              }}
            >
              {item.question}
              <span style={{ fontSize: '1.2rem', transition: 'transform 0.2s', transform: openIndex === i ? 'rotate(180deg)' : 'none' }}>
                ▾
              </span>
            </button>
            {openIndex === i && (
              <div
                role="region"
                style={{
                  padding: '0 1.25rem 1rem',
                  fontSize: '0.9rem',
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
