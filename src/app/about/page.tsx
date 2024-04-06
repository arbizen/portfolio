import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Script from 'next/script';

const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Arb Rahim Badsa',
    alternateName: 'arbizzen',
    description: 'React.js & Next.js Developer | TypeScript | Supabase',
    image: 'https://avatars.githubusercontent.com/u/34975329?v=4',
    jobTitle: 'Javascript Engineer',
  },
};

export default function AboutPage() {
  return (
    <div>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <PageInfo
        header={<PageTitle title="About" />}
        description="This is the about page - WIP"
      />
    </div>
  );
}
