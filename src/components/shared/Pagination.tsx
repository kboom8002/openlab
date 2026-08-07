import Link from 'next/link';
import type { Route } from 'next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

export function Pagination({ currentPage, totalPages, basePath, searchParams = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${basePath}?${params.toString()}` as Route;
  };

  return (
    <nav aria-label="페이지 탐색" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="btn-secondary"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          aria-label="이전 페이지"
        >
          ← 이전
        </Link>
      )}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.4rem 0.8rem',
          fontSize: '0.85rem',
          color: 'var(--ink-secondary)',
        }}
      >
        {currentPage} / {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="btn-secondary"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          aria-label="다음 페이지"
        >
          다음 →
        </Link>
      )}
    </nav>
  );
}
