export type HeaderItem = {
  name: string;
  route: string;
};

export type Activity = {
  id: string;
  name: string;
  date: string;
  type: string;
  link?: string;
};
export type Bookmark = {
  id: string;
  name: string;
  link: string;
  description: string;
  type: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  date?: string;
  description?: string;
  categories?: string[];
  readTime?: string;
  image?: string;
  lang?: string;
  page?: any;
  isPublished?: boolean;
};

export type Project = {
  id: string;
  name: string;
  date?: string;
  description?: string;
  image?: string;
  stack: string[];
  githubLink?: string;
  previewLink?: string;
  isCompleted?: boolean;
  year: number;
  type: string;
  slug?: string;
  lang?: string;
};

export type ImageType = {
  id: string;
  alt: string;
  src: string;
  date: string;
};
