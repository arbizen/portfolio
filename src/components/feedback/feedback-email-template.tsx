import React from 'react';

interface FeedbackEmailTemplateProps {
  name: string;
  email: string;
  message: string;
  type: 'feedback' | 'question';
  submittedAt: string;
}

export const FeedbackEmailTemplate: React.FC<FeedbackEmailTemplateProps> = ({
  name,
  email,
  message,
  type,
  submittedAt,
}) => {
  const isQuestion = type === 'question';

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px 20px',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: '3px solid #3b82f6',
          paddingBottom: '20px',
          marginBottom: '30px',
        }}
      >
        <h1
          style={{
            margin: '0',
            fontSize: '24px',
            fontWeight: '700',
            color: '#1f2937',
          }}
        >
          New {isQuestion ? 'Question' : 'Feedback'} Received
        </h1>
        <p
          style={{
            margin: '5px 0 0 0',
            fontSize: '14px',
            color: '#6b7280',
          }}
        >
          {new Date(submittedAt).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* Type Badge */}
      <div style={{ marginBottom: '25px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            backgroundColor: isQuestion ? '#dbeafe' : '#f3e8ff',
            color: isQuestion ? '#1d4ed8' : '#7c3aed',
          }}
        >
          {isQuestion ? '❓ Question' : '💬 Feedback'}
        </span>
      </div>

      {/* Sender Info */}
      <div
        style={{
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '25px',
          borderLeft: '4px solid #3b82f6',
        }}
      >
        <h3
          style={{
            margin: '0 0 10px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
          }}
        >
          From: {name}
        </h3>
        <p
          style={{
            margin: '0',
            fontSize: '14px',
            color: '#6b7280',
          }}
        >
          📧 {email}
        </p>
      </div>

      {/* Message Content */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '25px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          marginBottom: '30px',
        }}
      >
        <h3
          style={{
            margin: '0 0 15px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
          }}
        >
          {isQuestion ? 'Question:' : 'Message:'}
        </h3>
        <div
          style={{
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#374151',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {message}
        </div>
      </div>

      {/* Call to Action */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          marginBottom: '25px',
        }}
      >
        <p
          style={{
            margin: '0 0 15px 0',
            fontSize: '14px',
            color: '#6b7280',
          }}
        >
          {isQuestion
            ? 'Someone is waiting for your answer! 🤔'
            : 'New feedback to review! 📝'}
        </p>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL + '/en/admin/feedback'}`}
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          View in Admin Dashboard →
        </a>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: 'center',
          paddingTop: '20px',
          borderTop: '1px solid #e5e7eb',
        }}
      >
        <p
          style={{
            margin: '0',
            fontSize: '12px',
            color: '#9ca3af',
          }}
        >
          This is an automated notification from your website feedback system.
        </p>
      </div>
    </div>
  );
};
