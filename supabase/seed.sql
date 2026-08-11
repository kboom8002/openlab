-- =============================================================================
-- WELLB OPENLAB Seed Data (Demo & E2E Test Dataset)
-- =============================================================================

begin;

-- Ensure pgcrypto is available for password hashing
create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- 0. Update handle_new_user trigger function to use platform_role_assignments
-- -----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1), '참여자')
  )
  on conflict (id) do nothing;
  
  insert into public.platform_role_assignments (user_id, role)
  values (new.id, 'participant'::public.user_role)
  on conflict do nothing;

  return new;
end $$;

-- -----------------------------------------------------------------------------
-- 1. Seed Auth Users (8 core personas + 4 additional = 12 users)
-- Password for all seed users: Demo1234!
-- -----------------------------------------------------------------------------
insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) values
  -- Participants (1~5)
  ('aaaaaaaa-0001-4000-8000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'kim.participant@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"김참여"}', now() - interval '30 days', now()),
  ('aaaaaaaa-0002-4000-8000-000000000002', '00000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated', 'lee.innovation@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"이혁신"}', now() - interval '30 days', now()),
  ('aaaaaaaa-0003-4000-8000-000000000003', '00000000-0000-0000-0000-000000000003', 'authenticated', 'authenticated', 'park.beginner@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"박초보"}', now() - interval '20 days', now()),
  ('aaaaaaaa-0004-4000-8000-000000000004', '00000000-0000-0000-0000-000000000004', 'authenticated', 'authenticated', 'choi.maker@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"최메이커"}', now() - interval '15 days', now()),
  ('aaaaaaaa-0005-4000-8000-000000000005', '00000000-0000-0000-0000-000000000005', 'authenticated', 'authenticated', 'jung.local@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"정로컬"}', now() - interval '10 days', now()),
  -- Evaluators / Experts (6~8)
  ('aaaaaaaa-0006-4000-8000-000000000006', '00000000-0000-0000-0000-000000000006', 'authenticated', 'authenticated', 'choi.evaluator@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"최평가"}', now() - interval '30 days', now()),
  ('aaaaaaaa-0007-4000-8000-000000000007', '00000000-0000-0000-0000-000000000007', 'authenticated', 'authenticated', 'jung.judge@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"정심사"}', now() - interval '30 days', now()),
  ('aaaaaaaa-0008-4000-8000-000000000008', '00000000-0000-0000-0000-000000000008', 'authenticated', 'authenticated', 'kang.expert@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"강전문"}', now() - interval '30 days', now()),
  -- Challenge Manager & Org Admin (9~10)
  ('aaaaaaaa-0009-4000-8000-000000000009', '00000000-0000-0000-0000-000000000009', 'authenticated', 'authenticated', 'han.manager@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"한매니저"}', now() - interval '60 days', now()),
  ('aaaaaaaa-0010-4000-8000-000000000010', '00000000-0000-0000-0000-000000000010', 'authenticated', 'authenticated', 'yoon.admin@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"윤관리"}', now() - interval '60 days', now()),
  -- Sponsor Viewers (11~12)
  ('aaaaaaaa-0011-4000-8000-000000000011', '00000000-0000-0000-0000-000000000011', 'authenticated', 'authenticated', 'kang.sponsor@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"강스폰서"}', now() - interval '45 days', now()),
  ('aaaaaaaa-0012-4000-8000-000000000012', '00000000-0000-0000-0000-000000000012', 'authenticated', 'authenticated', 'lim.partner@wellb.example.com', crypt('Demo1234!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"display_name":"임파트너"}', now() - interval '45 days', now())
on conflict (id) do update set
  encrypted_password = excluded.encrypted_password,
  raw_user_meta_data = excluded.raw_user_meta_data;

-- Update Profiles & Onboarding status
update public.profiles set bio = '제주 생활 문제 해결에 관심이 많은 지역 주민입니다.', interests = ARRAY['교통', '리사이클링', '고령화'], onboarding_completed = true where id = 'aaaaaaaa-0001-4000-8000-000000000001';
update public.profiles set bio = '기술을 활용한 혁신 솔루션을 만드는 제주의 청년 창업가입니다.', interests = ARRAY['농업', '스마트물류', 'AI'], onboarding_completed = true where id = 'aaaaaaaa-0002-4000-8000-000000000002';
update public.profiles set bio = '오픈이노베이션에 처음 참여하는 사회초년생입니다.', interests = ARRAY['환경', '돌봄'], onboarding_completed = true where id = 'aaaaaaaa-0003-4000-8000-000000000003';
update public.profiles set bio = '지역 문화와 관광을 살리는 로컬 크리에이터입니다.', interests = ARRAY['문화', '관광', '아카이빙'], onboarding_completed = true where id = 'aaaaaaaa-0004-4000-8000-000000000004';
update public.profiles set bio = '제주 원도심 재생 프로젝트를 진행 중입니다.', interests = ARRAY['도시재생', '공동체'], onboarding_completed = true where id = 'aaaaaaaa-0005-4000-8000-000000000005';
update public.profiles set bio = '소셜 벤처 심사역 및 지역 혁신 멘토입니다.', interests = ARRAY['소셜벤처', '사업성평가'], onboarding_completed = true where id = 'aaaaaaaa-0006-4000-8000-000000000006';
update public.profiles set bio = '공공 서비스 정책 및 ESG 테크 전문 심사위원입니다.', interests = ARRAY['ESG', '공공정책'], onboarding_completed = true where id = 'aaaaaaaa-0007-4000-8000-000000000007';
update public.profiles set bio = '스마트시티 및 지역 물류 전문가입니다.', interests = ARRAY['스마트시티', '물류'], onboarding_completed = true where id = 'aaaaaaaa-0008-4000-8000-000000000008';
update public.profiles set bio = 'WellB OpenLab 챌린지 총괄 매니저입니다.', interests = ARRAY['오픈이노베이션', '운영'], onboarding_completed = true where id = 'aaaaaaaa-0009-4000-8000-000000000009';
update public.profiles set bio = 'WellB Company 최고 운영자입니다.', interests = ARRAY['플랫폼관리', '시스템'], onboarding_completed = true where id = 'aaaaaaaa-0010-4000-8000-000000000010';
update public.profiles set bio = '제주지역혁신재단 실증 사업 담당자입니다.', interests = ARRAY['지역혁신', '스폰서십'], onboarding_completed = true where id = 'aaaaaaaa-0011-4000-8000-000000000011';
update public.profiles set bio = '제주 테크노 파크 이니셔티브 담당자입니다.', interests = ARRAY['테크파트너', '실증'], onboarding_completed = true where id = 'aaaaaaaa-0012-4000-8000-000000000012';

-- Set Additional Platform Roles
insert into public.platform_role_assignments (user_id, role) values
  ('aaaaaaaa-0006-4000-8000-000000000006', 'evaluator'::public.user_role),
  ('aaaaaaaa-0006-4000-8000-000000000006', 'expert'::public.user_role),
  ('aaaaaaaa-0007-4000-8000-000000000007', 'evaluator'::public.user_role),
  ('aaaaaaaa-0007-4000-8000-000000000007', 'expert'::public.user_role),
  ('aaaaaaaa-0008-4000-8000-000000000008', 'expert'::public.user_role),
  ('aaaaaaaa-0009-4000-8000-000000000009', 'challenge_manager'::public.user_role),
  ('aaaaaaaa-0010-4000-8000-000000000010', 'admin'::public.user_role),
  ('aaaaaaaa-0011-4000-8000-000000000011', 'sponsor_viewer'::public.user_role),
  ('aaaaaaaa-0012-4000-8000-000000000012', 'sponsor_viewer'::public.user_role)
on conflict do nothing;

-- -----------------------------------------------------------------------------
-- 2. Organizations & Members
-- -----------------------------------------------------------------------------
insert into public.organizations (id, name, slug, description, status) values
  ('bbbbbbbb-0001-4000-8000-000000000001', 'WellB 운영팀', 'wellb-opteam', '오픈이노베이션 챌린지 및 이니셔티브를 관리하는 중앙 운영 기관입니다.', 'active'),
  ('bbbbbbbb-0002-4000-8000-000000000002', '제주지역혁신재단', 'jeju-innovation-foundation', '제주 지역사회의 문제 해결과 오픈 이노베이션 실증을 지원하는 협력 재단입니다.', 'active')
on conflict (slug) do update set name = excluded.name, description = excluded.description;

insert into public.organization_members (organization_id, user_id, role) values
  ('bbbbbbbb-0001-4000-8000-000000000001', 'aaaaaaaa-0010-4000-8000-000000000010', 'organization_admin'),
  ('bbbbbbbb-0001-4000-8000-000000000001', 'aaaaaaaa-0009-4000-8000-000000000009', 'challenge_manager'),
  ('bbbbbbbb-0002-4000-8000-000000000002', 'aaaaaaaa-0011-4000-8000-000000000011', 'sponsor_viewer'),
  ('bbbbbbbb-0002-4000-8000-000000000002', 'aaaaaaaa-0012-4000-8000-000000000012', 'pilot_partner')
on conflict (organization_id, user_id) do update set role = excluded.role;

-- -----------------------------------------------------------------------------
-- 3. Challenge Series & Sponsorships
-- -----------------------------------------------------------------------------
insert into public.challenge_series (id, organization_id, title, description, status) values
  ('cccccccc-0001-4000-8000-000000000001', 'bbbbbbbb-0001-4000-8000-000000000001', '2026 제주 지역사회 혁신 이니셔티브', '제주 현장 문제발견부터 실증 모델 구축까지 연계하는 2026년 정기 오픈이노베이션 시리즈입니다.', 'ACTIVE')
on conflict (id) do update set title = excluded.title;

insert into public.sponsorships (id, organization_id, challenge_series_id, relationship_status, approved_scope, contact_name, contact_email, notes) values
  ('dddddddd-0001-4000-8000-000000000001', 'bbbbbbbb-0002-4000-8000-000000000002', 'cccccccc-0001-4000-8000-000000000001', 'under_discussion', '{"aggregate_funnel": true, "showcase_only": true}', '강스폰서', 'kang.sponsor@wellb.example.com', '공식 후원 및 실증 협력 논의 중 (AGENTS.md 준수: JDC 표현 미사용)')
on conflict (id) do update set relationship_status = excluded.relationship_status;

-- Link challenges to organization & series
update public.monthly_challenges
set organization_id = 'bbbbbbbb-0001-4000-8000-000000000001', series_id = 'cccccccc-0001-4000-8000-000000000001'
where id in ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333');

-- -----------------------------------------------------------------------------
-- 4. Challenge Tracks
-- -----------------------------------------------------------------------------
insert into public.challenge_tracks (id, monthly_challenge_id, name, description, display_order) values
  ('eeeeeeee-0001-4000-8000-000000000001', '11111111-1111-1111-1111-111111111111', '지역 생활 불편 개선', '교통, 돌봄, 고령화, 접근성 문제 해결', 1),
  ('eeeeeeee-0002-4000-8000-000000000002', '11111111-1111-1111-1111-111111111111', '자원 선순환 & 리사이클링', '쓰레기, 폐기물, 순환경제 솔루션', 2),
  ('eeeeeeee-0003-4000-8000-000000000003', '11111111-1111-1111-1111-111111111111', '스마트 농유통 혁신', '농산물 직거래, 생산성 향상 솔루션', 3),
  ('eeeeeeee-0004-4000-8000-000000000004', '33333333-3333-3333-3333-333333333333', '친환경 관광 & 로컬 브랜드', '지속 가능한 관광 및 문화 아카이빙', 1)
on conflict (id) do update set name = excluded.name;

-- -----------------------------------------------------------------------------
-- 5. Challenge Participations
-- -----------------------------------------------------------------------------
insert into public.challenge_participations (user_id, monthly_challenge_id) values
  ('aaaaaaaa-0001-4000-8000-000000000001', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0002-4000-8000-000000000002', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0003-4000-8000-000000000003', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0004-4000-8000-000000000004', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0005-4000-8000-000000000005', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-0002-4000-8000-000000000002', '33333333-3333-3333-3333-333333333333'),
  ('aaaaaaaa-0004-4000-8000-000000000004', '33333333-3333-3333-3333-333333333333')
on conflict (user_id, monthly_challenge_id) do nothing;

-- -----------------------------------------------------------------------------
-- 6. Consent Documents & Acceptances
-- -----------------------------------------------------------------------------
insert into public.consent_documents (id, version, title, type, content_hash, body, active) values
  ('ffffffff-0001-4000-8000-000000000001', '1.0', '서비스 이용약관 v1.0', 'terms_of_service', 'hash_tos_10', 'WELLB OPENLAB 서비스 이용 약관 내용...', true),
  ('ffffffff-0002-4000-8000-000000000002', '1.0', '개인정보 처리방침 v1.0', 'privacy_policy', 'hash_privacy_10', '개인정보 수집 및 이용 동의 내용...', true),
  ('ffffffff-0003-4000-8000-000000000003', '1.0', '평가 및 검토 동의서 v1.0', 'evaluation_consent', 'hash_eval_10', '제출된 아이디어가 평가지침에 따라 다층 검토되는 것에 동의합니다.', true),
  ('ffffffff-0004-4000-8000-000000000004', '1.0', 'AI 어시스턴트 분석 동의서 v1.0', 'ai_processing', 'hash_ai_10', '아이디어 구조화를 위한 AI 어시스턴트 데이터 처리에 동의합니다.', true),
  ('ffffffff-0005-4000-8000-000000000005', '1.0', '쇼케이스 및 스폰서 리포트 동의서 v1.0', 'showcase', 'hash_showcase_10', '선정된 아이디어가 스폰서 리포트 및 갤러리에 공개되는 것에 동의합니다.', true)
on conflict (type, version) do update set active = excluded.active;

insert into public.consent_acceptances (user_id, consent_document_id, ip_hash) values
  ('aaaaaaaa-0001-4000-8000-000000000001', 'ffffffff-0001-4000-8000-000000000001', 'ip_hash_1'),
  ('aaaaaaaa-0001-4000-8000-000000000001', 'ffffffff-0002-4000-8000-000000000002', 'ip_hash_1'),
  ('aaaaaaaa-0001-4000-8000-000000000001', 'ffffffff-0003-4000-8000-000000000003', 'ip_hash_1'),
  ('aaaaaaaa-0001-4000-8000-000000000001', 'ffffffff-0004-4000-8000-000000000004', 'ip_hash_1'),
  ('aaaaaaaa-0002-4000-8000-000000000002', 'ffffffff-0001-4000-8000-000000000001', 'ip_hash_2'),
  ('aaaaaaaa-0002-4000-8000-000000000002', 'ffffffff-0002-4000-8000-000000000002', 'ip_hash_2'),
  ('aaaaaaaa-0002-4000-8000-000000000002', 'ffffffff-0003-4000-8000-000000000003', 'ip_hash_2'),
  ('aaaaaaaa-0002-4000-8000-000000000002', 'ffffffff-0004-4000-8000-000000000004', 'ip_hash_2'),
  ('aaaaaaaa-0002-4000-8000-000000000002', 'ffffffff-0005-4000-8000-000000000005', 'ip_hash_2')
on conflict (user_id, consent_document_id) do nothing;

-- -----------------------------------------------------------------------------
-- 7. Ideas Across All Lifecycle Stages (10 Ideas)
-- -----------------------------------------------------------------------------

-- Idea 1: "고령자 이동 도우미" (김참여, UNDER_EVALUATION)
insert into public.ideas (
  id, challenge_id, owner_id, title, status, visibility, revision, working_passport
) values (
  '10000000-0000-4000-8000-000000000001',
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-0001-4000-8000-000000000001',
  '제주 중산간 마을 고령자 온데만데 이동 도우미',
  'UNDER_EVALUATION',
  'public',
  1,
  '{
    "identity": {"title": "제주 중산간 마을 고령자 온데만데 이동 도우미", "one_line_summary": "수요응답형 마을 셔틀과 지역 청년 자원봉사 매칭 이동 보조 서비스", "track": "지역 생활 불편 개선", "category": "교통·복지"},
    "problem": {"target_user": "제주 중산간 마을 70세 이상 고령 주민", "context": "버스 배차 간격이 2~3시간에 달해 병원 약 방문이나 생필품 구매에 큰 불편", "observed_problem": "대중교통 소외로 인한 병원 진료 지연 및 사회적 고립", "current_alternative": "가족 찬스, 고비용 택시 이용", "consequence": "만성질환 관리 부실 및 삶의 질 저하"},
    "people_context": {"primary_users": "중산간 마을 교통약자 고령층", "affected_stakeholders": "보건소, 이장단, 지역 청년회", "operating_context": "조천읍 중산간 마을 우선 시범 운영"},
    "solution": {"core_solution": "마을 단위 거점 셔틀 + 자원봉사자 매칭 전동 스쿠터 지원", "user_flow": "이장님/마을콜센터 전화 예약 -> 셔틀 도착 -> 자원봉사자 이동 보조", "expected_value": "병원 이동 시간 60% 단축, 이동 비용 70% 절감"},
    "feasibility": {"required_people": "마을 코디네이터 1명, 운전기사 2명", "required_resources": "9인승 승합차 1대, 예약 시스템 앱", "cost_range": "10m_to_50m_krw", "critical_constraints": "운전인력 확보 및 운행 보험", "critical_risks": "고령층의 앱 사용 어려움", "unknowns": "지자체 지원금 확보 가능 여부"},
    "impact": {"direct_beneficiaries": "조천읍 3개 리 고령 주민 120명", "expected_changes": "정기 진료 이행률 40% 증가", "possible_negative_effects": "기존 택시 기사 마찰 가능성", "measurable_indicators": "월 탑승 건수, 진료 방문 횟수"},
    "experiment": {"key_assumption": "전화 기반 예약 시스템으로 고령층도 원활히 이용 가능하다", "target_participants": "선흘리 20가구", "minimum_prototype": "콜센터 전화번호 + 카카오맵 동선 시뮬레이션", "test_method": "2주간 시범 운행 후 만족도 조사", "success_criteria": "재이용 의향 80% 이상", "duration": "2주", "required_partner": "선흘1리 마을회", "risk_and_safeguard": "안전사고 대비 여행자 보험 가입"},
    "provenance": {},
    "rights": {"visibility": "public", "author_ownership_acknowledged": true, "evaluation_consent_version": "1.0", "ai_processing_consent_version": "1.0"}
  }'::jsonb
) on conflict (id) do update set title = excluded.title, status = excluded.status;

-- Idea 2: "마을 공유 냉장고 & 순환 푸드뱅크" (김참여, DRAFT)
insert into public.ideas (
  id, challenge_id, owner_id, title, status, visibility, revision, working_passport
) values (
  '10000000-0000-4000-8000-000000000002',
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-0001-4000-8000-000000000001',
  '스마트 감응형 마을 공유 냉장고',
  'DRAFT',
  'private',
  0,
  '{
    "identity": {"title": "스마트 감응형 마을 공유 냉장고", "one_line_summary": "남는 식재료 공유 및 IoT 센서 기반 식품 안전 관리 공유냉장고", "track": "자원 선순환 & 리사이클링", "category": "식품·환경"},
    "problem": {"target_user": "1인 가구, 고령층, 지역 낭비 식재료 보유자", "context": "잉여 식재료 폐기와 이웃 간 정서적 거리가 멀어지는 문제", "observed_problem": "유통기한 남은 식재료 폐기", "current_alternative": "개별 쓰레기 배출", "consequence": "음식물 쓰레기 처리 비용 증가"},
    "people_context": {"primary_users": "마을 주민 전체", "affected_stakeholders": "마을 부녀회, 자원봉사자", "operating_context": "마을회관 입구 배치"},
    "solution": {"core_solution": "IoT 센서 부착 냉장고로 잔여 수량 및 온도 실시간 관제", "user_flow": "식재료 기부 등록 -> 냉장고 입고 -> 이웃 수거", "expected_value": "음식물 쓰레기 20% 감소"},
    "feasibility": {"required_people": "냉장고 관리 위원 2명", "required_resources": "IoT 스마트 냉장고 1대", "cost_range": "1m_to_10m_krw", "critical_constraints": "위생 가이드라인 준수", "critical_risks": "식중독 사고 위험", "unknowns": "지속적 기부 참여율"},
    "impact": {"direct_beneficiaries": "마을 주민 50세대", "expected_changes": "음식물 쓰레기 감량", "possible_negative_effects": "특정 품목 쏠림", "measurable_indicators": "기부 건수, 이용 건수"},
    "experiment": {"key_assumption": "주민들이 자발적으로 위생 수칙을 지키며 기부할 것이다", "target_participants": "아라동 30세대", "minimum_prototype": "일반 냉장고 + 수기 대장", "test_method": "1주일 운영", "success_criteria": "기부 식재료 90% 소진", "duration": "1주", "required_partner": "아라동 주민센터", "risk_and_safeguard": "매일 저녁 유통기한 전수 조사"},
    "provenance": {},
    "rights": {"visibility": "private", "author_ownership_acknowledged": true, "evaluation_consent_version": "1.0", "ai_processing_consent_version": "1.0"}
  }'::jsonb
) on conflict (id) do update set title = excluded.title;

