import Card from '@/components/card';
import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Badge from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Subtitle from '@/components/shared/sub-title';

export const metadata = {
  title: 'Blogs — New curated blogs for you',
  description: 'This is the home page',
};

const Blog = () => {
  return (
    <Card className="p-16">
      <div className="flex gap-8">
        <Image
          src="/blog-image.png"
          alt="blog"
          width={360}
          height={240}
          className="flex-none"
        />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-600">1 min read</Badge>
              <Badge className="bg-red-100 text-red-600">ReactJs</Badge>
            </div>
            <span className="text-xs text-slate-600">23th June, 2023</span>
          </div>
          <Link href="/" className="hover:underline">
            <h2 className="text-[36px] font-extrabold leading-tight">
              Why ReactJs is here to stay?
            </h2>
          </Link>
          <p className="font-medium text-slate-600">
            The recent surge in the realm of react ecosystem predicts that react
            is going to be replaced by some alternatives. In this blog, we
            discuss what’s really happening and what we can do to prevent it.
          </p>
          <div className="flex justify-between">
            <Link
              href="/"
              className="flex items-center gap-1 text-xs font-bold leading-tight text-blue-500 hover:underline"
            >
              Read more
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function Blogs() {
  return (
    <div>
      <PageInfo
        header={<PageTitle title="Blogs" />}
        description={`These are some of the best poems I’ve read so far. The list updates really frequently as I love reading poems a lot.`}
      />
      <Card className="p-16">
        <div className="flex gap-8">
          <Image
            src="/blog-image.png"
            alt="blog"
            width={360}
            height={240}
            className="flex-none"
          />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Badge className="bg-blue-100 text-blue-600">1 min read</Badge>
                <Badge className="bg-red-100 text-red-600">ReactJs</Badge>
              </div>
              <span className="text-xs text-slate-600">23th June, 2023</span>
            </div>
            <Link href="/" className="hover:underline">
              <h2 className="text-[36px] font-extrabold leading-tight">
                Why ReactJs is here to stay?
              </h2>
            </Link>
            <p className="font-medium text-slate-600">
              The recent surge in the realm of react ecosystem predicts that
              react is going to be replaced by some alternatives. In this blog,
              we discuss what’s really happening and what we can do to prevent
              it.
            </p>
            <div className="flex justify-between">
              <Link
                href="/"
                className="flex items-center gap-1 text-xs font-bold leading-tight text-blue-500 hover:underline"
              >
                Read more
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </Card>
      <Subtitle className="py-8" title="NextJs" seeMoreText="See more" />
      <div className="flex flex-col gap-4">
        <Blog />
        <Blog />
        <Blog />
      </div>
    </div>
  );
}
