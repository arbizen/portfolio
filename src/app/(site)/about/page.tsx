import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About',
  description: 'Arb Rahim Badsa (Arbizen): a self-taught full-stack developer who builds small, sweet products like Kitty Messages, and writes poems on the side.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About', description: 'Arb Rahim Badsa (Arbizen): a self-taught full-stack developer who builds small, sweet products like Kitty Messages, and writes poems on the side.', url: '/about', images: ['/opengraph-image.png'] },
};

const link = 'text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900';

/** A short, plain about: who I am, what I make, how I work. */
export default function About() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <Image unoptimized src={'/arb.png'} alt="Arb Rahim Badsa" width={56} height={56} className="rounded-full" />
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-medium tracking-tight text-neutral-900">Arbizen</h1>
          <p className="text-sm text-neutral-500">A self-taught full-stack JavaScript engineer</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-neutral-600">
        <p>
          I&apos;m Arb. I taught myself to code as a kid and have been at it since 2018. I like building things
          all the way through: the idea, the design, the code, and the part after launch where real people
          start using it.
        </p>
        <p>
          On paper I&apos;m a university student: 3.89 CGPA, Dean&apos;s List twice in a row, somehow.
          Off paper, I&apos;m here, shipping software.
        </p>
        <p>
          For 5+ years I&apos;ve been building for clients on Upwork, where I&apos;ve been Top Rated Plus for
          over two years.
        </p>
        <p>
          These days my own thing is{' '}
          <a href="https://kittymessages.com" className={link}>
            Kitty Messages
          </a>
          , personalized cat cards people send to the ones they love. I built and run all of it myself, from the
          card designs to payments to the server it lives on, and I spend a lot of time on the small details,
          because that&apos;s where people feel the care.{' '}
          <Link href={`/blogs/how-3%2C000-people-ended-up-sending-cat-cards`} className={link}>
            Read more about it
          </Link>
          .
        </p>
        <p>
          Before that, plenty of side projects, two Supabase hackathon prizes (
          <a href="https://supabase.com/blog/launch-week-8-hackathon-winners#runner-up-4" target="_blank" rel="noopener" className={link}>
            Supadraw
          </a>{' '}
          and{' '}
          <a href="https://supabase.com/blog/launch-week-x-hackathon-winners#runner-up-2" target="_blank" rel="noopener" className={link}>
            Wordbuzz
          </a>
          ), and{' '}
          <Link href={`/blogs`} className={link}>
            writing
          </Link>{' '}
          about what I learn along the way.
        </p>
        <p>
          When I&apos;m not building, I&apos;m usually writing{' '}
          <Link href={`/poems`} className={link}>
            poems
          </Link>{' '}
          or taking{' '}
          <Link href={`/images`} className={link}>
            photos
          </Link>
          . I&apos;ve never quite been one thing, and I like it that way.
        </p>
        <p>
          Want to say hi? Find me on{' '}
          <a href="https://x.com/arbizzen" target="_blank" className={link}>
            X
          </a>
          .
        </p>
      </div>
    </div>
  );
}