-- Idea 3: "제주 소농 AI 직거래 플랫폼" (이혁신, IN_PILOT)
insert into public.ideas (
  id, challenge_id, owner_id, title, status, visibility, revision, working_passport
) values (
  '10000000-0000-4000-8000-000000000003',
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-0002-4000-8000-000000000002',
  '제주 소농 AI 수요예측 공동 직거래 플랫폼',
  'IN_PILOT',
  'public',
  2,
  '{
    "identity": {"title": "제주 소농 AI 수요예측 공동 직거래 플랫폼", "one_line_summary": "수요 예측 기반 직거래 및 로컬 물류 묶음 배송 솔루션", "track": "스마트 농유통 혁신", "category": "농업·유통·AI"},
    "problem": {"target_user": "제주 영세 감귤 및 구좌 당근 소농", "context": "중간 유통 수수료가 40% 이상이며 소량 택배비 부담 가중", "observed_problem": "직거래 판로 부족 및 포장/배송 공수 과다", "current_alternative": "농협 위탁 출하, 개인 블로그/인스타그램", "consequence": "농가 실질 소득 저하 및 폐농 증가"},
    "people_context": {"primary_users": "연매출 3천만원 이하 제주 소농", "affected_stakeholders": "육지 소비자, 지역 로컬 물류업체", "operating_context": "구좌읍 및 서귀포시 남원읍 동시 실행"},
    "solution": {"core_solution": "AI 주문 수량 예측 사전 예약 + 지역 거점 묶음 물류 시스템", "user_flow": "농가 작물 등록 -> AI 가격/수요 추천 -> 소비자 사전 예약 -> 묶음 발송", "expected_value": "농가 수수료 부담 15%로 절감, 물류비 25% 절감"},
    "feasibility": {"required_people": "풀스택 개발자 2명, 물류 담당 1명", "required_resources": "수요 예측 AI 모델, 거점 물류 창고 계약", "cost_range": "10m_to_50m_krw", "critical_constraints": "해상 물류 도서지역 추가 운임", "critical_risks": "기상 악화로 인한 배송 지연", "unknowns": "소비자 사전 예약 이탈률"},
    "impact": {"direct_beneficiaries": "제주 소농 30가구", "expected_changes": "농가당 월 평균 순이익 80만원 증가", "possible_negative_effects": "초기 물류 거점 과부하", "measurable_indicators": "직거래 매출액, 물류비 절감액"},
    "experiment": {"key_assumption": "사전 예약 기반 결제로 당도 검증 감귤 100박스가 3일 내 소진될 것이다", "target_participants": "구좌 당근 소농 5가구", "minimum_prototype": "카카오 톡딜 형태 모바일 웹", "test_method": "3일간 한정 사전 예약 캠페인", "success_criteria": "목표 물량 100% 달성 및 컴플레인 2% 이하", "duration": "1주", "required_partner": "제주물류협동조합", "risk_and_safeguard": "파손 보상 보험 체결"},
    "provenance": {},
    "rights": {"visibility": "public", "author_ownership_acknowledged": true, "evaluation_consent_version": "1.0", "ai_processing_consent_version": "1.0"}
  }'::jsonb
) on conflict (id) do update set title = excluded.title, status = excluded.status;

