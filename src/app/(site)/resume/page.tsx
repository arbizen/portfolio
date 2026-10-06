import PageInfo from '@/components/shared/page-info';
import Breadcumb from '@/components/shared/breadcumb';
import { getDictionary } from '../dictionaries';
import PageAnimation from '@/components/page-animation';

import Link from 'next/link';
import PDFViewer from '@/components/pdf-viewer';

export const metadata = {
  title: 'Resume',
  description: 'Resume of Arbizen, full-stack developer: JavaScript, TypeScript, React, Next.js and more, with 5+ years of client work.',
  alternates: { canonical: '/resume' },
  openGraph: { title: 'Resume', description: 'Resume of Arbizen, full-stack developer: JavaScript, TypeScript, React, Next.js and more, with 5+ years of client work.', url: '/resume', images: ['/opengraph-image.png'] },
};

export default async function ResumePage() {
  const dictionary = await getDictionary('en');

  const resumeUrl = `/arbizen-cv.pdf`;

  return (
    <PageAnimation>
      <div>
        <PageInfo
          breadcumb={
            <Breadcumb
              firstNav={{
                name: dictionary.page.home.name.third,
                url: '/',
              }}
              secondNav={{
                name: 'Resume',
                url: `/resume`,
              }}
            />
          }
          header={<h1 className="text-xl font-medium tracking-tight text-neutral-900">Resume</h1>}
          description="View my professional resume showcasing my skills, experience, and projects."
          footer={
            <div className="flex flex-row gap-4 sm:gap-4">
              <Link
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                href="/arbizen-cv.pdf"
                target="_blank"
                download
              >
                Download PDF
              </Link>
            </div>
          }
        />
      </div>

      <div>
        <PDFViewer src={resumeUrl} title="Arbizen Resume" />
      </div>
    </PageAnimation>
  );
} 