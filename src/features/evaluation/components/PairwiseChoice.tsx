'use client';

import { useState, useTransition } from 'react';

interface PairwiseChoiceProps {
  challengeId: string;
  versionAId: string;
  versionBId: string;
  onSubmitted?: () => void;
}

type Choice = 'A' | 'B' | 'similar' | 'cannot_judge';

const CHOICE_OPTIONS: { value: Choice; label: string; icon: string }[] = [
  { value: 'A', label: 'A가 더 낫다', icon: '🌟' },
  { value: 'B', label: 'B가 더 낫다', icon: '🌟' },
  { value: 'similar', label: '비슷하다', icon: '⚖️' },
  { value: 'cannot_judge', label: '판단 불가', icon: '❓' },
];

export function PairwiseChoice({ challengeId, versionAId, versionBId, onSubmitted }: PairwiseChoiceProps) {
  const [selected, setSelected] = useState<Choice | null>(null);
  const [reasoning, setReasoning] = useState('');
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    startTransition(async () => {
      try {
        const res = await fetch('/api/evaluation/pairwise', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            challengeId,
            versionAId,
            versionBId,
            choice: selected,
            reasoning,
          }),
        });
        if (res.ok) {
          setSubmitted(true);
          onSubmitted?.();
        }
      } catch {
        // Error handling
      }
    });
  };

  if (submitted) {
    return (
      <div className="card-pane" style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</p>
        <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--wellb-forest-900)' }}>투표가 기록되었습니다</p>
      </div>
    );
  }

  return (
    <section className="card-pane">
      <h3 style={{ fontSize: '1rem', color: 'var(--wellb-forest-900)', marginTop: 0, marginBottom: '1rem' }}>
        어떤 아이디어가 더 나은가요?
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
        {CHOICE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setSelected(opt.value)}
            disabled={isPending}
            style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: selected === opt.value ? '2px solid var(--wellb-forest-700)' : '1px solid var(--border-soft)',
              background: selected === opt.value ? 'var(--wellb-sage-100)' : 'var(--surface-base)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: selected === opt.value ? 700 : 400,
              color: 'var(--ink-primary)',
              textAlign: 'center',
            }}
          >
            {opt.icon} {opt.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="pairwise-reasoning" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-secondary)', display: 'block', marginBottom: '0.25rem' }}>
          이유 (선택)
        </label>
        <textarea
          id="pairwise-reasoning"
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          disabled={isPending}
          rows={3}
          className="form-input"
          style={{ width: '100%', resize: 'vertical' }}
          placeholder="선택 이유를 작성해주세요..."
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected || isPending}
        className="btn-primary"
        style={{ width: '100%' }}
      >
        {isPending ? '제출 중...' : '투표 제출'}
      </button>
    </section>
  );
}