-- Idea 4: "해녀 문화 디지털 아카이브 & 스마트 체험" (이혁신, VALIDATED - COMPLETED Challenge)
insert into public.ideas (
  id, challenge_id, owner_id, title, status, visibility, revision, working_passport
) values (
  '10000000-0000-4000-8000-000000000004',
  '33333333-3333-3333-3333-333333333333',
  'aaaaaaaa-0002-4000-8000-000000000002',
  '제주 해녀 삼춘과의 인터랙티브 디지털 아카이빙',
  'VALIDATED',
  'public',
  1,
  '{
    "identity": {"title": "제주 해녀 삼춘과의 인터랙티브 디지털 아카이빙", "one_line_summary": "해녀 구술사 및 물질 경로 AI 아카이빙과 공존형 도슨트 체험", "track": "친환경 관광 & 로컬 브랜드", "category": "관광·문화·아카이빙"},
    "problem": {"target_user": "제주 방문 관광객 및 문화 연구자", "context": "해녀 고령화로 인한 전통 문화 고갈 위기", "observed_problem": "상업화된 관광과 진짜 해녀 문화 간의 괴리", "current_alternative": "해녀 박물관 수동 관람", "consequence": "지역 고유 문화 인지도 감소"},
    "people_context": {"primary_users": "친환경/지속가능 관광객", "affected_stakeholders": "한수풀 해녀 공동체, 지역 관광공사", "operating_context": "한림읍 귀덕리 해녀합동사무소"},
    "solution": {"core_solution": "해녀 어르신 음성 아카이빙 AI 보이스 생성 + 3D 물질 지형 AR 뷰어", "user_flow": "QR 스캔 -> 해녀 삼춘 가상 도슨트 연결 -> 물질 스토리 청취", "expected_value": "해녀 공동체 직접 수익 환원 및 유산 보존"},
    "feasibility": {"required_people": "콘텐츠 기획자 1명, AR 개발자 1명", "required_resources": "고음질 녹음 장비, WebAR 연동 기술", "cost_range": "10m_to_50m_krw", "critical_constraints": "해녀 어르신들의 인터뷰 협조", "critical_risks": "사투리 인식 정확도", "unknowns": "체험객 기부금 전환율"},
    "impact": {"direct_beneficiaries": "귀덕리 해녀 25명", "expected_changes": "해녀 공동체 마을 기금 형성", "possible_negative_effects": "무단 촬영 관광객 미노출 요구", "measurable_indicators": "체험객 수, 만족도 점수"},
    "experiment": {"key_assumption": "관광객들이 음성 도슨트 청취 후 해녀 보존 기금을 자발적으로 기부할 것이다", "target_participants": "관광객 50명", "minimum_prototype": "웹 오디오 가이드 페이지", "test_method": "주말 2일간 현장 테스트", "success_criteria": "만족도 4.5/5.0 이상", "duration": "2일", "required_partner": "귀덕1리 어촌계", "risk_and_safeguard": "어촌계 사전 설명회 개최"},
    "provenance": {},
    "rights": {"visibility": "public", "author_ownership_acknowledged": true, "evaluation_consent_version": "1.0", "ai_processing_consent_version": "1.0"}
  }'::jsonb
) on conflict (id) do update set title = excluded.title, status = excluded.status;

