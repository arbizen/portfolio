'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import FeedbackForm from './feedback-form';
import { X } from 'lucide-react';

export default function FeedbackSection() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div>
      {!isFormVisible ? (
        <Button onClick={() => setIsFormVisible(true)}>
          Give your feedback
        </Button>
      ) : (
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Give Your Feedback</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsFormVisible(false)}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X size={18} />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <FeedbackForm onSuccess={() => setIsFormVisible(false)} />
        </div>
      )}
    </div>
  );
} 