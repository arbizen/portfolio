import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';

export default function AboutPage() {
  return (
    <div>
      <PageInfo
        header={<PageTitle title="About" />}
        description="This is the about page - WIP"
      />
    </div>
  );
}
