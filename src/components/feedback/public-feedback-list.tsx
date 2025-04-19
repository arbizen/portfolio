'use client';

import { Card } from '@/components/ui/card';
import { Feedback } from '@/types';
import { format } from 'date-fns';

interface PublicFeedbackListProps {
  feedbacks: Feedback[];
}

export default function PublicFeedbackList({ feedbacks }: PublicFeedbackListProps) {
  return (
    <div className="space-y-6">
      {feedbacks.map((feedback) => (
        <Card key={feedback.id} className="p-5 border-blue-100 overflow-hidden">
          <div className="mb-4">
            <div className="flex items-center mb-1 sm:flex-wrap sm:gap-2">
              <h3 className="font-medium">{feedback.name}</h3>
              <span className="ml-2 text-xs px-2 py-1 bg-slate-100 rounded-full sm:ml-0">
                {feedback.type === 'question' ? 'Question' : 'Feedback'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {format(new Date(feedback.date), 'MMM d, yyyy')}
            </p>
          </div>
          
          <div className="p-3 bg-slate-50 rounded-md mb-4">
            <p className="text-slate-800 break-words">{feedback.message}</p>
          </div>
          
          <div className="border-l-2 border-blue-400 pl-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Response:</h4>
            <div className="text-slate-700">
              <p className="break-words">{feedback.response}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 