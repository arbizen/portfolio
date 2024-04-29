import { headerItems } from '@/data/header';
import { Blog, ImageType, Project } from '@/types';
import { MetadataRoute } from 'next';
import Pagination from '@/lib/Pagination';

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
  const blogsPagination = new Pagination({ limit: 100 }, 'blogs');
  const blogsData = await blogsPagination.getCurrentPageData('desc');
  const blogs: Blog[] = blogsData['blogs']?.data;
  const slugPages = blogs.map((blog) => ({
    url: `${BASE_URL}/en/blogs/${blog.slug}`,
    lastModified: blog.date,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projectsPagination = new Pagination({ limit: 100 }, 'projects');
  const projectsData = await projectsPagination.getCurrentPageData('desc');
  const projects: Project[] = projectsData['projects']?.data;
  const projectsSlug = projects.map((project) => ({
    url: `${BASE_URL}/en/projects/${project.slug}`,
    lastModified: project.date,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const imagesPagination = new Pagination({ limit: 100 }, 'images');
  const imagesData = await imagesPagination.getCurrentPageData('desc');
  const images: ImageType[] = imagesData['images']?.data;
  const imagesSlug = images.map((image) => ({
    url: `${BASE_URL}/en/images/${image.id}`,
    lastModified: image.date,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    ...(HEADER_PAGES as MetadataRoute.Sitemap),
    ...(slugPages as MetadataRoute.Sitemap),
    ...(projectsSlug as MetadataRoute.Sitemap),
    ...(imagesSlug as MetadataRoute.Sitemap),
  ];
}
