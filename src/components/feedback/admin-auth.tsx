'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FeedbackList from './feedback-list';
import { Feedback } from '@/types';

interface AdminAuthProps {
  feedbacks: Feedback[];
}

export default function AdminAuth({ feedbacks }: AdminAuthProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/feedback/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <FeedbackList feedbacks={feedbacks} adminToken={password} />;
  }

  return (
    <Card className="p-8 max-w-md mx-auto sm:p-6">
      <h2 className="text-xl font-medium mb-4 text-center">Admin Authentication</h2>
      <p className="text-slate-600 mb-6 text-center">
        Please enter your admin password to access the feedback management dashboard.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleAuthenticate} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Admin Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            placeholder="Enter admin password"
            required
            autoComplete="current-password"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Authenticating...' : 'Login'}
        </Button>
      </form>
    </Card>
  );
} 