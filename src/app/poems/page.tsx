import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';

export const metadata = {
  title: 'Poems — Lines that I read and loved',
  description: 'This is the home page',
};

export default function Poems() {
  return (
    <div>
      <PageInfo
        header={<PageTitle title="Poems" />}
        description={`These are some of the best poems I’ve read so far. The list updates really frequently as I love reading poems a lot.`}
      />
    </div>
  );
}
