import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Link from "next/link";
import { safeRoute } from "@/lib/routes";

export const dynamic = "force-dynamic";

export interface PilotUpdateItem {
  id: string;
  type: "progress" | "milestone" | "metric" | "result" | "note";
  title: string;
  content: string;
  createdAt: string;
}

export interface PilotParticipantCount {
  total: number;
  ideaOwner: number;
  partner: number;
  mentor: number;
  observer: number;
}

export interface PilotItem {
  id: string;
  title: string;
  description: string;
  status: "PLANNED" | "READY" | "IN_PROGRESS" | "PAUSED" | "COMPLETED" | "VALIDATED" | "NOT_VALIDATED" | "CANCELLED" | "ARCHIVED";
  challengeTitle: string;
  ideaVersionTitle: string;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  participants: PilotParticipantCount;
  recentUpdates: PilotUpdateItem[];
}

const UPDATE_TYPE_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  progress: { label: "진행 상황", bg: "#eff6ff", color: "#1d4ed8" },
  milestone: { label: "마일스톤", bg: "#fef3c7", color: "#b45309" },
  metric: { label: "성과 지표", bg: "#ecfdf5", color: "#047857" },
  result: { label: "실증 결과", bg: "#f3e8ff", color: "#6b21a8" },
  note: { label: "메모", bg: "#f3f4f6", color: "#374151" },
};

