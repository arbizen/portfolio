import { Blog, ImageType, Poem, Project } from '@/types';
import { MetadataRoute } from 'next';
import Pagination from '@/lib/Pagination';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  // The real, final addresses (/en/… only redirects to these).
  const MAIN_PAGES = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/projects', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/blogs', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/poems', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/images', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/bookmarks', priority: 0.4, changeFrequency: 'monthly' },
  ].map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
  const blogsPagination = new Pagination({ limit: 100 }, 'blogs');
  const blogsData = await blogsPagination.getCurrentPageData('desc');
  const blogs: Blog[] = blogsData['blogs']?.data;
  const slugPages = blogs.filter((blog) => blog.isPublished !== false).map((blog) => ({
    url: `${BASE_URL}/blogs/${blog.slug}`,
    lastModified: blog.date,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projectsPagination = new Pagination({ limit: 100 }, 'projects');
  const projectsData = await projectsPagination.getCurrentPageData('desc');
  const projects: Project[] = projectsData['projects']?.data;
  const projectsSlug = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: project.date,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const poemsPagination = new Pagination({ limit: 100 }, 'poems');
  const poemsData = await poemsPagination.getCurrentPageData('desc');
  const poems: Poem[] = poemsData['poems']?.data ?? [];
  const poemsSlug = poems
    .filter((poem) => poem.isPublished !== false)
    .map((poem) => ({
      url: `${BASE_URL}/poems/${poem.slug}`,
      lastModified: poem.date,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  const imagesPagination = new Pagination({ limit: 100 }, 'images');
  const imagesData = await imagesPagination.getCurrentPageData('desc');
  const images: ImageType[] = imagesData['images']?.data;
  const imagesSlug = images.map((image) => ({
    url: `${BASE_URL}/images/${image.id}`,
    lastModified: image.date,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    ...(MAIN_PAGES as MetadataRoute.Sitemap),
    ...(slugPages as MetadataRoute.Sitemap),
    ...(projectsSlug as MetadataRoute.Sitemap),
    ...(poemsSlug as MetadataRoute.Sitemap),
    ...(imagesSlug as MetadataRoute.Sitemap),
  ];
}
