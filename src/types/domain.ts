/**
 * WELLB OPENLAB Domain Types
 * Source of Truth: contracts/domain/domain-enums.yaml (WOL-CONTRACT-DOM-001)
 * 
 * WARNING: Do not add new enum values here without first updating the canonical
 * contract file. See docs/00-governance/source-of-truth-map.md.
 */

// --- User & Role ---
export type UserRole =
  | 'anonymous'
  | 'participant'
  | 'evaluator'
  | 'expert'
  | 'challenge_manager'
  | 'sponsor_viewer'
  | 'admin'
  | 'service_worker';

export const USER_ROLES: UserRole[] = [
  'anonymous',
  'participant',
  'evaluator',
  'expert',
  'challenge_manager',
  'sponsor_viewer',
  'admin',
  'service_worker'
];

// --- Challenge ---
export type ChallengeSeriesStatus =
  | 'DRAFT' | 'PLANNED' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';

export const CHALLENGE_SERIES_STATUSES: ChallengeSeriesStatus[] = [
  'DRAFT', 'PLANNED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED'
];

export type MonthlyChallengeStatus =
  | 'DRAFT' | 'SCHEDULED' | 'OPEN' | 'CLOSED'
  | 'ELIGIBILITY_REVIEW' | 'EVALUATION' | 'SELECTION' | 'PILOTING'
  | 'COMPLETED' | 'CANCELLED' | 'ARCHIVED';

export const MONTHLY_CHALLENGE_STATUSES: MonthlyChallengeStatus[] = [
  'DRAFT', 'SCHEDULED', 'OPEN', 'CLOSED',
  'ELIGIBILITY_REVIEW', 'EVALUATION', 'SELECTION', 'PILOTING',
  'COMPLETED', 'CANCELLED', 'ARCHIVED'
];

// --- Idea ---
export type IdeaStatus =
  | 'DRAFT' | 'READY_FOR_REVIEW' | 'PREFLIGHT_CHECKING' | 'PREFLIGHT_COMPLETE'
  | 'SUBMITTED' | 'ELIGIBILITY_REVIEW' | 'ELIGIBLE' | 'UNDER_EVALUATION'
  | 'PROMISING' | 'PILOT_READY' | 'IN_PILOT' | 'VALIDATED' | 'ADOPTED'
  | 'RETURNED_FOR_REVISION' | 'INELIGIBLE' | 'WITHDRAWN' | 'SAFETY_HOLD' | 'ARCHIVED';

export const IDEA_STATUSES: IdeaStatus[] = [
  'DRAFT', 'READY_FOR_REVIEW', 'PREFLIGHT_CHECKING', 'PREFLIGHT_COMPLETE',
  'SUBMITTED', 'ELIGIBILITY_REVIEW', 'ELIGIBLE', 'UNDER_EVALUATION',
  'PROMISING', 'PILOT_READY', 'IN_PILOT', 'VALIDATED', 'ADOPTED',
  'RETURNED_FOR_REVISION', 'INELIGIBLE', 'WITHDRAWN', 'SAFETY_HOLD', 'ARCHIVED'
];

export type PilotStatus =
  | 'PLANNED' | 'READY' | 'IN_PROGRESS' | 'PAUSED'
  | 'COMPLETED' | 'VALIDATED' | 'NOT_VALIDATED' | 'CANCELLED' | 'ARCHIVED';

export const PILOT_STATUSES: PilotStatus[] = [
  'PLANNED', 'READY', 'IN_PROGRESS', 'PAUSED',
  'COMPLETED', 'VALIDATED', 'NOT_VALIDATED', 'CANCELLED', 'ARCHIVED'
];

// --- Visibility & Provenance ---
export type Visibility = 'public' | 'anonymous' | 'evaluators_only' | 'private';
export const VISIBILITIES: Visibility[] = ['public', 'anonymous', 'evaluators_only', 'private'];

export type ClaimType = 'fact' | 'experience' | 'assumption' | 'expected_impact';
export const CLAIM_TYPES: ClaimType[] = ['fact', 'experience', 'assumption', 'expected_impact'];

export type ProvenanceSource =
  | 'user_original' | 'user_edited' | 'ai_suggested' | 'external_source' | 'admin_edited';
export const PROVENANCE_SOURCES: ProvenanceSource[] = [
  'user_original', 'user_edited', 'ai_suggested', 'external_source', 'admin_edited'
];

// --- Sponsor ---
export type SponsorRelationshipStatus =
  | 'proposal' | 'under_discussion' | 'agreement_pending' | 'active' | 'paused' | 'ended';

export const SPONSOR_RELATIONSHIP_STATUSES: SponsorRelationshipStatus[] = [
  'proposal', 'under_discussion', 'agreement_pending', 'active', 'paused', 'ended'
];

// --- Evaluation ---
export type EvaluationType = 'eligibility' | 'ai' | 'pairwise' | 'expert' | 'selection_gate';
export const EVALUATION_TYPES: EvaluationType[] = ['eligibility', 'ai', 'pairwise', 'expert', 'selection_gate'];

export type AiConfidence = 'high' | 'medium' | 'low';
export const AI_CONFIDENCES: AiConfidence[] = ['high', 'medium', 'low'];

// --- Idea Passport (from idea-passport.contract.yaml) ---
export type CostRange =
  | 'under_1m_krw' | '1m_to_10m_krw' | '10m_to_50m_krw' | 'over_50m_krw' | 'unknown';
export const COST_RANGES: CostRange[] = [
  'under_1m_krw', '1m_to_10m_krw', '10m_to_50m_krw', 'over_50m_krw', 'unknown'
];

export const PASSPORT_REQUIRED_SECTIONS = [
  'identity', 'problem', 'people_context', 'solution',
  'feasibility', 'impact', 'experiment', 'provenance', 'rights',
] as const;

export type PassportSection = typeof PASSPORT_REQUIRED_SECTIONS[number];

// --- Evaluation Weights (from evaluation-model.yaml) ---
export const EVALUATION_WEIGHTS = {
  ai: 25,
  pairwise: 25,
  expert: 50,
  committee: 0,
} as const;

// --- Public-facing challenge statuses ---
export const PUBLIC_CHALLENGE_STATUSES: MonthlyChallengeStatus[] = [
  'SCHEDULED', 'OPEN', 'CLOSED', 'EVALUATION', 'SELECTION', 'PILOTING', 'COMPLETED',
];
