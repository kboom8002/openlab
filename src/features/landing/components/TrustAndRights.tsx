import { RightsNotice } from '@/components/shared/RightsNotice';

export function TrustAndRights() {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontSize: '1.35rem', color: 'var(--wellb-forest-900)', marginBottom: '1rem' }}>
        신뢰와 권리
      </h2>
      <RightsNotice />
    </section>
  );
}
