'use client';

interface ErrorRetryableProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorRetryable({ message = '문제가 발생했습니다.', onRetry }: ErrorRetryableProps) {
  return (
    <div
      role="alert"
      className="card-pane"
      style={{
        textAlign: 'center',
        padding: '2rem',
        border: '1px solid #fecaca',
        background: '#fef2f2',
      }}
    >
      <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</p>
      <p style={{ fontSize: '0.95rem', color: '#991b1b', marginBottom: '1rem' }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-secondary"
          style={{ padding: '0.5rem 1.25rem' }}
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