-- Idea 5: "제주 원도심 빈집 팝업 코워킹" (박초보, DRAFT)
insert into public.ideas (
  id, challenge_id, owner_id, title, status, visibility, revision, working_passport
) values (
  '10000000-0000-4000-8000-000000000005',
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-0003-4000-8000-000000000003',
  '제주 원도심 빈집 모듈러 팝업 코워킹 스페이스',
  'DRAFT',
  'private',
  0,
  '{
    "identity": {"title": "제주 원도심 빈집 모듈러 팝업 코워킹 스페이스", "one_line_summary": "방치된 빈집을 디지털 노마드 워케이션 오피스로 재구성", "track": "지역 생활 불편 개선", "category": "도시재생·워케이션"},
    "problem": {"target_user": "제주 방문 워케이션 직장인 및 프리랜서", "context": "원도심 빈집 증가로 인한 우범화 및 도심 슬럼화", "observed_problem": "쾌적한 분리형 작업 공간 부족", "current_alternative": "일반 카페, 호텔 객실", "consequence": "원도심 공동화 심화"},
    "people_context": {"primary_users": "디지털 노마드, 원격 근무자", "affected_stakeholders": "빈집 소유주, 원도심 상인회", "operating_context": "무근성 및 삼도동 빈집"},
    "solution": {"core_solution": "경량 모듈러 가구로 48시간 내 빈집을 일인 오피스로 전환", "user_flow": "앱 예약 -> 스마트 도어락 입실 -> 업무 -> 퇴실", "expected_value": "원도심 유동인구 증가 및 유휴 자산 수익화"},
    "feasibility": {"required_people": "공간 디자이너 1명, 운영진 1명", "required_resources": "빈집 임대차 계약, 스마트 도어락", "cost_range": "10m_to_50m_krw", "critical_constraints": "소방법 및 안전 기준", "critical_risks": "소음민원", "unknowns": "초기 리모델링 비용"},
    "impact": {"direct_beneficiaries": "원도심 소상공인", "expected_changes": "주변 식당 매출 증가", "possible_negative_effects": "주차 공간 부족", "measurable_indicators": "가동률, 상권 지출액"},
    "experiment": {"key_assumption": "워케이션 이용자는 카페보다 독립된 빈집 오피스에 비용을 더 지불한다", "target_participants": "리모트 워커 10명", "minimum_prototype": "빈집 1곳 임시 청소 및 가구 배치", "test_method": "3일 일일권 테스트", "success_criteria": "예약률 80% 달성", "duration": "3일", "required_partner": "제주원도심재생센터", "risk_and_safeguard": "임시 화재경보기 설치"},
    "provenance": {},
    "rights": {"visibility": "private", "author_ownership_acknowledged": true, "evaluation_consent_version": "1.0", "ai_processing_consent_version": "1.0"}
  }'::jsonb
) on conflict (id) do update set title = excluded.title;

