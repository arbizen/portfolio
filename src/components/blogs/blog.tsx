import Badge from "../ui/badge";
import Card from "../card";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Blog as BlogType } from "@/types";
import Link from "next/link";
// @ts-ignore
import dateformat from "dateformat";

export default function Blog(props: BlogType) {
    return (
      <Card className="p-16 sm:p-8">
        <div className="flex gap-8 sm:flex-col">
          <Link className="flex-none" href={`/${props.lang}/blogs/${props.slug}`}>
            <Image
              unoptimized
              src={props.image!}
              alt="blog"
              width={360}
              height={240}
              className="rounded-md max-h-[240px] object-cover"
              placeholder="blur"
              blurDataURL="/blur-placeholder.png"
            />
          </Link>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-blue-100 text-blue-600">
                  {props.readTime} {props.page.blogs.minRead}
                </Badge>
                {props?.categories?.map((category: string) => (
                  <Badge key={category} className="bg-red-100 text-red-500">
                    {category}
                  </Badge>
                ))}
              </div>
              <span className="text-xs text-slate-600">
                {dateformat(props.date, 'ddS mmmm, yyyy')}
              </span>
            </div>
            <Link
              href={`/${props.lang}/blogs/${props.slug}`}
              className="hover:underline"
            >
              <h2 className="text-[36px] font-extrabold leading-tight sm:text-2xl sm:font-bold">
                {props.title}
              </h2>
            </Link>
            <p className="font-medium text-slate-600">{props.description}</p>
            <div className="flex justify-between">
              <Link
                href={`/${props.lang}/blogs/${props.slug}`}
                className="flex items-center gap-1 text-xs font-bold leading-tight text-blue-500 hover:underline"
              >
                {props.page.blogs.readMore}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  };