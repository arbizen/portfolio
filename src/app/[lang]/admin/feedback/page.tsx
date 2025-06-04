import PageTitle from '@/components/shared/page-title';
import PageInfo from '@/components/shared/page-info';
import Breadcumb from '@/components/shared/breadcumb';
import PageAnimation from '@/components/page-animation';
import { getDictionary } from '../../dictionaries';
import { supportedLocales } from '@/data/site/supportedLocales';
import { cookies } from 'next/headers';
import FeedbackList from '@/components/feedback/feedback-list';
import { notionManager } from '@/lib/NotionManager';
import { Client } from '@notionhq/client';
import { Feedback } from '@/types';
import AdminAuth from '@/components/feedback/admin-auth';

export const metadata = {
  title: 'Admin: Manage Feedback',
  description: 'Admin dashboard to manage feedback submissions',
};

export default async function AdminFeedbackPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const supportedLang = supportedLocales.includes(lang)
    ? lang
    : (cookies().get('lang')?.value ?? 'en');

  const dictionary = await getDictionary(supportedLang);

  // Fetch feedbacks from Notion
  // You need to create a Feedback database in Notion first
  const FEEDBACK_DATABASE_ID = process.env.NOTION_FEEDBACK_DATABASE_ID;

  let feedbacks: Feedback[] = [];

  try {
    if (FEEDBACK_DATABASE_ID) {
      const notion = new Client({ auth: process.env.NOTION_TOKEN! });
      const response = await notion.databases.query({
        database_id: FEEDBACK_DATABASE_ID,
        sorts: [
          {
            property: 'createdAt',
            direction: 'descending',
          },
        ],
      });

      feedbacks = response.results.map((page: any) => {
        const properties = page.properties;
        return {
          id: page.id,
          name: properties.name?.title[0]?.plain_text || '',
          email: properties.email?.rich_text[0]?.plain_text || '',
          message: properties.message?.rich_text[0]?.plain_text || '',
          date: properties.createdAt?.date?.start || page.created_time,
          type:
            properties.type?.select?.name === 'Question'
              ? 'question'
              : 'feedback',
          isResolved: properties.isResolved?.checkbox || false,
          response: properties.response?.rich_text[0]?.plain_text || '',
          publishResponse: properties.publishResponse?.checkbox || false,
        };
      });
    }
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
  }

  return (
    <PageAnimation>
      <div className="mt-16 sm:mt-8">
        <PageInfo
          header={<PageTitle title="Manage Feedback & Questions" />}
          breadcumb={
            <Breadcumb
              firstNav={{ name: dictionary.header.nav[0].name, url: '/' }}
              secondNav={{ name: 'Admin: Feedback', url: `/admin/feedback` }}
            />
          }
          description="Review and respond to user feedback and questions."
        />

        <div className="mt-8 mb-16">
          <AdminAuth feedbacks={feedbacks} />
        </div>
      </div>
    </PageAnimation>
  );
}