-- Idea 6: "스마트 감귤 박스 리사이클링" (최메이커, SUBMITTED)
insert into public.ideas (
  id, challenge_id, owner_id, title, status, visibility, revision, working_passport
) values (
  '10000000-0000-4000-8000-000000000006',
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-0004-4000-8000-000000000004',
  '친환경 회수형 플라스틱 감귤 박스 셰어링',
  'SUBMITTED',
  'public',
  1,
  '{
    "identity": {"title": "친환경 회수형 플라스틱 감귤 박스 셰어링", "one_line_summary": "1회용 종이박스를 대체하는 고강도 접이식 회수용 박스 순환 체계", "track": "자원 선순환 & 리사이클링", "category": "환경·물류"},
    "problem": {"target_user": "감귤 출하 농가 및 유통업체", "context": "매년 제주에서만 3천만 개 이상의 1회용 감귤 종이 상자 폐기", "observed_problem": "종이 상자 가격 상승 및 자원 낭비", "current_alternative": "일반 종이 박스 구매", "consequence": "탄소 배출 증가 및 농가 원가 상승"},
    "people_context": {"primary_users": "제주 농가 및 택배 수령 소비자", "affected_stakeholders": "택배사, 자원순환센터", "operating_context": "서귀포시 일대"},
    "solution": {"core_solution": "RFID 부착 접이식 친환경 박스 + 편의점/택배 거점 회수 보증금제", "user_flow": "농가 회수박스 출하 -> 소비자 수령 후 편의점 반납 -> 보증금 환급", "expected_value": "종이 폐기물 40% 감축"},
    "feasibility": {"required_people": "물류 설계자 1명, RFID 개발자 1명", "required_resources": "친환경 PP 회수 박스 1,000개", "cost_range": "10m_to_50m_krw", "critical_constraints": "회수율 85% 이상 유지", "critical_risks": "박스 미반납 분실", "unknowns": "소비자 반납 참여율"},
    "impact": {"direct_beneficiaries": "제주 감귤 농가 100곳", "expected_changes": "탄소 배출 50톤 절감", "possible_negative_effects": "초기 세척 관리비 발생", "measurable_indicators": "박스 회수율, 종이 상자 절감량"},
    "experiment": {"key_assumption": "보증금 1천원 설정 시 소비자는 편의점에 90% 이상 반납한다", "target_participants": "수도권 구매자 100명", "minimum_prototype": "RFID 스티커 부착 시범 박스", "test_method": "1회 출하 시 반납 추적", "success_criteria": "2주 내 반납률 80% 이상", "duration": "2주", "required_partner": "CU/GS25 제주 물류망", "risk_and_safeguard": "미반납 시 자동 보증금 차감"},
    "provenance": {},
    "rights": {"visibility": "public", "author_ownership_acknowledged": true, "evaluation_consent_version": "1.0", "ai_processing_consent_version": "1.0"}
  }'::jsonb
) on conflict (id) do update set title = excluded.title, status = excluded.status;

-- Idea 7: "어르신 맞춤형 AI 돌봄 콜센터" (정로컬, SUBMITTED)
insert into public.ideas (
  id, challenge_id, owner_id, title, status, visibility, revision, working_passport
) values (
  '10000000-0000-4000-8000-000000000007',
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-0005-4000-8000-000000000005',
  '제주 사투리 지원 AI 안부전화 & 이웃 매칭 서비스',
  'SUBMITTED',
  'public',
  1,
  '{
    "identity": {"title": "제주 사투리 지원 AI 안부전화 & 이웃 매칭 서비스", "one_line_summary": "제주 방언 음성인식 기반 독거노인 데일리 안부 콜과 이상징후 알림", "track": "지역 생활 불편 개선", "category": "복지·AI·AI코치"},
    "problem": {"target_user": "제주 시골 지역 1인 독거 어르신", "context": "독거노인 비율 증가로 인한 고독사 및 우울증 위험", "observed_problem": "기존 표준어 AI 안부콜은 사투리 알아듣지 못함", "current_alternative": "생활지원사 주 1회 방문", "consequence": "응급 상황 상시 감지 불가"},
    "people_context": {"primary_users": "80세 이상 독거 어르신", "affected_stakeholders": "노인복지관, 마을 부녀회, 자녀", "operating_context": "한림읍 및 대정읍 마을"},
    "solution": {"core_solution": "제주 방언 파인튜닝 음성 AI 안부 콜 + 이상 반응 시 마을 이장 즉시 알림", "user_flow": "매일 지정 시간 AI 전화 -> 제주 사투리 대화 -> 이상 반응 탐지 시 이장 알림", "expected_value": "독거노인 고독사 0건 유지 및 우울감 감소"},
    "feasibility": {"required_people": "AI 음성 엔지니어 1명, 사회복지사 1명", "required_resources": "제주 방언 음성 데이터셋, CTI 전화 서버", "cost_range": "10m_to_50m_krw", "critical_constraints": "통화 개인정보 보호", "critical_risks": "오인 알림 발송", "unknowns": "사투리 인식률"},
    "impact": {"direct_beneficiaries": "독거 어르신 50명", "expected_changes": "응급 상황 대응 시간 10분 이내 단축", "possible_negative_effects": "기계적 대화에 대한 거부감", "measurable_indicators": "통화 성공률, 응급 알림 정확도"},
    "experiment": {"key_assumption": "제주 방언 억양을 적용하면 통화 지속 시간이 2배 이상 길어진다", "target_participants": "어르신 10명", "minimum_prototype": "인간 상담원 대역 제주 방언 통화 시뮬레이션", "test_method": "5일간 일일 통화", "success_criteria": "통화 응답률 90% 이상", "duration": "5일", "required_partner": "제주시 노인복지관", "risk_and_safeguard": "비상시 119 자동 다이얼 연동"},
    "provenance": {},
    "rights": {"visibility": "public", "author_ownership_acknowledged": true, "evaluation_consent_version": "1.0", "ai_processing_consent_version": "1.0"}
  }'::jsonb
) on conflict (id) do update set title = excluded.title, status = excluded.status;

-- Idea 8: "제주 올레길 줍깅 AI 가이드" (최메이커, PILOT_READY)
insert into public.ideas (
  id, challenge_id, owner_id, title, status, visibility, revision, working_passport
) values (
  '10000000-0000-4000-8000-000000000008',
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-0004-4000-8000-000000000004',
  '올레길 플로깅 리워드 & 해양 쓰레기 AI 이미지 판독',
  'PILOT_READY',
  'public',
  2,
  '{
    "identity": {"title": "올레길 플로깅 리워드 & 해양 쓰레기 AI 이미지 판독", "one_line_summary": "줍깅 사진 찍으면 AI가 쓰레기 종류 판별하여 로컬 쿠폰 지급", "track": "자원 선순환 & 리사이클링", "category": "환경·관광·AI"},
    "problem": {"target_user": "올레길 도보 여행객", "context": "해안가 해양 쓰레기 투기로 인한 올레길 환경 훼손", "observed_problem": "자발적 줍깅의 지속 가능성 및 리워드 부족", "current_alternative": "수동 봉사활동 신청", "consequence": "해양 미세플라스틱 증가"},
    "people_context": {"primary_users": "2030 트레킹 관광객", "affected_stakeholders": "사단법인 제주올레, 로컬 카페", "operating_context": "올레 7코스 (외돌개~월평)"},
    "solution": {"core_solution": "플로깅 봉투 QR 인증 + 촬영 사진 AI 분석 + 지역 카페 음료 할인권", "user_flow": "봉투 수령 -> 줍깅 사진 촬영 업로드 -> AI 검증 -> 쿠폰 발급", "expected_value": "코스당 월 1톤 해양 쓰레기 회수"},
    "feasibility": {"required_people": "모바일 앱 개발자 1명, AI 모델러 1명", "required_resources": "비전 AI 객체 인식 모델, 제휴 카페 10곳", "cost_range": "10m_to_50m_krw", "critical_constraints": "부정 촬영(인터넷 이미지) 방지", "critical_risks": "제휴 가맹점 쿠폰 정산 지연", "unknowns": "이용자 1인당 회수량"},
    "impact": {"direct_beneficiaries": "올레길 탐방객 및 제휴 카페", "expected_changes": "코스 청결도 상위 10% 유지", "possible_negative_effects": "지정 장소 이외 쓰레기 투기", "measurable_indicators": "업로드 사진 수, 수거 쓰레기 무게"},
    "experiment": {"key_assumption": "무료 아메리카노 쿠폰이 플로깅 참여율을 3배 이상 높인다", "target_participants": "올레꾼 30명", "minimum_prototype": "웹폼 인스타그램 사진 제출 방식", "test_method": "주말 7코스 현장 운영", "success_criteria": "30명 전원 줍깅 완수", "duration": "2일", "required_partner": "서귀포 로컬카페 협동조합", "risk_and_safeguard": "GPS 위치 기반 실시간 사진 검증"},
    "provenance": {},
    "rights": {"visibility": "public", "author_ownership_acknowledged": true, "evaluation_consent_version": "1.0", "ai_processing_consent_version": "1.0"}
  }'::jsonb
) on conflict (id) do update set title = excluded.title, status = excluded.status;

