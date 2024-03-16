import PageInfo from '@/components/shared/page-info';
import SubTitle from '@/components/shared/sub-title';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Home — Find everything about me',
  description: 'This is the home page',
};

export default function Home() {
  return (
    <div>
      <PageInfo
        header={
          <div>
            <h1 className="font-black text-[40px]">
              I <span className="text-blue-500">code.</span>
            </h1>
          </div>
        }
        description={`These are some of the best poems I’ve read so far. The list updates really frequently as I love reading poems a lot.`}
        footer={
          <Link
            className="flex gap-1 items-center text-blue-500 font-bold text-[12px]"
            href="/about"
          >
            Read more on about page <ArrowRight size={16} />
          </Link>
        }
      />
      <SubTitle title="Activities" seeMoreText="See more" />
    </div>
  );
}
