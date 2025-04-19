'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Feedback } from '@/types';
import { format } from 'date-fns';

interface FeedbackListProps {
  feedbacks: Feedback[];
  adminToken?: string;
}

export default function FeedbackList({ feedbacks, adminToken }: FeedbackListProps) {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resolvedFeedbacks, setResolvedFeedbacks] = useState<Set<string>>(
    new Set(feedbacks.filter(f => f.isResolved).map(f => f.id))
  );
  const [publishedResponses, setPublishedResponses] = useState<Set<string>>(
    new Set(feedbacks.filter(f => f.publishResponse).map(f => f.id))
  );
  const [localFeedbacks, setLocalFeedbacks] = useState(feedbacks);

  const handleOpenDialog = (id: string, existingResponse: string = '') => {
    setOpenDialogId(id);
    setResponseText(existingResponse);
  };

  const handleCloseDialog = () => {
    setOpenDialogId(null);
    setResponseText('');
  };

  const handleSubmitResponse = async (id: string) => {
    setIsSubmitting(true);
    
    try {
      const apiResponse = await fetch('/api/feedback/respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          response: responseText,
          password: adminToken,
        }),
      });

      if (apiResponse.ok) {
        // Update the local state
        setLocalFeedbacks(prev => 
          prev.map(f => 
            f.id === id 
              ? { ...f, response: responseText, isResolved: true } 
              : f
          )
        );
        setResolvedFeedbacks(prev => new Set(prev).add(id));
        handleCloseDialog();
      } else {
        alert('Failed to submit response');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit response');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      const apiResponse = await fetch('/api/feedback/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          password: adminToken,
        }),
      });

      if (apiResponse.ok) {
        // Remove from local state
        setLocalFeedbacks(prev => prev.filter(f => f.id !== id));
      } else {
        alert('Failed to delete feedback');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete feedback');
    }
  };

  const toggleResolved = async (id: string, currentStatus: boolean) => {
    try {
      const apiResponse = await fetch('/api/feedback/toggle-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          isResolved: !currentStatus,
          password: adminToken,
        }),
      });

      if (apiResponse.ok) {
        // Update resolved status in local state
        const newResolvedFeedbacks = new Set(resolvedFeedbacks);
        
        if (!currentStatus) {
          newResolvedFeedbacks.add(id);
        } else {
          newResolvedFeedbacks.delete(id);
        }
        
        setResolvedFeedbacks(newResolvedFeedbacks);
        
        setLocalFeedbacks(prev => 
          prev.map(f => 
            f.id === id 
              ? { ...f, isResolved: !currentStatus } 
              : f
          )
        );
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update status');
    }
  };

  const togglePublishResponse = async (id: string, currentStatus: boolean) => {
    try {
      const apiResponse = await fetch('/api/feedback/toggle-publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          publishResponse: !currentStatus,
          password: adminToken,
        }),
      });

      if (apiResponse.ok) {
        // Update published status in local state
        const newPublishedResponses = new Set(publishedResponses);
        
        if (!currentStatus) {
          newPublishedResponses.add(id);
        } else {
          newPublishedResponses.delete(id);
        }
        
        setPublishedResponses(newPublishedResponses);
        
        setLocalFeedbacks(prev => 
          prev.map(f => 
            f.id === id 
              ? { ...f, publishResponse: !currentStatus } 
              : f
          )
        );
      } else {
        alert('Failed to update publish status');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update publish status');
    }
  };

  if (localFeedbacks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-slate-600">No feedback submissions yet.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {localFeedbacks.map((feedback) => (
        <Card key={feedback.id} className={`p-4 ${resolvedFeedbacks.has(feedback.id) ? 'border-green-200 bg-green-50' : 'border-blue-100'}`}>
          <div className="flex flex-row justify-between items-start mb-2 sm:flex-col sm:gap-3">
            <div>
              <div className="flex items-center mb-1 sm:flex-wrap sm:gap-2">
                <h3 className="font-medium">{feedback.name}</h3>
                <div className="flex gap-1 sm:flex-wrap">
                  <span className="ml-2 text-xs px-2 py-1 bg-slate-100 rounded-full sm:ml-0">
                    {feedback.type === 'question' ? 'Question' : 'Feedback'}
                  </span>
                  {resolvedFeedbacks.has(feedback.id) && 
                    <span className="ml-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full sm:ml-0">
                      Resolved
                    </span>
                  }
                  {publishedResponses.has(feedback.id) && feedback.response && 
                    <span className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full sm:ml-0">
                      Public
                    </span>
                  }
                </div>
              </div>
              <p className="text-sm text-slate-500">{feedback.email}</p>
              <p className="text-xs text-slate-400 mt-1">
                {format(new Date(feedback.date), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
            <div className="flex gap-2 sm:flex-wrap sm:mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toggleResolved(feedback.id, resolvedFeedbacks.has(feedback.id))}
                className="text-xs w-auto sm:w-full"
              >
                {resolvedFeedbacks.has(feedback.id) ? 'Mark Unresolved' : 'Mark Resolved'}
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDeleteFeedback(feedback.id)}
                className="text-xs w-auto sm:w-full"
              >
                Delete
              </Button>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-slate-50 rounded-md">
            <p className="text-slate-800 break-words">{feedback.message}</p>
          </div>
          
          {feedback.response && (
            <div className="mt-4">
              <div className="flex flex-row justify-between items-center mb-2 sm:flex-col sm:gap-2">
                <h4 className="text-sm font-medium text-slate-700">Your Response:</h4>
                <Button
                  variant={publishedResponses.has(feedback.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePublishResponse(feedback.id, publishedResponses.has(feedback.id))}
                  className="ml-2 text-xs w-auto sm:w-full sm:ml-0"
                >
                  {publishedResponses.has(feedback.id) ? 'Unpublish' : 'Publish'}
                </Button>
              </div>
              <div className="p-3 bg-blue-50 rounded-md">
                <p className="text-slate-800 break-words">{feedback.response}</p>
              </div>
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline"
              onClick={() => handleOpenDialog(feedback.id, feedback.response)}
              className="w-auto sm:w-full"
            >
              {feedback.response ? 'Edit Response' : 'Respond'}
            </Button>
          </div>
        </Card>
      ))}
      
      {/* Response Dialog */}
      <Dialog open={!!openDialogId} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="max-w-[600px] w-full sm:max-w-[95vw]">
          <DialogHeader>
            <DialogTitle>
              {localFeedbacks.find(f => f.id === openDialogId)?.response 
                ? 'Edit Response' 
                : 'Add Response'}
            </DialogTitle>
            <DialogDescription>
              Your response will be stored and can be viewed by the site owner.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <label htmlFor="response" className="text-sm font-medium text-slate-700 block mb-2">
              Your Response
            </label>
            <textarea
              id="response"
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              rows={5}
              className="w-full p-2 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Type your response here..."
            />
          </div>
          
          <DialogFooter className="flex flex-row gap-2 mt-4 sm:flex-col">
            <Button variant="outline" onClick={handleCloseDialog} className="w-auto sm:w-full">
              Cancel
            </Button>
            <Button 
              onClick={() => openDialogId && handleSubmitResponse(openDialogId)}
              disabled={isSubmitting || !responseText.trim()}
              className="w-auto sm:w-full"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Response'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 