-- Idea 9: "스마트 빗물 재활용 정원" (정로컬, ELIGIBLE)
insert into public.ideas (
  id, challenge_id, owner_id, title, status, visibility, revision, working_passport
) values (
  '10000000-0000-4000-8000-000000000009',
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-0005-4000-8000-000000000005',
  '제주 우수(雨水) 활용 스마트 자원순환 정원',
  'ELIGIBLE',
  'public',
  1,
  '{
    "identity": {"title": "제주 우수(雨水) 활용 스마트 자원순환 정원", "one_line_summary": "제주의 풍부한 빗물을 모아 소분구 조경수로 자동 공급하는 IoT 빗물 저류조", "track": "자원 선순환 & 리사이클링", "category": "환경·스마트시티"},
    "problem": {"target_user": "마을 공원 관리자 및 지역 주민", "context": "여름철 집중호우 빗물 유실 및 가뭄 시 조경수용 상수도 과다 사용", "observed_problem": "빗물 활용 인프라 부재", "current_alternative": "수도꼭지 상수도 살수", "consequence": "상수도 자원 낭비"},
    "people_context": {"primary_users": "마을공동체 정원 관리팀", "affected_stakeholders": "제주 수자원공사, 주민센터", "operating_context": "연동 어린이공원"},
    "solution": {"core_solution": "필터링 모듈 부착 빗물저류조 + 토양 습도 센서 자동 관수", "user_flow": "빗물 수집 -> 필터 정화 -> 토양 건조 시 자동 관수 시스템 작동", "expected_value": "조경용 상수도 사용량 80% 절감"},
    "feasibility": {"required_people": "하드웨어 엔지니어 1명", "required_resources": "500L 빗물 탱크, 태양광 센서 모듈", "cost_range": "1m_to_10m_krw", "critical_constraints": "동절기 결빙 방지", "critical_risks": "모기 등 벌레 번식", "unknowns": "필터 교체 주기"},
    "impact": {"direct_beneficiaries": "연동 주민 200명", "expected_changes": "수도 요금 절감", "possible_negative_effects": "장마철 오버플로우", "measurable_indicators": "빗물 재활용 누적 리터 수"},
    "experiment": {"key_assumption": "소형 500L 저류조로 공원 화단 1곳의 여름철 물 공급이 가능하다", "target_participants": "정원 봉사자 5명", "minimum_prototype": "수동 밸브 빗물통 모듈", "test_method": "2주간 관수 관찰", "success_criteria": "상수도 관수 0회 달성", "duration": "2주", "required_partner": "연동 주민자치위원회", "risk_and_safeguard": "미세 망사 필터 3중 장착"},
    "provenance": {},
    "rights": {"visibility": "public", "author_ownership_acknowledged": true, "evaluation_consent_version": "1.0", "ai_processing_consent_version": "1.0"}
  }'::jsonb
) on conflict (id) do update set title = excluded.title, status = excluded.status;

-- Idea 10: "제주 로컬 푸드 셰프 팝업" (이혁신, READY_FOR_REVIEW)
insert into public.ideas (
  id, challenge_id, owner_id, title, status, visibility, revision, working_passport
) values (
  '10000000-0000-4000-8000-000000000010',
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-0002-4000-8000-000000000002',
  '제주 제철 미식 자원과 청년 셰프 팝업 다이닝',
  'READY_FOR_REVIEW',
  'public',
  1,
  '{
    "identity": {"title": "제주 제철 미식 자원과 청년 셰프 팝업 다이닝", "one_line_summary": "못생긴 둔재 농산물을 활용한 청년 셰프 미식 팝업 레스토랑", "track": "스마트 농유통 혁신", "category": "식음료·로컬브랜드"},
    "problem": {"target_user": "미식 경험 선호 관광객 및 청년 셰프", "context": "규격 외 농산물(못난이 과일/채소)의 폐기 처리 문제", "observed_problem": "맛은 같으나 외관 문제로 상품 가치 상실", "current_alternative": "가공 공장 저가 매각", "consequence": "농가 부가가치 창출 한계"},
    "people_context": {"primary_users": "파인 다이닝 선호 2040 고객", "affected_stakeholders": "제주 외식업 협회, 못난이 농가", "operating_context": "애월읍 팝업 공간"},
    "solution": {"core_solution": "못난이 농산물 주간 셰프 매칭 서브스크립션 + 주말 미식 팝업", "user_flow": "농가 수급 -> 셰프 코스 요리 개발 -> 주말 팝업 수긍 예약", "expected_value": "못난이 농산물 매입가 2배 상승"},
    "feasibility": {"required_people": "식음료 디렉터 1명, 셰프 2명", "required_resources": "주방 시설 공유 공간 계약", "cost_range": "10m_to_50m_krw", "critical_constraints": "식품위생법 영업 신고", "critical_risks": "원재료 수급 불균형", "unknowns": "팝업 티켓 판매 속도"},
    "impact": {"direct_beneficiaries": "농가 15곳, 청년 셰프 4명", "expected_changes": "농가 부가 소득 발생", "possible_negative_effects": "단발성 이벤트 그칠 위험", "measurable_indicators": "못난이 농산물 소비 kg수, 티켓 매진율"},
    "experiment": {"key_assumption": "못난이 당근으로 만든 디저트 코스 티켓 50장이 1시간 내 매진될 것이다", "target_participants": "고객 50명", "minimum_prototype": "인스타그램 예약 폼", "test_method": "1일 팝업 다이닝", "success_criteria": "티켓 완판 및 만점 후기", "duration": "1일", "required_partner": "제주 셰프 크루", "risk_and_safeguard": "영업 배상 책임 보험 가입"},
    "provenance": {},
    "rights": {"visibility": "public", "author_ownership_acknowledged": true, "evaluation_consent_version": "1.0", "ai_processing_consent_version": "1.0"}
  }'::jsonb
) on conflict (id) do update set title = excluded.title, status = excluded.status;


-- -----------------------------------------------------------------------------
-- 8. Immutable Idea Versions
-- -----------------------------------------------------------------------------
insert into public.idea_versions (
  id, idea_id, version_number, title, passport, content_hash, submitted_at, submitted_by
) values
  -- Version for Idea 1
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 1, '제주 중산간 마을 고령자 온데만데 이동 도우미', (select working_passport from public.ideas where id = '10000000-0000-4000-8000-000000000001'), 'sha256_hash_idea_1_v1', now() - interval '10 days', 'aaaaaaaa-0001-4000-8000-000000000001'),
  -- Version for Idea 3
  ('20000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000003', 1, '제주 소농 AI 수요예측 공동 직거래 플랫폼', (select working_passport from public.ideas where id = '10000000-0000-4000-8000-000000000003'), 'sha256_hash_idea_3_v1', now() - interval '20 days', 'aaaaaaaa-0002-4000-8000-000000000002'),
  -- Version for Idea 4
  ('20000000-0000-4000-8000-000000000004', '10000000-0000-4000-8000-000000000004', 1, '제주 해녀 삼춘과의 인터랙티브 디지털 아카이빙', (select working_passport from public.ideas where id = '10000000-0000-4000-8000-000000000004'), 'sha256_hash_idea_4_v1', now() - interval '30 days', 'aaaaaaaa-0002-4000-8000-000000000002'),
  -- Version for Idea 6
  ('20000000-0000-4000-8000-000000000006', '10000000-0000-4000-8000-000000000006', 1, '친환경 회수형 플라스틱 감귤 박스 셰어링', (select working_passport from public.ideas where id = '10000000-0000-4000-8000-000000000006'), 'sha256_hash_idea_6_v1', now() - interval '5 days', 'aaaaaaaa-0004-4000-8000-000000000004'),
  -- Version for Idea 7
  ('20000000-0000-4000-8000-000000000007', '10000000-0000-4000-8000-000000000007', 1, '제주 사투리 지원 AI 안부전화 & 이웃 매칭 서비스', (select working_passport from public.ideas where id = '10000000-0000-4000-8000-000000000007'), 'sha256_hash_idea_7_v1', now() - interval '4 days', 'aaaaaaaa-0005-4000-8000-000000000005'),
  -- Version for Idea 8
  ('20000000-0000-4000-8000-000000000008', '10000000-0000-4000-8000-000000000008', 1, '올레길 플로깅 리워드 & 해양 쓰레기 AI 이미지 판독', (select working_passport from public.ideas where id = '10000000-0000-4000-8000-000000000008'), 'sha256_hash_idea_8_v1', now() - interval '8 days', 'aaaaaaaa-0004-4000-8000-000000000004')
