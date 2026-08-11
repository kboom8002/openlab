import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Use Node.js built-in env file loading
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase URL or Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function verify() {
  console.log('--- Verifying Database Seed Data ---');

  const tables = [
    'profiles',
    'platform_role_assignments',
    'organizations',
    'organization_members',
    'challenge_series',
    'monthly_challenges',
    'challenge_tracks',
    'sponsorships',
    'challenge_participations',
    'consent_documents',
    'consent_acceptances',
    'ideas',
    'idea_versions',
    'idea_field_provenance',
    'idea_claims',
    'idea_evidence_items',
    'conversations',
    'conversation_messages',
    'evaluation_assignments',
    'evaluations',
    'pairwise_votes',
    'selection_decisions',
    'pilots',
    'pilot_participants',
    'pilot_updates',
    'showcase_permissions',
    'sponsor_report_snapshots',
    'sponsor_showcase_items',
    'sponsor_pilot_summaries',
    'notifications',
    'audit_events'
  ];

  let totalCount = 0;
  for (const table of tables) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.error(`Error querying ${table}:`, error.message);
    } else {
      console.log(`Table [${table.padEnd(28)}]: ${count ?? 0} rows`);
      totalCount += count ?? 0;
    }
  }

  console.log('-----------------------------------');
  console.log(`Total seed records verified across tables: ${totalCount}`);
}

verify().catch(console.error);
