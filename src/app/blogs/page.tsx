import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';

export const metadata = {
  title: 'Blogs — New curated blogs for you',
  description: 'This is the home page',
};

export default function Blogs() {
  return (
    <div>
      <PageInfo
        header={<PageTitle title="Blogs" />}
        description={`These are some of the best poems I’ve read so far. The list updates really frequently as I love reading poems a lot.`}
      />
    </div>
  );
}
