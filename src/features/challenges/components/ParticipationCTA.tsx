import Link from 'next/link';
import { safeRoute } from '@/lib/routes';

interface ParticipationCTAProps {
  challengeId: string;
  challengeSlug: string;
  isOpen: boolean;
  isAuthenticated: boolean;
}

export function ParticipationCTA({ challengeId, challengeSlug, isOpen, isAuthenticated }: ParticipationCTAProps) {
  return (
    <div className="card-pane" style={{ background: 'var(--wellb-sage-100)', border: '1px solid var(--wellb-sage-500)', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.25rem', color: 'var(--wellb-forest-900)', marginTop: 0 }}>
        {isOpen ? '챌린지에 참여해보세요!' : '챌린지 접수가 마감되었습니다'}
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginBottom: '1.25rem' }}>
        {isOpen
          ? 'AI 코치와 함께 아이디어를 구상하고 실증 제안서(Idea Passport)를 작성할 수 있습니다.'
          : '현재는 접수 기간이 아닙니다. 다음 챌린지 소식을 기다려주세요.'}
      </p>

      {isOpen && (
        <div>
          {isAuthenticated ? (
            <Link href={safeRoute(`/ideas/new?challengeId=${challengeId}`)} className="btn-primary" style={{ width: '100%' }}>
              아이디어 작성 시작하기 (Draft) →
            </Link>
          ) : (
            <Link href={safeRoute(`/sign-in?next=/challenges/${challengeSlug}`)} className="btn-primary" style={{ width: '100%' }}>
              로그인 후 참여하기 →
            </Link>
          )}
        </div>
      )}

      {!isOpen && (
        <Link href={safeRoute('/challenges')} className="btn-secondary" style={{ width: '100%' }}>
          다른 챌린지 보기
        </Link>
      )}
    </div>
  );
}
