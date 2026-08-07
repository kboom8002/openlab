export type AppErrorCode = "AUTH_SESSION_REQUIRED" | "ACCESS_OBJECT_NOT_FOUND" | "INPUT_INVALID" | "CONFLICT_STALE_DRAFT" | "INTERNAL_UNEXPECTED";
export type ActionResult<T> = { ok: true; data: T; meta: { requestId: string } } | { ok: false; error: { code: AppErrorCode; message: string; retryable: boolean }; meta: { requestId: string } };
export const requestId = () => crypto.randomUUID();
