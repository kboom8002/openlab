import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Use Node.js built-in env file loading
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase URL or Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Organization ID from seed.sql
const ORG_ID_WELLB = 'bbbbbbbb-0001-4000-8000-000000000001';
const SERIES_ID = 'cccccccc-0001-4000-8000-000000000001';

// Existing Challenges
const CHAL_8_LOCAL = '11111111-1111-1111-1111-111111111111';
const CHAL_9_WORK = '22222222-2222-2222-2222-222222222222';
const CHAL_7_TOUR = '33333333-3333-3333-3333-333333333333';

// New Challenges
const CHAL_10_YOUTH = '44444444-4444-4444-4444-444444444444';
const CHAL_6_CARE = '55555555-5555-5555-5555-555555555555';
const CHAL_5_STORE = '66666666-6666-6666-6666-666666666666';

// New Tracks
const TRACK_YOUTH_1 = 'eeeeeeee-0005-4000-8000-000000000005';
const TRACK_YOUTH_2 = 'eeeeeeee-0006-4000-8000-000000000006';
const TRACK_CARE_1 = 'eeeeeeee-0007-4000-8000-000000000007';
const TRACK_CARE_2 = 'eeeeeeee-0008-4000-8000-000000000008';
const TRACK_STORE_1 = 'eeeeeeee-0009-4000-8000-000000000009';
const TRACK_STORE_2 = 'eeeeeeee-0010-4000-8000-000000000010';

const USERS = [
  { id: '13', email: 'oh.senior@wellb.example.com', name: '오시니어', bio: '은퇴 교사, 제주 원도심 거주', interests: ['복지', '교육'] },
  { id: '14', email: 'song.youth@wellb.example.com', name: '송청년', bio: '제주 이주 청년 창업자', interests: ['창업', '로컬'] },
  { id: '15', email: 'moon.farmer@wellb.example.com', name: '문농부', bio: '중산간 감귤 농가', interests: ['농업', '스마트팜'] },
  { id: '16', email: 'bae.nurse@wellb.example.com', name: '배간호', bio: '제주 시골 보건소 간호사', interests: ['의료', '돌봄'] },
  { id: '17', email: 'shin.designer@wellb.example.com', name: '신디자', bio: '프리랜서 UX 디자이너', interests: ['디자인', '접근성'] },
  { id: '18', email: 'kwon.teacher@wellb.example.com', name: '권선생', bio: '중학교 교사, 환경교육 담당', interests: ['환경', '교육'] },
  { id: '19', email: 'noh.diver@wellb.example.com', name: '노해녀', bio: '현직 해녀, 70대', interests: ['해양', '수산업'] },
  { id: '20', email: 'yang.cafe@wellb.example.com', name: '양카페', bio: '제주 카페 소상공인', interests: ['소상공인', 'F&B'] },
  { id: '21', email: 'ha.public@wellb.example.com', name: '하공무', bio: '제주시청 주민자치과', interests: ['행정', '공공서비스'] },
  { id: '22', email: 'jo.student@wellb.example.com', name: '조학생', bio: '제주대 컴퓨터공학과 학생', interests: ['IT', '청년'] }
];

// We also need existing users to assign ideas
const EXISTING_USERS = {
  kim: 'aaaaaaaa-0001-4000-8000-000000000001',
  lee: 'aaaaaaaa-0002-4000-8000-000000000002',
  park: 'aaaaaaaa-0003-4000-8000-000000000003',
  choi: 'aaaaaaaa-0004-4000-8000-000000000004',
  jung: 'aaaaaaaa-0005-4000-8000-000000000005',
};

const userMap = { ...EXISTING_USERS }; // Will populate with new users

