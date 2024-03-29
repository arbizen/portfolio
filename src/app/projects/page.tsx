import Card from '@/components/card';
import PageInfo from '@/components/shared/page-info';
import PageTitle from '@/components/shared/page-title';
import Badge from '@/components/ui/badge';
import { ArrowRight, BadgeEuro } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Subtitle from '@/components/shared/sub-title';
import { Blog, Project } from '@/types';
// @ts-ignore
import dateformat from 'dateformat';
import { Tag, TagContainer } from '@/components/tag';
import Chip from '@/components/chip';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Projects — Best selection of my recent projects',
  description: 'This is the project page',
};

const Project = (props: Project) => {
  return (
    <Card className="flex gap-6 flex-col p-8 flex-auto">
      <div className="flex justify-between items-center">
        <Chip color="blue">{props.year}</Chip>
        <Chip color="green">
          {props.isCompleted ? `Completed` : `In progress`}
        </Chip>
      </div>
      <div className="flex flex-col gap-4 flex-grow">
        <Image
          src={props.image!}
          width={320}
          height={180}
          alt={props.name}
          className="rounded-md w-full"
        />
        <div className="flex flex-col gap-8 flex-grow">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="leading-tight font-bold text-lg">
                  {props.name}
                </h3>
                <Badge className="bg-red-100 text-red-600">{props.type}</Badge>
              </div>
              <p className="text-base leading-tight font-medium text-slate-600 w-full">
                {props.description}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap w-full">
              {props.stack.map((item) => (
                <Badge key={item} className="bg-blue-100 text-blue-600">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-end flex-grow">
            <Link
              href="/"
              className="flex gap-1 items-center text-sm font-medium text-blue-500"
            >
              See details
              <ArrowRight size={15} />
            </Link>
            <div className="flex gap-4">
              <Link
                href={props.previewLink!}
                className="text-sm font-medium text-blue-500"
                target="_blank"
              >
                Preview
              </Link>
              <Link
                href={props.githubLink!}
                className="text-sm font-medium text-blue-500"
                target="_blank"
              >
                Github
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default async function Blogs({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const start = searchParams?.start || 0;
  const count = searchParams?.count || 25;
  const cursor = searchParams?.cursor || '';
  const page = `projects`;
  const url = !cursor
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/data/${page}?start=${start}&count=${count}&order=asc`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/data/${page}/${cursor}?start=${start}&count=${count}&order=asc`;
  const res = await fetch(url);
  const data = await res.json();
  const projects: Project[] = data[page]?.data;
  const pageEnd = data[page]?.end;
  const hasMore = data[page]?.has_more;
  const nextCursor = data[page]?.next_cursor;
  let nextPageUrl;
  if (Number(start) == 100 - Number(count) || cursor) {
    nextPageUrl = `/${page}?cursor=${nextCursor ?? cursor}&start=${
      pageEnd ?? start
    }&count=${count}&order=asc`;
  } else {
    nextPageUrl = `/${page}?start=${pageEnd ?? start}&count=${count}&order=asc`;
  }
  return (
    <div>
      <PageInfo
        header={<PageTitle title="Projects" />}
        description={`These are some of the best poems I’ve read so far. The list updates really frequently as I love reading poems a lot.`}
        itemsLength={projects.length}
        footer={
          <>
            <TagContainer>
              <Tag>React</Tag>
              <Tag>NextJs</Tag>
              <Tag>NodeJs</Tag>
              <Tag>GraphQL</Tag>
              <Tag>Typescript</Tag>
              <Tag>9+</Tag>
            </TagContainer>
          </>
        }
      />
      <section className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </section>
    </div>
  );
}
