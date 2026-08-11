import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
  console.log(`Connecting to: ${supabaseUrl}`);
  
  // Test connection by fetching a single idea
  const { data, error } = await supabase.from('ideas').select('id').limit(1);
  
  if (error) {
    console.error("Connection Error:", error.message);
    process.exit(1);
  }
  
  console.log("Success! Connected to the remote DB.");
  console.log("Returned data length:", data.length);
}

runTest();
