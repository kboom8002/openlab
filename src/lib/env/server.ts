import "server-only";
import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),
  OPENAI_API_KEY: z.string().min(20).optional(),
  APP_ENV: z.enum(["local", "preview", "staging", "production"]).default("local"),
});

export function serverEnv() { return schema.parse(process.env); }
