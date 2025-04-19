'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import FeedbackForm from './feedback-form';

export default function FeedbackFormDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset submitted state when dialog is closed
      setTimeout(() => {
        setIsSubmitted(false);
      }, 300);
    }
  };
  
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="px-6"
      >
        Give your feedback
      </Button>
      
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {isSubmitted ? 'Thank you for your feedback!' : 'Feedback & AMA'}
            </DialogTitle>
            <DialogDescription>
              {isSubmitted 
                ? 'Your message has been received. I appreciate your input!'
                : 'Share your thoughts or ask a question'}
            </DialogDescription>
          </DialogHeader>
          
          {isSubmitted ? (
            <div className="flex justify-center my-6">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="mt-4">
              <FeedbackForm 
                onSuccess={() => setIsSubmitted(true)}
                inDialog={true}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 