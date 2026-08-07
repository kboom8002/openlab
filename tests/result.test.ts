import { describe, expect, it } from "vitest";
import { requestId } from "@/lib/result";

describe("requestId", () => { it("creates distinct UUIDs", () => { const a=requestId(); const b=requestId(); expect(a).not.toBe(b); expect(a).toMatch(/^[0-9a-f-]{36}$/); }); });