async function executeSeeding() {
  console.log('--- Starting Demo Data Seeding ---');

  // 1. Create Users
  for (const u of USERS) {
    const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
    let existingUser = usersData?.users.find(x => x.email === u.email);
    
    if (!existingUser) {
      const { data, error } = await supabase.auth.admin.createUser({
        email: u.email,
        password: 'Demo1234!',
        email_confirm: true,
        user_metadata: { display_name: u.name }
      });
      if (error) {
        console.error(`Error creating user ${u.email}:`, error);
        continue;
      }
      existingUser = data.user;
      console.log(`Created user ${u.name} (${existingUser.id})`);
    } else {
      console.log(`User ${u.name} already exists (${existingUser.id})`);
    }

    userMap[`u${u.id}`] = existingUser.id;
    
    // Update profile
    await supabase.from('profiles').update({ 
      bio: u.bio, 
      interests: u.interests,
      onboarding_completed: true 
    }).eq('id', existingUser.id);
  }

  // 2. Insert New Monthly Challenges
  const challenges = [
    {
      id: CHAL_10_YOUTH,
      slug: '2026-10-youth-opportunity',
      title: '청년의 기회와 새로운 일',
      summary: '청년이 제주에서 머물고 일할 수 있는 혁신적인 환경을 고민합니다.',
      status: 'SCHEDULED',
      organization_id: ORG_ID_WELLB,
      series_id: SERIES_ID,
      opens_at: '2026-10-01T00:00:00Z',
      closes_at: '2026-10-31T23:59:59Z'
    },
    {
      id: CHAL_6_CARE,
      slug: '2026-06-inclusive-care',
      title: '함께 사는 돌봄과 생활',
      summary: '고령자, 아동, 약자 모두가 안전하고 편안하게 살 수 있는 지역 사회 안전망.',
      status: 'COMPLETED',
      organization_id: ORG_ID_WELLB,
      series_id: SERIES_ID,
      opens_at: '2026-06-01T00:00:00Z',
      closes_at: '2026-06-30T23:59:59Z'
    },
    {
      id: CHAL_5_STORE,
      slug: '2026-05-local-brand-ai',
      title: '동네 가게, AI로 발견되다',
      summary: '소상공인과 로컬 브랜드의 디지털 전환과 새로운 수익 창출 방안.',
      status: 'COMPLETED',
      organization_id: ORG_ID_WELLB,
      series_id: SERIES_ID,
      opens_at: '2026-05-01T00:00:00Z',
      closes_at: '2026-05-31T23:59:59Z'
    }
  ];

  for (const c of challenges) {
    const { error } = await supabase.from('monthly_challenges').upsert(c, { onConflict: 'id' });
    if (error) console.error(`Error inserting challenge ${c.slug}:`, error);
  }
  console.log('Challenges seeded.');

  // 3. Insert Tracks
  const tracks = [
    { id: TRACK_YOUTH_1, monthly_challenge_id: CHAL_10_YOUTH, name: '청년 창업 · 일자리 혁신', description: '', display_order: 1 },
    { id: TRACK_YOUTH_2, monthly_challenge_id: CHAL_10_YOUTH, name: '정주 환경 · 커뮤니티', description: '', display_order: 2 },
    { id: TRACK_CARE_1, monthly_challenge_id: CHAL_6_CARE, name: '고령자 돌봄 · 건강', description: '', display_order: 1 },
    { id: TRACK_CARE_2, monthly_challenge_id: CHAL_6_CARE, name: '육아 · 지역 안전망', description: '', display_order: 2 },
    { id: TRACK_STORE_1, monthly_challenge_id: CHAL_5_STORE, name: '소상공인 디지털 전환', description: '', display_order: 1 },
    { id: TRACK_STORE_2, monthly_challenge_id: CHAL_5_STORE, name: '로컬 브랜드 · AI 마케팅', description: '', display_order: 2 },
  ];

  for (const t of tracks) {
    const { error } = await supabase.from('challenge_tracks').upsert(t, { onConflict: 'id' });
    if (error) console.error(`Error inserting track ${t.name}:`, error);
  }
  console.log('Tracks seeded.');

  // 4. Enrollments (Challenge Participations)
  const participations = [];
  const addParticipation = (chal, users) => {
    users.forEach(u => participations.push({ user_id: u, monthly_challenge_id: chal }));
  };
  
  // Mix of old and new users
  addParticipation(CHAL_8_LOCAL, [userMap.kim, userMap.park, userMap.choi, userMap.jung, userMap.u14, userMap.u18, userMap.u21, userMap.u22]);
  addParticipation(CHAL_7_TOUR, [userMap.lee, userMap.u15, userMap.u17, userMap.u19]);
  addParticipation(CHAL_6_CARE, [userMap.kim, userMap.u13, userMap.u16, userMap.u21]);
  addParticipation(CHAL_5_STORE, [userMap.u17, userMap.u20, userMap.u13]);

  for (const p of participations) {
    const { error } = await supabase.from('challenge_participations').upsert(p, { onConflict: 'user_id, monthly_challenge_id' });
    if (error && error.code !== '23505') console.error(`Error inserting participation:`, error);
  }
  console.log('Participations seeded.');

  // 5. Insert Ideas (15 new ideas)
  const newIdeas = [
    { id: '10000000-0000-4000-8000-000000000011', challenge_id: CHAL_6_CARE, owner_id: userMap.u16, title: '제주 시골 마을 AI 복약 알리미 & 건강 챗봇', status: 'VALIDATED', visibility: 'public', revision: 2 },
    { id: '10000000-0000-4000-8000-000000000012', challenge_id: CHAL_6_CARE, owner_id: userMap.u13, title: '독거 어르신 AI 안심 모니터링 & 이웃 알림', status: 'PILOT_READY', visibility: 'public', revision: 1 },
    { id: '10000000-0000-4000-8000-000000000013', challenge_id: CHAL_6_CARE, owner_id: userMap.u21, title: '제주 워킹맘 긴급 돌봄 매칭 플랫폼', status: 'SUBMITTED', visibility: 'public', revision: 1 },
    { id: '10000000-0000-4000-8000-000000000014', challenge_id: CHAL_7_TOUR, owner_id: userMap.u15, title: '감귤밭 스마트 관수·시비 AI 어시스턴트', status: 'IN_PILOT', visibility: 'public', revision: 3 },
    { id: '10000000-0000-4000-8000-000000000015', challenge_id: CHAL_5_STORE, owner_id: userMap.u20, title: '제주 소상공인 AI 메뉴판 & 다국어 추천', status: 'ELIGIBLE', visibility: 'public', revision: 1 },
    { id: '10000000-0000-4000-8000-000000000016', challenge_id: CHAL_5_STORE, owner_id: userMap.u20, title: '동네 빵집 AI 재고 예측 & 당일 할인 알림', status: 'SUBMITTED', visibility: 'public', revision: 1 },
    { id: '10000000-0000-4000-8000-000000000017', challenge_id: CHAL_7_TOUR, owner_id: userMap.u17, title: '올레길 코스별 AI 맞춤 추천 & 실시간 혼잡도', status: 'PROMISING', visibility: 'public', revision: 1 },
    { id: '10000000-0000-4000-8000-000000000018', challenge_id: CHAL_8_LOCAL, owner_id: userMap.u14, title: '제주 청년 창업 AI 멘토링 매칭 시스템', status: 'SUBMITTED', visibility: 'public', revision: 1 },
    { id: '10000000-0000-4000-8000-000000000019', challenge_id: CHAL_8_LOCAL, owner_id: userMap.u18, title: '제주 해양 쓰레기 AI 분류 & 업사이클 자원화', status: 'UNDER_EVALUATION', visibility: 'public', revision: 1 },
    { id: '10000000-0000-4000-8000-000000000020', challenge_id: CHAL_5_STORE, owner_id: userMap.u13, title: '제주 전통 시장 AI 음성 안내 & 길찾기', status: 'DRAFT', visibility: 'private', revision: 0 },
    { id: '10000000-0000-4000-8000-000000000021', challenge_id: CHAL_7_TOUR, owner_id: userMap.u19, title: '해녀 채취 수산물 AI 원산지 인증 & 직거래', status: 'SUBMITTED', visibility: 'public', revision: 1 },
    { id: '10000000-0000-4000-8000-000000000022', challenge_id: CHAL_8_LOCAL, owner_id: userMap.u22, title: '제주 이주민 생활정보 AI 원스톱 안내', status: 'DRAFT', visibility: 'private', revision: 0 },
    { id: '10000000-0000-4000-8000-000000000023', challenge_id: CHAL_5_STORE, owner_id: userMap.u17, title: '제주 로컬 크리에이터 AI 콘텐츠 스튜디오', status: 'PILOT_READY', visibility: 'public', revision: 1 },
    { id: '10000000-0000-4000-8000-000000000024', challenge_id: CHAL_8_LOCAL, owner_id: userMap.u18, title: '제주 학교 급식 잔반 AI 분석 & 메뉴 최적화', status: 'ELIGIBLE', visibility: 'public', revision: 1 },
    { id: '10000000-0000-4000-8000-000000000025', challenge_id: CHAL_8_LOCAL, owner_id: userMap.u14, title: '제주 빈집 활용 청년 공유 주거 매칭', status: 'READY_FOR_REVIEW', visibility: 'private', revision: 0 },
  ];

  for (const idea of newIdeas) {
    const { error } = await supabase.from('ideas').upsert(idea, { onConflict: 'id' });
    if (error) console.error(`Error inserting idea ${idea.title}:`, error);
  }
  console.log('Ideas seeded.');
  console.log('Basic data seeding completed. We will add passports and evaluations next.');
}

executeSeeding().catch(console.error);
