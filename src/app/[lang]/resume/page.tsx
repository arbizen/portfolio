import PageInfo from '@/components/shared/page-info';
import Breadcumb from '@/components/shared/breadcumb';
import { getDictionary } from '../dictionaries';
import { supportedLocales } from '@/data/site/supportedLocales';
import PageAnimation from '@/components/page-animation';

import Link from 'next/link';
import PDFViewer from '@/components/pdf-viewer';

export const metadata = {
  title: 'Resume',
  description: 'The resume of Arb Rahim Badsa (Arbizen): full-stack JavaScript, React, Next.js, TypeScript and more.',
  alternates: { canonical: '/en/resume' },
  openGraph: { title: 'Resume', description: 'The resume of Arb Rahim Badsa (Arbizen): full-stack JavaScript, React, Next.js, TypeScript and more.', url: '/en/resume' },
};

export default async function ResumePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const supportedLang = supportedLocales.includes(lang)
    ? lang
    : 'en';

  const dictionary = await getDictionary(supportedLang);

  const resumeUrl = `/arbizen-cv.pdf`;

  return (
    <PageAnimation>
      <div>
        <PageInfo
          breadcumb={
            <Breadcumb
              firstNav={{
                name: dictionary.page.home.name.third,
                url: `/${lang}`,
              }}
              secondNav={{
                name: 'Resume',
                url: `/${lang}/resume`,
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
        <PDFViewer src={resumeUrl} title="Arb Rahim Badsa Resume" />
      </div>
    </PageAnimation>
  );
} 