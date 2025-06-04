import PageTitle from '@/components/shared/page-title';
import PageInfo from '@/components/shared/page-info';
import Breadcumb from '@/components/shared/breadcumb';
import PageAnimation from '@/components/page-animation';
import { getDictionary } from '../dictionaries';
import { supportedLocales } from '@/data/site/supportedLocales';
import { cookies } from 'next/headers';
import { Client } from '@notionhq/client';
import { Feedback } from '@/types';
import PublicFeedbackList from '@/components/feedback/public-feedback-list';
import FeedbackSection from '@/components/feedback/feedback-section';

export const metadata = {
  title: 'Feedback & AMA',
  description: 'Leave feedback or ask me a question',
};

export const dynamic = 'force-dynamic';

export default async function FeedbackPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const supportedLang = supportedLocales.includes(lang)
    ? lang
    : (cookies().get('lang')?.value ?? 'en');

  const dictionary = await getDictionary(supportedLang);

  // Fetch published feedbacks with responses
  const FEEDBACK_DATABASE_ID = process.env.NOTION_FEEDBACK_DATABASE_ID;
  let feedbacks: Feedback[] = [];

  try {
    if (FEEDBACK_DATABASE_ID) {
      const notion = new Client({ auth: process.env.NOTION_TOKEN! });
      const response = await notion.databases.query({
        database_id: FEEDBACK_DATABASE_ID,
        filter: {
          and: [
            {
              property: 'response',
              rich_text: {
                is_not_empty: true,
              },
            },
            {
              property: 'isResolved',
              checkbox: {
                equals: true,
              },
            },
            {
              property: 'publishResponse',
              checkbox: {
                equals: true,
              },
            },
          ],
        },
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
          breadcumb={
            <Breadcumb
              firstNav={{ name: dictionary.header.nav[0].name, url: '/' }}
              secondNav={{ name: 'Feedback & AMA', url: '/feedback' }}
            />
          }
          header={<PageTitle title="Feedback & AMA" />}
          description="Share your thoughts or ask me anything. I appreciate your feedback and will respond to your questions when possible."
          footer={
            <div className="mt-8">
              <FeedbackSection />
            </div>
          }
        />

        {feedbacks.length > 0 && (
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-medium mb-6">
              Recently Answered Questions & Feedback
            </h2>
            <PublicFeedbackList feedbacks={feedbacks} />
          </div>
        )}
      </div>
    </PageAnimation>
  );
}
