import PageInfo from '@/components/shared/page-info';
import Breadcumb from '@/components/shared/breadcumb';
import { getDictionary } from '../dictionaries';
import { supportedLocales } from '@/data/site/supportedLocales';
import { cookies } from 'next/headers';
import PageAnimation from '@/components/page-animation';
import { Download } from 'lucide-react';
import Link from 'next/link';
import PDFViewer from '@/components/pdf-viewer';

export const metadata = {
  title: 'Resume — Arb Rahim Badsa',
  description: 'View the resume of Arb Rahim Badsa (Arbizen), showcasing skills in JavaScript, React.js, Next.js, TypeScript, and more.',
};

export default async function ResumePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const supportedLang = supportedLocales.includes(lang)
    ? lang
    : (cookies().get('lang')?.value ?? 'en');

  const dictionary = await getDictionary(supportedLang);

  const resumeUrl = `/arbizen-cv.pdf`;

  return (
    <PageAnimation>
      <div className="flex items-start w-full sm:flex-wrap">
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
          header={
            <div>
              <h1 className="font-black text-[40px] sm:text-[36px]">
                My <span className="text-blue-500">Resume</span>
              </h1>
            </div>
          }
          description="View my professional resume showcasing my skills, experience, and projects."
          footer={
            <div className="flex flex-row gap-4 sm:gap-4">
              <Link
                className="flex gap-1 items-center text-green-600 font-bold text-[14px] bg-green-50 hover:bg-green-100 px-3 py-2 rounded-md transition-colors"
                href="/arbizen-cv.pdf"
                target="_blank"
                download
              >
                <Download size={16} /> Download PDF
              </Link>
            </div>
          }
        />
      </div>

      <div className="mt-8">
        <PDFViewer src={resumeUrl} title="Arb Rahim Badsa Resume" />
      </div>
    </PageAnimation>
  );
} 