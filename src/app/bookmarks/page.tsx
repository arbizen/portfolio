import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';

export const metadata = {
  title: 'Bookmarks — Some of the best links I adore',
  description: 'This is the home page',
};

export default function Bookmarks() {
  return (
    <div>
      <PageInfo
        header={<PageTitle title="Bookmarks" />}
        description={`These are some of the best poems I’ve read so far. The list updates really frequently as I love reading poems a lot.`}
      />
    </div>
  );
}