on conflict (id) do nothing;

-- Update ideas with submitted_version_id
update public.ideas set submitted_version_id = '20000000-0000-4000-8000-000000000001' where id = '10000000-0000-4000-8000-000000000001';
update public.ideas set submitted_version_id = '20000000-0000-4000-8000-000000000003' where id = '10000000-0000-4000-8000-000000000003';
update public.ideas set submitted_version_id = '20000000-0000-4000-8000-000000000004' where id = '10000000-0000-4000-8000-000000000004';
update public.ideas set submitted_version_id = '20000000-0000-4000-8000-000000000006' where id = '10000000-0000-4000-8000-000000000006';
update public.ideas set submitted_version_id = '20000000-0000-4000-8000-000000000007' where id = '10000000-0000-4000-8000-000000000007';
update public.ideas set submitted_version_id = '20000000-0000-4000-8000-000000000008' where id = '10000000-0000-4000-8000-000000000008';

-- -----------------------------------------------------------------------------
-- 9. Idea Provenance, Claims & Evidence
-- -----------------------------------------------------------------------------
insert into public.idea_field_provenance (idea_version_id, field_path, source, confirmed_by, confirmed_at) values
  ('20000000-0000-4000-8000-000000000003', 'problem.observed_problem', 'user_original', 'aaaaaaaa-0002-4000-8000-000000000002', now() - interval '20 days'),
  ('20000000-0000-4000-8000-000000000003', 'solution.core_solution', 'ai_suggested', 'aaaaaaaa-0002-4000-8000-000000000002', now() - interval '19 days'),
  ('20000000-0000-4000-8000-000000000003', 'experiment.minimum_prototype', 'user_edited', 'aaaaaaaa-0002-4000-8000-000000000002', now() - interval '18 days')
on conflict do nothing;

insert into public.idea_claims (idea_version_id, claim_type, content, section) values
  ('20000000-0000-4000-8000-000000000003', 'fact', '제주 농가의 70%는 중간 유통 수수료로 40% 이상을 지출한다', 'problem'),
  ('20000000-0000-4000-8000-000000000003', 'assumption', '소비자는 당도 검증 감귤에 15% 프리미엄 가격을 지불할 용의가 있다', 'experiment'),
  ('20000000-0000-4000-8000-000000000003', 'expected_impact', '참여 소농의 유통비 부담이 30% 감축될 것이다', 'impact')
on conflict do nothing;

insert into public.idea_evidence_items (idea_version_id, title, source_type, url, description) values
  ('20000000-0000-4000-8000-000000000003', '2025 제주 농가 유통 실태 조사 보고서', 'reference', 'https://example.com/jeju-farm-report-2025', '농림축산식품부 제주 농산물 유통 구조 분석 데이터')
on conflict do nothing;

