import type { MonthlyChallengeStatus, IdeaStatus, PilotStatus } from '@/types/domain';

type BadgeStatus = MonthlyChallengeStatus | IdeaStatus | PilotStatus | string;

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  OPEN: { bg: '#dcfce7', text: '#166534' },
  SCHEDULED: { bg: '#dbeafe', text: '#1e40af' },
  CLOSED: { bg: '#f3f4f6', text: '#374151' },
  EVALUATION: { bg: '#fef3c7', text: '#92400e' },
  SELECTION: { bg: '#ede9fe', text: '#5b21b6' },
  PILOTING: { bg: '#ffedd5', text: '#9a3412' },
  COMPLETED: { bg: '#d1fae5', text: '#065f46' },
  DRAFT: { bg: '#f3f4f6', text: '#6b7280' },
  SUBMITTED: { bg: '#dbeafe', text: '#1e40af' },
  PROMISING: { bg: '#fef3c7', text: '#92400e' },
  PILOT_READY: { bg: '#ffedd5', text: '#9a3412' },
  VALIDATED: { bg: '#d1fae5', text: '#065f46' },
  CANCELLED: { bg: '#fee2e2', text: '#991b1b' },
  ARCHIVED: { bg: '#f3f4f6', text: '#6b7280' },
};

const STATUS_LABELS: Record<string, string> = {
  OPEN: '접수 중',
  SCHEDULED: '예정',
  CLOSED: '마감',
  EVALUATION: '평가 중',
  SELECTION: '선발 중',
  PILOTING: '파일럿',
  COMPLETED: '완료',
  DRAFT: '초안',
  SUBMITTED: '제출됨',
  READY_FOR_REVIEW: '검토 준비',
  PREFLIGHT_CHECKING: '사전 검증 중',
  PREFLIGHT_COMPLETE: '사전 검증 완료',
  ELIGIBLE: '적격',
  UNDER_EVALUATION: '평가 진행',
  PROMISING: '유망',
  PILOT_READY: '파일럿 준비',
  IN_PILOT: '파일럿 중',
  VALIDATED: '검증됨',
  ADOPTED: '채택',
  RETURNED_FOR_REVISION: '수정 요청',
  INELIGIBLE: '부적격',
  WITHDRAWN: '철회',
  SAFETY_HOLD: '안전 보류',
  CANCELLED: '취소',
  ARCHIVED: '보관',
  // Pilot statuses
  PLANNED: '계획됨',
  READY: '준비 완료',
  IN_PROGRESS: '진행 중',
  PAUSED: '일시 중지',
  NOT_VALIDATED: '미검증',
};

interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status] ?? { bg: '#f3f4f6', text: '#374151' };
  const displayLabel = label ?? STATUS_LABELS[status] ?? status;

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.6rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        borderRadius: '9999px',
        backgroundColor: colors.bg,
        color: colors.text,
        whiteSpace: 'nowrap',
      }}
    >
      {displayLabel}
    </span>
  );
}
