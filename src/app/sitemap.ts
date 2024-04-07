import { headerItems } from '@/data/header';
import { Blog } from '@/types';
import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const HEADER_PAGES = headerItems.map((item) => ({
    url: `${BASE_URL}${item.route}`,
    lastModified: new Date(),
    changeFrequency:
      item.name === 'Home' || item.name === 'About' ? 'yearly' : 'monthly',
    priority: 1,
  }));
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/data/blogs?count=100`;
  const res = await fetch(url);
  const data = await res.json();
  let blogs: Blog[] = data.blogs?.data;
  const slugPages = blogs.map((blog) => ({
    url: `${BASE_URL}/en/blogs/${blog.slug}`,
    lastModified: blog.date,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  return [
    ...(HEADER_PAGES as MetadataRoute.Sitemap),
    ...(slugPages as MetadataRoute.Sitemap),
  ];
}
