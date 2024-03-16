import Card from '@/components/card';
import PageInfo from '@/components/shared/page-info';
import SubTitle from '@/components/shared/sub-title';
import Badge from '@/components/ui/badge';
import { Activity } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Home — Find everything about me',
  description: 'This is the home page',
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/data/activities`,
  );
  const data = await res.json();
  const activities: Activity[] = data.activities.data;

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
      <div>
        <SubTitle title="Activities" seeMoreText="See more" />
        <section className="pt-[75px] flex flex-col gap-4">
          {activities.map((activity: Activity) => (
            <Link key={activity.id} href="/">
              <Card className="px-6 py-[20px]">
                <h3 className="font-semibold">{activity.name}</h3>
                <div className="flex gap-2 mt-1 items-center">
                  <span className="text-xs">{activity.date}</span>
                  <Badge className="bg-red-100 text-red-500">
                    {activity.type}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
