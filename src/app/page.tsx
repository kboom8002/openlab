import { getPublicChallenges } from '@/server/queries/challenges';
import { PublicHeader } from '@/components/shared/PublicHeader';
import { PublicFooter } from '@/components/shared/PublicFooter';
import { HeroSection, ActiveChallengeSection, HowItWorks, TrustAndRights, SponsorDisclosure, FinalCTA } from '@/features/landing/components';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { challenges } = await getPublicChallenges('OPEN');

  return (
    <>
      <PublicHeader />
      <main id="main" style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <HeroSection />
        <ActiveChallengeSection challenges={challenges} />
        <HowItWorks />
        <TrustAndRights />
        <SponsorDisclosure />
        <FinalCTA />
      </main>
      <PublicFooter />
    </>
  );
}
