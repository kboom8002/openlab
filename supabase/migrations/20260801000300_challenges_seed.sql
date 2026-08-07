begin;

insert into public.monthly_challenges (id, slug, title, summary, status, opens_at, closes_at)
values
  (
    '11111111-1111-1111-1111-111111111111',
    '2026-08-local-life',
    '2026년 8월 챌린지: 지역 생활 문제 해결과 자원 재구성',
    '제주 및 거주 지역사회에서 매일 겪는 생활 문제(교통, 고령화, 쓰레기, 돌봄)를 발견하고 AI 코치와 함께 실증 가능한 아이디어로 발전시키는 월간 오픈이노베이션 트랙입니다.',
    'OPEN',
    now() - interval '3 days',
    now() + interval '27 days'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '2026-09-work-automation',
    '2026년 9월 예정: AI 증강 업무 프로세스 혁신',
    '소상공인 및 지역 기업의 고반복·고부담 행정 프로세스를 자동화하고 비전문가도 쉽게 운용 가능한 스마트 솔루션 제안 트랙입니다.',
    'SCHEDULED',
    now() + interval '28 days',
    now() + interval '58 days'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    '2026-07-smart-tourism',
    '2026년 7월 챌린지: 지속 가능한 친환경 관광 실증 (완료)',
    '관광객과 주민이 함께 공존하는 지속 가능한 관광 모델과 지역 리사이클링 오픈 이니셔티브 제안 트랙입니다.',
    'COMPLETED',
    now() - interval '35 days',
    now() - interval '5 days'
  )
on conflict (slug) do update set
  title = excluded.title,
  summary = excluded.summary,
  status = excluded.status,
  opens_at = excluded.opens_at,
  closes_at = excluded.closes_at;

commit;
