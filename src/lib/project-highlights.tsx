import { Project } from '@/types';
import SupabaseBadge from '@/components/shared/supabase-badge';
import LovedBadge from '@/components/shared/loved-badge';

/** Wordbuzz and Supadraw: both won a Supabase hackathon. */
export function isHackathonWinner(project: Project): boolean {
  return ['wordbuzz', 'supadraw'].includes((project.name ?? '').trim().toLowerCase());
}

function isKitty(project: Project): boolean {
  return (project.name ?? '').trim().toLowerCase() === 'kitty messages';
}

/** Kitty Messages first, then the two hackathon winners, then the rest by date. */
export function orderProjects(projects: Project[]): Project[] {
  const kitty = projects.filter(isKitty);
  const winners = projects.filter((p) => isHackathonWinner(p) && !isKitty(p));
  return [...kitty, ...winners, ...projects.filter((p) => !isKitty(p) && !isHackathonWinner(p))];
}

/** The small marks after a project's name, the same on every page. */
export function ProjectBadges({ project }: { project: Project }) {
  if (isKitty(project)) return <LovedBadge>Loved by 3,000+ people</LovedBadge>;
  if (isHackathonWinner(project)) return <SupabaseBadge>Hackathon winner</SupabaseBadge>;
  return null;
}

/**
 * "Supabase Realtime: How to deal with multiplayers in Next.js", featured in
 * Supabase's Developer Updates (April 2024) under Community Highlights.
 */
export function isCitedBySupabase(blog: { title?: string }): boolean {
  return (blog.title ?? '').toLowerCase().startsWith('supabase realtime');
}

/** The post Supabase cited first, then the rest by date. */
export function orderBlogs<T extends { title?: string }>(blogs: T[]): T[] {
  return [...blogs.filter(isCitedBySupabase), ...blogs.filter((b) => !isCitedBySupabase(b))];
}

/** Supabase's own announcements of the two hackathon prizes: the proof. */
export const SUPABASE_RECOGNITION = [
  {
    project: 'Supabase Realtime post',
    prize: 'Community highlight',
    event: 'Developer Updates, April 2024',
    date: 'May 2024',
    url: 'https://github.com/supabase/supabase/releases/tag/v1.24.04',
  },
  {
    project: 'Wordbuzz',
    prize: 'Runner-up, Most fun',
    event: 'Launch Week X Hackathon',
    date: 'Jan 2024',
    url: 'https://supabase.com/blog/launch-week-x-hackathon-winners#runner-up-2',
  },
  {
    project: 'Supadraw',
    prize: 'Runner-up, Most visually pleasing',
    event: 'Launch Week 8 Hackathon',
    date: 'Aug 2023',
    url: 'https://supabase.com/blog/launch-week-8-hackathon-winners#runner-up-4',
  },
];

/** The projects the home page shows, in this order. The Projects page lists them all. */
const HOME_PROJECTS = ['kitty messages', 'supadraw', 'wordbuzz', 'blank board', 'recap'];

export function homeProjects(projects: Project[]): Project[] {
  const byName = new Map(projects.map((p) => [(p.name ?? '').trim().toLowerCase(), p]));
  return HOME_PROJECTS.map((name) => byName.get(name)).filter(Boolean) as Project[];
}