-- -----------------------------------------------------------------------------
-- 10. AI Coach Conversations & Messages
-- -----------------------------------------------------------------------------
insert into public.conversations (id, idea_id, stage) values
  ('30000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'feasibility'),
  ('30000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000002', 'problem'),
  ('30000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000003', 'experiment')
on conflict (idea_id) do nothing;

insert into public.conversation_messages (conversation_id, sender, content, suggestion_payload, suggestion_status) values
  ('30000000-0000-4000-8000-000000000003', 'user', '농가 분들이 연세가 많으셔서 앱으로 직거래 주문을 확인하기 어려워하시는데 해결 방법이 있을까요?', null, null),
  ('30000000-0000-4000-8000-000000000003', 'ai_coach', '어르신 농가를 위해 복잡한 앱 대신 [카카오 알림톡 자동 수신]과 [음성 확인 ARS]를 연동하는 방안을 제안합니다. 실험 계획의 최소 프로토타입 항목에 추가해보시겠어요?', '{"field_path": "experiment.minimum_prototype", "value": "카카오 알림톡 수신 및 음성 안내 ARS 기반 최소 주문 확인 체계"}'::jsonb, 'accepted'),
  ('30000000-0000-4000-8000-000000000003', 'user', '좋은 아이디어네요! 알림톡과 ARS 방식을 최소 프로토타입으로 반영했습니다.', null, null)
on conflict do nothing;

-- -----------------------------------------------------------------------------
-- 11. Evaluations & Assignments
-- -----------------------------------------------------------------------------
insert into public.evaluation_assignments (id, evaluator_id, idea_version_id, status) values
  ('40000000-0000-4000-8000-000000000001', 'aaaaaaaa-0006-4000-8000-000000000006', '20000000-0000-4000-8000-000000000001', 'IN_PROGRESS'),
  ('40000000-0000-4000-8000-000000000002', 'aaaaaaaa-0006-4000-8000-000000000006', '20000000-0000-4000-8000-000000000003', 'SUBMITTED'),
  ('40000000-0000-4000-8000-000000000003', 'aaaaaaaa-0007-4000-8000-000000000007', '20000000-0000-4000-8000-000000000003', 'SUBMITTED'),
  ('40000000-0000-4000-8000-000000000004', 'aaaaaaaa-0008-4000-8000-000000000008', '20000000-0000-4000-8000-000000000008', 'SUBMITTED')
on conflict (evaluator_id, idea_version_id) do update set status = excluded.status;

-- AI Evaluations (Automatic Rubric Score)
insert into public.evaluations (idea_version_id, evaluator_id, evaluation_type, score, rubric_scores, rationale) values
  ('20000000-0000-4000-8000-000000000001', null, 'AI', 78.00, '{"problem_importance":12,"user_understanding":12,"solution_fit":16,"differentiation":7,"feasibility":12,"experimentability":8,"social_value_inclusion":8,"clarity_evidence":3}', '중산간 마을 고령자 이동 문제의 정의가 명확하나 마을 셔틀 운영비 지속가능성에 대한 추가 검증이 필요합니다.'),
  ('20000000-0000-4000-8000-000000000003', null, 'AI', 85.00, '{"problem_importance":13,"user_understanding":14,"solution_fit":17,"differentiation":8,"feasibility":13,"experimentability":9,"social_value_inclusion":8,"clarity_evidence":3}', '제주 소농의 유통 문제 해결책과 AI 수요예측 모델 도입의 실증 가치가 매우 높으며 최소 실험 설계가 구체적입니다.'),
  ('20000000-0000-4000-8000-000000000008', null, 'AI', 82.00, '{"problem_importance":12,"user_understanding":13,"solution_fit":17,"differentiation":9,"feasibility":12,"experimentability":8,"social_value_inclusion":6,"clarity_evidence":5}', '올레길 해양 쓰레기 투기 문제에 리워드와 비전 AI를 결합한 접근이 신선하며 가맹점 확보가 관건입니다.')
on conflict do nothing;

-- Expert Evaluations
insert into public.evaluations (idea_version_id, evaluator_id, evaluation_type, score, rubric_scores, rationale) values
  ('20000000-0000-4000-8000-000000000003', 'aaaaaaaa-0006-4000-8000-000000000006', 'EXPERT', 88.00, '{"problem_reality":14,"user_value":14,"solution_fit":18,"feasibility":18,"pilotability":14,"scalability":4,"social_value_safety":6}', '소농 대상 유통비 절감 효과가 직관적이며 제주 물류 협동조합과의 파트너십 구조가 매우 실질적입니다. 파일럿 추진을 강하게 추천합니다.'),
  ('20000000-0000-4000-8000-000000000003', 'aaaaaaaa-0007-4000-8000-000000000007', 'EXPERT', 84.00, '{"problem_reality":13,"user_value":13,"solution_fit":17,"feasibility":17,"pilotability":13,"scalability":4,"social_value_safety":7}', '지역 상생 가치가 우수하고 사전 예약 기반 생산-소비 매칭 논리가 잘 짜여 있습니다.'),
  ('20000000-0000-4000-8000-000000000008', 'aaaaaaaa-0008-4000-8000-000000000008', 'EXPERT', 86.00, '{"problem_reality":13,"user_value":14,"solution_fit":18,"feasibility":16,"pilotability":15,"scalability":4,"social_value_safety":6}', '서귀포시 올레 7코스 현장 실증 준비가 잘 갖춰져 있으며 올레꾼들의 호응이 기대됩니다.')
on conflict do nothing;

-- Pairwise Votes
insert into public.pairwise_votes (voter_id, challenge_id, idea_version_a_id, idea_version_b_id, choice, reasoning) values
  ('aaaaaaaa-0006-4000-8000-000000000006', '11111111-1111-1111-1111-111111111111', '20000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000003', 'B', '농산물 직거래 플랫폼이 파일럿 실행 가능성과 경제적 파급효과 면에서 우수함'),
  ('aaaaaaaa-0007-4000-8000-000000000007', '11111111-1111-1111-1111-111111111111', '20000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000003', 'B', '수요 예측과 묶음 배송 모델의 실증 구체성이 더 높음')
on conflict (voter_id, idea_version_a_id, idea_version_b_id) do nothing;

-- -----------------------------------------------------------------------------
-- 12. Selection Decisions
-- -----------------------------------------------------------------------------
insert into public.selection_decisions (id, idea_version_id, challenge_id, decided_by, decision, reason, snapshot_data) values
  ('50000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-0009-4000-8000-000000000009', 'pilot_ready', '전문가 심사 평점 86점 및 지역 물류 파트너십 구축 완료로 즉시 현장 실증(Pilot)을 추진합니다.', '{"composite_score": 85.5}'),
  ('50000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000004', '33333333-3333-3333-3333-333333333333', 'aaaaaaaa-0009-4000-8000-000000000009', 'promising', '제주 해녀 구술사 디지털 아카이빙 우수 아이디어로 검증 완료 판정을 부여합니다.', '{"composite_score": 88.0}'),
  ('50000000-0000-4000-8000-000000000008', '20000000-0000-4000-8000-000000000008', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-0009-4000-8000-000000000009', 'pilot_ready', '서귀포시 올레 7코스 줍깅 AI 실증 진행 건으로 pilot_ready로 선발합니다.', '{"composite_score": 84.0}')
on conflict (id) do update set decision = excluded.decision, reason = excluded.reason;

-- -----------------------------------------------------------------------------
-- 13. Pilots, Participants & Updates
-- -----------------------------------------------------------------------------
insert into public.pilots (id, idea_version_id, challenge_id, status, title, description, started_at) values
  ('60000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', '11111111-1111-1111-1111-111111111111', 'IN_PROGRESS', '구좌읍 당근 소농 5가구 AI 직거래 현장 실증', '4주간 구좌읍 당근 농가를 대상으로 사전 예약 직거래 및 거점 물류 묶음 배송 테스트', now() - interval '10 days')
on conflict (id) do update set status = excluded.status;

insert into public.pilot_participants (pilot_id, user_id, organization_id, role) values
  ('60000000-0000-4000-8000-000000000003', 'aaaaaaaa-0002-4000-8000-000000000002', null, 'idea_owner'),
  ('60000000-0000-4000-8000-000000000003', 'aaaaaaaa-0012-4000-8000-000000000012', 'bbbbbbbb-0002-4000-8000-000000000002', 'partner')
on conflict (pilot_id, user_id) do update set role = excluded.role;

insert into public.pilot_updates (pilot_id, author_id, type, title, content) values
  ('60000000-0000-4000-8000-000000000003', 'aaaaaaaa-0002-4000-8000-000000000002', 'milestone', '구좌읍 당근 농가 5곳 현장 오리엔테이션 완료', '참여 농가 5곳과 사전 예약 가격 및 출하 기준 합의 완료'),
  ('60000000-0000-4000-8000-000000000003', 'aaaaaaaa-0002-4000-8000-000000000002', 'metric', '1차 사전 예약 50박스 24시간 만에 조기 매진', '카카오 톡딜 형태 모바일 웹을 통해 목표 물량 50박스 사전 예약 완판 기록')
on conflict do nothing;

-- -----------------------------------------------------------------------------
-- 14. Showcase & Sponsor Reports
-- -----------------------------------------------------------------------------
insert into public.showcase_permissions (id, idea_version_id, granted_by, scope) values
  ('70000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'aaaaaaaa-0002-4000-8000-000000000002', 'both'),
  ('70000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000004', 'aaaaaaaa-0002-4000-8000-000000000002', 'both')
on conflict do nothing;

insert into public.sponsor_report_snapshots (id, sponsorship_id, challenge_id, report_data, status, approved_by, approved_at, published_at) values
  ('80000000-0000-4000-8000-000000000001', 'dddddddd-0001-4000-8000-000000000001', '11111111-1111-1111-1111-111111111111', '{"funnel": {"total_ideas": 9, "submitted": 5, "pilot_ready": 2}, "summary": "2026년 8월 챌린지 중간 현황 보고서"}', 'published', 'aaaaaaaa-0009-4000-8000-000000000009', now() - interval '2 days', now() - interval '1 day')
on conflict (id) do update set status = excluded.status;

insert into public.sponsor_showcase_items (snapshot_id, idea_version_id, showcase_permission_id, summary_data) values
  ('80000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000003', '70000000-0000-4000-8000-000000000003', '{"title": "제주 소농 AI 직거래 플랫폼", "category": "농업·유통", "highlights": "농가 수수료 15% 감축 실증중"}')
on conflict do nothing;

insert into public.sponsor_pilot_summaries (snapshot_id, pilot_id, summary_data) values
  ('80000000-0000-4000-8000-000000000001', '60000000-0000-4000-8000-000000000003', '{"pilot_title": "구좌읍 당근 소농 AI 직거래 현장 실증", "status": "IN_PROGRESS", "metrics": {"presale_boxes": 50, "sellout_hours": 24}}')
on conflict do nothing;

-- -----------------------------------------------------------------------------
-- 15. Sample Notifications & Audit Events
-- -----------------------------------------------------------------------------
insert into public.notifications (user_id, type, title, body, target_route) values
  ('aaaaaaaa-0002-4000-8000-000000000002', 'selection_result', '축하합니다! 아이디어가 Pilot Ready로 선정되었습니다.', '제주 소농 AI 직거래 플랫폼 아이디어가 실증 트랙으로 선정되었습니다.', '/pilots/60000000-0000-4000-8000-000000000003'),
  ('aaaaaaaa-0001-4000-8000-000000000001', 'idea_status', '아이디어 평가가 진행 중입니다.', '제주 중산간 마을 고령자 온데만데 이동 도우미 아이디어의 심사가 시작되었습니다.', '/ideas/10000000-0000-4000-8000-000000000001/passport'),
  ('aaaaaaaa-0006-4000-8000-000000000006', 'evaluation_task', '새로운 심사 과제가 할당되었습니다.', '2026년 8월 챌린지 신규 제출 아이디어 1건을 심사해 주세요.', '/expert/reviews/40000000-0000-4000-8000-000000000001')
on conflict do nothing;

insert into public.audit_events (actor_id, action, object_type, object_id, request_id, metadata) values
  ('aaaaaaaa-0009-4000-8000-000000000009', 'RECORD_SELECTION', 'selection_decision', '50000000-0000-4000-8000-000000000003', gen_random_uuid(), '{"decision": "pilot_ready"}'),
  ('aaaaaaaa-0009-4000-8000-000000000009', 'PUBLISH_SPONSOR_REPORT', 'sponsor_report_snapshot', '80000000-0000-4000-8000-000000000001', gen_random_uuid(), '{"status": "published"}')
on conflict do nothing;

commit;
