import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const CHAL_8_LOCAL = '11111111-1111-1111-1111-111111111111';
const CHAL_6_CARE = '55555555-5555-5555-5555-555555555555';
const CHAL_7_TOUR = '33333333-3333-3333-3333-333333333333';
const CHAL_5_STORE = '66666666-6666-6666-6666-666666666666';

async function executeSeedingPart2() {
  console.log('--- Starting Part 2 Seeding (Fixed) ---');

  const FALLBACK_USER = 'aaaaaaaa-0001-4000-8000-000000000001';
  const FALLBACK_EXPERT = 'aaaaaaaa-0008-4000-8000-000000000008';

  const getPassportData = (title, summary, track) => ({
    identity: { title, one_line_summary: summary, track, category: 'Service' },
    problem: { target_user: '지역 주민', context: '일상 맥락', observed_problem: '불편함 지속', current_alternative: '없음', consequence: '불만 증가' },
    people_context: { primary_users: '주민', affected_stakeholders: '지자체', operating_context: '제주' },
    solution: { core_solution: 'AI 기반 매칭 및 알림', user_flow: '앱 접속 -> 신청 -> 매칭', expected_value: '편의성 증대' },
    feasibility: { required_people: '운영자 1명', required_resources: '서버 비용', cost_range: 'under_1m_krw', critical_constraints: '초기 홍보', critical_risks: '사용률 저조', unknowns: '유지보수 비용' },
    impact: { direct_beneficiaries: '참여 주민', expected_changes: '만족도 30% 증가', possible_negative_effects: '디지털 소외', measurable_indicators: 'MAU 1000명' },
    experiment: { key_assumption: '사용자가 앱을 적극 활용할 것이다', target_participants: '100명', minimum_prototype: '카카오톡 챗봇', test_method: '30일 실사용 테스트', success_criteria: '재방문율 30%', duration: 30, required_partner: '지역 상인회', risk_and_safeguard: '개인정보 보호' },
    provenance: {},
    rights: { visibility: 'public', author_ownership_acknowledged: true, evaluation_consent_version: 'v1.0', ai_processing_consent_version: 'v1.0' }
  });

  const generateContentHash = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64');

  const versionsToInsert = [
    {
      id: '20000000-0000-4000-8000-000000000001',
      idea_id: '10000000-0000-4000-8000-000000000001',
      version_number: 1,
      title: '제주 중산간 마을 고령자 온데만데 이동 도우미',
      passport: getPassportData('제주 중산간 마을 고령자 온데만데 이동 도우미', '고령자의 병원/장보기 이동을 돕는 지역 커뮤니티 매칭', '생활불편'),
      submitted_by: FALLBACK_USER
    },
    {
      id: '20000000-0000-4000-8000-000000000011',
      idea_id: '10000000-0000-4000-8000-000000000011',
      version_number: 2,
      title: '제주 시골 마을 AI 복약 알리미 & 건강 챗봇',
      passport: getPassportData('제주 시골 마을 AI 복약 알리미 & 건강 챗봇', '보건소 연계 고령자 투약 관리 챗봇', '고령자 돌봄'),
      submitted_by: FALLBACK_USER
    },
    {
      id: '20000000-0000-4000-8000-000000000017',
      idea_id: '10000000-0000-4000-8000-000000000017',
      version_number: 1,
      title: '올레길 코스별 AI 맞춤 추천 & 실시간 혼잡도',
      passport: getPassportData('올레길 코스별 AI 맞춤 추천 & 실시간 혼잡도', '개인 취향과 체력 조건에 맞춘 올레길 AI 매칭', '친환경 관광'),
      submitted_by: FALLBACK_USER
    },
    {
      id: '20000000-0000-4000-8000-000000000012',
      idea_id: '10000000-0000-4000-8000-000000000012',
      version_number: 1,
      title: '독거 어르신 AI 안심 모니터링 & 이웃 알림',
      passport: getPassportData('독거 어르신 AI 안심 모니터링 & 이웃 알림', '전력·수도 패턴 기반 이상 감지', '고령자 돌봄'),
      submitted_by: FALLBACK_USER
    }
  ];

  // Disable triggers if possible, or just insert.
  // idea_versions is immutable. If we run this twice, it'll fail on UPDATE.
  // We'll use .insert() and ignore duplicates for idea_versions.
  for (const v of versionsToInsert) {
    v.content_hash = generateContentHash(v.passport);
    const { error } = await supabase.from('idea_versions').insert(v);
    if (error && error.code !== '23505') {
      console.error(`Error inserting idea_version ${v.title}:`, error);
    } else {
      // Update idea with submitted_version_id and passport
      await supabase.from('ideas').update({ 
        submitted_version_id: v.id,
        working_passport: v.passport
      }).eq('id', v.idea_id);
    }
  }
  console.log('Idea versions seeded.');

  // AI Evaluations
  const aiEvaluations = [
    { idea_version_id: '20000000-0000-4000-8000-000000000001', evaluation_type: 'AI', score: 85, rubric_scores: { problem: 13, user: 14, solution: 17, diff: 8, feasibility: 12, experiment: 9, social: 8, clarity: 4 }, rationale: '문제 정의가 구체적이며 사용자 이해도가 높습니다.' },
    { idea_version_id: '20000000-0000-4000-8000-000000000011', evaluation_type: 'AI', score: 88, rubric_scores: { problem: 14, user: 13, solution: 18, diff: 8, feasibility: 13, experiment: 9, social: 9, clarity: 4 }, rationale: '보건소와의 연계 가능성이 매우 현실적입니다.' },
    { idea_version_id: '20000000-0000-4000-8000-000000000017', evaluation_type: 'AI', score: 79, rubric_scores: { problem: 12, user: 11, solution: 16, diff: 7, feasibility: 11, experiment: 8, social: 7, clarity: 7 }, rationale: '올레길 관광객의 실질적 불편함을 잘 해결합니다.' }
  ];
  
  for (const e of aiEvaluations) {
    const { error } = await supabase.from('evaluations').insert(e);
    if (error && error.code !== '23505') console.error('Error inserting AI evaluation', error);
  }

  // Expert Evaluations
  const expertEvals = [
    { idea_version_id: '20000000-0000-4000-8000-000000000001', evaluator_id: FALLBACK_EXPERT, evaluation_type: 'EXPERT', score: 90, rubric_scores: { problem: 14, user: 14, solution: 18, feasibility: 18, pilot: 14, scale: 4, social: 8 }, rationale: '교통 약자를 위한 필수적인 서비스이며, 당장 실증 가능한 수준입니다.' },
    { idea_version_id: '20000000-0000-4000-8000-000000000011', evaluator_id: FALLBACK_EXPERT, evaluation_type: 'EXPERT', score: 92, rubric_scores: { problem: 15, user: 14, solution: 18, feasibility: 18, pilot: 14, scale: 4, social: 9 }, rationale: '고령자 복약 불이행 리스크를 크게 낮출 수 있습니다.' }
  ];
  for (const e of expertEvals) {
    const { error } = await supabase.from('evaluations').insert(e);
    if (error && error.code !== '23505') console.error('Error inserting Expert evaluation', error);
  }
  
  // Pilots
  const pilots = [
    { id: '60000000-0000-4000-8000-000000000011', idea_version_id: '20000000-0000-4000-8000-000000000011', challenge_id: CHAL_6_CARE, status: 'VALIDATED', title: '구좌읍 보건소 연계 AI 복약 알리미 시범운영', description: '65세 이상 어르신 50명 대상 카카오톡 기반 복약 알림 30일 테스트', started_at: '2026-05-15T00:00:00Z', completed_at: '2026-06-14T23:59:59Z' },
    { id: '60000000-0000-4000-8000-000000000012', idea_version_id: '20000000-0000-4000-8000-000000000012', challenge_id: CHAL_6_CARE, status: 'PLANNED', title: '표선면 독거어르신 안심 모니터링 실증', description: '스마트 미터기 데이터 분석을 통한 이상 징후 조기 발견 파일럿', started_at: null, completed_at: null }
  ];

  for (const p of pilots) {
    const { error } = await supabase.from('pilots').upsert(p, { onConflict: 'id' });
    if (error) console.error('Error inserting pilot', error);
  }

  console.log('Part 2 seeding completed.');
}

executeSeedingPart2().catch(console.error);
