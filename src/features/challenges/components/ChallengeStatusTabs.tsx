import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

const STATUS_TABS = [
  { label: '전체', value: 'ALL' },
  { label: '접수 중', value: 'OPEN' },
  { label: '예정', value: 'SCHEDULED' },
  { label: '평가/선정', value: 'EVALUATION' },
  { label: '종료/완료', value: 'COMPLETED' },
];

interface ChallengeStatusTabsProps {
  currentStatus: string;
}

export function ChallengeStatusTabs({ currentStatus }: ChallengeStatusTabsProps) {
  return (
    <nav aria-label="챌린지 상태 필터" style={{ marginBottom: '1.5rem' }}>
      <ul
        role="tablist"
        style={{
          display: 'flex',
          gap: '0.5rem',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          overflowX: 'auto',
          paddingBottom: '0.5rem',
        }}
      >
        {STATUS_TABS.map((tab) => {
          const isActive = currentStatus === tab.value;
          const href = tab.value === 'ALL' ? '/challenges' : `/challenges?status=${tab.value}`;

          return (
            <li key={tab.value} role="presentation">
              <Link
                href={safeRoute(href)}
                role="tab"
                aria-selected={isActive}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  background: isActive ? 'var(--primary)' : 'var(--surface)',
                  color: isActive ? 'white' : 'var(--ink-secondary)',
                  border: isActive ? '1px solid var(--primary)' : '1px solid var(--surface-border)',
                }}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
