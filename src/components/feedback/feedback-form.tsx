'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FeedbackFormProps {
  onSuccess?: () => void;
  inDialog?: boolean;
}

export default function FeedbackForm({ onSuccess, inDialog = false }: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'feedback' // Default type is feedback
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          message: '',
          type: 'feedback'
        });
        
        // Call onSuccess if provided
        if (onSuccess) {
          // Wait a moment to show the success message before hiding the form
          setTimeout(() => {
            onSuccess();
          }, 1500);
        }
      } else {
        // Handle error
        console.error('Error submitting feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If in dialog mode, don't wrap in a Card or show success message (handled by dialog)
  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium text-slate-700">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="feedback">Feedback</option>
            <option value="question">Ask a Question</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-slate-700">
            {formData.type === 'feedback' ? 'Your Feedback' : 'Your Question'}
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full p-2 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            placeholder={formData.type === 'feedback' 
              ? "Share your thoughts about the website or my work..." 
              : "What would you like to ask me?"}
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );

  // If used in dialog, just return the form without wrapping
  if (inDialog) {
    return formContent;
  }

  return (
    <Card className="p-6 shadow-sm border-blue-100">
      {isSuccess ? (
        <div className="text-center py-8">
          <h3 className="text-xl font-medium text-green-600 mb-2">Thank you for your feedback!</h3>
          <p className="text-slate-600 mb-4">Your message has been received.</p>
          <Button 
            variant="outline" 
            onClick={() => setIsSuccess(false)}
            className="mt-2"
          >
            Send another message
          </Button>
        </div>
      ) : (
        formContent
      )}
    </Card>
  );
} 