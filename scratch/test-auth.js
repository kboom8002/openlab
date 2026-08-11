import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function test() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'test.admin123@example.com',
    password: 'Password123!',
    email_confirm: true,
    user_metadata: { display_name: '테스트' }
  });
  console.log('Result:', data, error);
}

test();