export default async function AdminPilotsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Query pilots from database table
  const { data: dbPilots } = await supabase
    .from("pilots")
    .select(`
      id,
      title,
      description,
      status,
      started_at,
      completed_at,
      created_at,
      idea_versions (
        title,
        monthly_challenges ( title )
      )
    `)
    .order("created_at", { ascending: false });

  // Query participants per pilot
  const { data: dbParticipants } = await supabase
    .from("pilot_participants")
    .select("pilot_id, role");

  // Query updates per pilot
  const { data: dbUpdates } = await supabase
    .from("pilot_updates")
    .select("id, pilot_id, type, title, content, created_at")
    .order("created_at", { ascending: false });

  let pilots: PilotItem[] = [];

  if (dbPilots && dbPilots.length > 0) {
    pilots = dbPilots.map((p) => {
      const pParts = (dbParticipants || []).filter((part) => part.pilot_id === p.id);
      const pUpdates = (dbUpdates || [])
        .filter((up) => up.pilot_id === p.id)
        .map((up) => ({
          id: up.id,
          type: up.type as PilotUpdateItem["type"],
          title: up.title,
          content: up.content,
          createdAt: up.created_at,
        }));

      const versionObj = p.idea_versions as unknown as { title?: string; monthly_challenges?: { title?: string } } | null;

      return {
        id: p.id,
        title: p.title,
        description: p.description || "",
        status: p.status as PilotItem["status"],
        challengeTitle: versionObj?.monthly_challenges?.title || "제주 오픈이노베이션 챌린지",
        ideaVersionTitle: versionObj?.title || p.title,
        startedAt: p.started_at,
        completedAt: p.completed_at,
        createdAt: p.created_at,
        participants: {
          total: pParts.length,
          ideaOwner: pParts.filter((r) => r.role === "idea_owner").length,
          partner: pParts.filter((r) => r.role === "partner").length,
          mentor: pParts.filter((r) => r.role === "mentor").length,
          observer: pParts.filter((r) => r.role === "observer").length,
        },
        recentUpdates: pUpdates,
      };
    });
  } else {
    // Demo / Sample Pilot data for administration review
    pilots = [
      {
        id: "pilot-001",
        title: "제주 한림읍 이동형 태양광 충전 스테이션 실증 파일럿",
        description: "지역 주민 참여형 자율 배분 및 친환경 이동 수단 충전 네트워크 구축 현장 실증",
        status: "IN_PROGRESS",
        challengeTitle: "2026-08 제주 지역 생활 돌봄 및 자원순환 챌린지",
        ideaVersionTitle: "스마트 태양광 기반 이동형 충전 스테이션 v2",
        startedAt: "2026-07-15T00:00:00Z",
        completedAt: null,
        createdAt: "2026-07-10T09:00:00Z",
        participants: {
          total: 6,
          ideaOwner: 1,
          partner: 3,
          mentor: 1,
          observer: 1,
        },
        recentUpdates: [
          {
            id: "up-101",
            type: "metric",
            title: "1주차 충전 가동률 94% 달성",
            content: "주민 120여 명 참여, 주간 CO2 배출 감소량 1.2톤 측정 성공",
            createdAt: "2026-07-28T14:30:00Z",
          },
          {
            id: "up-102",
            type: "milestone",
            title: "한림읍 마을회관 1호기 모듈 구축 완료",
            content: "지자체 인허가 및 현장 배전 설비 연결 검수 승인",
            createdAt: "2026-07-15T10:00:00Z",
          },
        ],
      },
      {
        id: "pilot-002",
        title: "마을 공동체 연계 빗물 재활용 수질 제어 자동화 파일럿",
        description: "농가 비닐하우스 및 공동 세척장 빗물 가공·정화 실무 검증 프로젝트",
        status: "PLANNED",
        challengeTitle: "2026-08 제주 지역 생활 돌봄 및 자원순환 챌린지",
        ideaVersionTitle: "마을 공동체 연계 빗물 재활용 수질 제어 v1",
        startedAt: null,
        completedAt: null,
        createdAt: "2026-07-25T11:20:00Z",
        participants: {
          total: 4,
          ideaOwner: 1,
          partner: 2,
          mentor: 1,
          observer: 0,
        },
        recentUpdates: [
          {
            id: "up-201",
            type: "note",
            title: "실증 장소 및 협약 기관 협의 착수",
            content: "제주 농업기술원 및 마을 리장단 실무 회의 진행 중",
            createdAt: "2026-07-29T16:00:00Z",
          },
        ],
      },
      {
        id: "pilot-003",
        title: "고령층 가구 AI 순환 케어 및 자동 알림 시스템 실증",
        description: "돌봄 공백 지역 내 IoT 센서 연동 24시간 안전 모니터링 실증",
        status: "VALIDATED",
        challengeTitle: "2026-06 스마트 복지 및 보건 챌린지",
        ideaVersionTitle: "고령층 가구 자율 배차 및 케어 서비스 v3",
        startedAt: "2026-05-01T00:00:00Z",
        completedAt: "2026-07-01T00:00:00Z",
        createdAt: "2026-04-20T08:00:00Z",
        participants: {
          total: 7,
          ideaOwner: 2,
          partner: 3,
          mentor: 1,
          observer: 1,
        },
        recentUpdates: [
          {
            id: "up-301",
            type: "result",
            title: "최종 실증 검증 완료 (VALIDATED)",
            content: "응답 시간 68% 단축, 제주특별자치도 정책 사업 채택 심의 통과",
            createdAt: "2026-07-05T11:00:00Z",
          },
        ],
      },
    ];
  }

  // Summary counts
  const totalCount = pilots.length;
  const inProgressCount = pilots.filter((p) => p.status === "IN_PROGRESS").length;
  const plannedCount = pilots.filter((p) => p.status === "PLANNED" || p.status === "READY").length;
  const validatedCount = pilots.filter((p) => p.status === "VALIDATED" || p.status === "COMPLETED").length;

  return (
    <main id="main" className="container-shell" style={{ maxWidth: "68rem", padding: "2rem 1rem" }}>
      {/* Navigation Header */}
      <header style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", color: "var(--wellb-forest-900)", margin: "0 0 0.25rem 0" }}>
              🚀 파일럿 프로젝트 관리 (Pilot Management)
            </h1>
            <p style={{ color: "var(--ink-muted)", fontSize: "0.9rem", margin: 0 }}>
              선발된 아이디어의 현장 실증 파일럿 진행 상태, 참여자 구성 및 실시간 업데이트 피드 관리
            </p>
          </div>
          <Link href={safeRoute("/admin")} className="btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
            ← 대시보드
          </Link>
        </div>
      </header>

      {/* KPI Stats Cards */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div className="card-pane" style={{ textAlign: "center", padding: "1.25rem" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--ink-muted)", margin: "0 0 0.25rem 0" }}>전체 파일럿</p>
          <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--wellb-forest-900)", margin: 0 }}>{totalCount}개</p>
        </div>
        <div className="card-pane" style={{ textAlign: "center", padding: "1.25rem", borderTop: "4px solid #166534" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--ink-muted)", margin: "0 0 0.25rem 0" }}>⚡ 실증 진행 중</p>
          <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "#166534", margin: 0 }}>{inProgressCount}개</p>
        </div>
        <div className="card-pane" style={{ textAlign: "center", padding: "1.25rem", borderTop: "4px solid #b45309" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--ink-muted)", margin: "0 0 0.25rem 0" }}>🎯 착수 준비/계획</p>
          <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "#b45309", margin: 0 }}>{plannedCount}개</p>
        </div>
        <div className="card-pane" style={{ textAlign: "center", padding: "1.25rem", borderTop: "4px solid #065f46" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--ink-muted)", margin: "0 0 0.25rem 0" }}>🏆 검증 완료</p>
          <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "#065f46", margin: 0 }}>{validatedCount}개</p>
        </div>
      </section>

      {/* Pilot List */}
      <section aria-labelledby="pilots-list-heading">
        <h2 id="pilots-list-heading" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--wellb-forest-900)", marginBottom: "1rem" }}>
          📂 등록된 파일럿 프로젝트 ({pilots.length}건)
        </h2>

        {pilots.length === 0 ? (
          <div className="card-pane" style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🚀</p>
            <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>등록된 파일럿 프로젝트가 없습니다.</p>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>선발 심의 이사회에서 파일럿 직행 선정 시 자동으로 개설됩니다.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {pilots.map((pilot) => (
              <article key={pilot.id} className="card-pane" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Header Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "280px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                      <StatusBadge status={pilot.status} />
                      <span style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
                        {pilot.challengeTitle}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.35rem 0", color: "var(--wellb-forest-900)" }}>
                      {pilot.title}
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", margin: 0, lineHeight: 1.4 }}>
                      {pilot.description}
                    </p>
                  </div>

                  {/* Dates */}
                  <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)", textAlign: "right" }}>
                    <div>생성일: {new Date(pilot.createdAt).toLocaleDateString("ko-KR")}</div>
                    {pilot.startedAt && <div>시작일: {new Date(pilot.startedAt).toLocaleDateString("ko-KR")}</div>}
                    {pilot.completedAt && <div>완료일: {new Date(pilot.completedAt).toLocaleDateString("ko-KR")}</div>}
                  </div>
                </div>

                <hr style={{ border: "none", borderTop: "1px solid var(--surface-border)", margin: 0 }} />

                {/* Participant Breakdown & Stats */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <span
                      style={{
                        padding: "0.35rem 0.75rem",
                        background: "var(--wellb-sage-100)",
                        color: "var(--wellb-forest-900)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                      }}
                    >
                      👥 참여자 총 {pilot.participants.total}명
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--ink-secondary)" }}>
                      제안자 {pilot.participants.ideaOwner}명 · 협업 파트너 {pilot.participants.partner}명 · 멘토 {pilot.participants.mentor}명 · 참관 {pilot.participants.observer}명
                    </span>
                  </div>

                  <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)", fontWeight: 600 }}>
                    업데이트 피드 {pilot.recentUpdates.length}건
                  </span>
                </div>

                {/* Recent Update Feed */}
                {pilot.recentUpdates.length > 0 && (
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: "1rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--surface-border)",
                    }}
                  >
                    <p style={{ fontSize: "0.82rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "var(--wellb-forest-900)" }}>
                      📢 최근 실증 업데이트 피드
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {pilot.recentUpdates.map((up) => {
                        const meta = UPDATE_TYPE_LABELS[up.type] ?? UPDATE_TYPE_LABELS.note ?? { label: "메모", bg: "#f3f4f6", color: "#374151" };
                        return (
                          <div
                            key={up.id}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "0.75rem",
                              background: "white",
                              padding: "0.6rem 0.85rem",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid var(--surface-border)",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                padding: "0.15rem 0.45rem",
                                borderRadius: "var(--radius-sm)",
                                backgroundColor: meta.bg,
                                color: meta.color,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {meta.label}
                            </span>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <strong style={{ fontSize: "0.85rem", color: "var(--ink-primary)" }}>{up.title}</strong>
                                <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>
                                  {new Date(up.createdAt).toLocaleDateString("ko-KR")}
                                </span>
                              </div>
                              <p style={{ fontSize: "0.8rem", color: "var(--ink-muted)", margin: "0.15rem 0 0" }}>{up.content}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
