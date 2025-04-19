# Feedback & AMA System Setup

This document provides instructions for setting up the Feedback & AMA system on your website.

## 1. Create Notion Database

First, you need to create a new database in Notion with the following properties:

- **name** (Title): Name of the person who submitted feedback
- **email** (Text): Email of the person who submitted feedback
- **message** (Text): The feedback or question content
- **type** (Select): Options should include "Feedback" and "Question"
- **createdAt** (Date): When the feedback was submitted
- **isResolved** (Checkbox): Whether the feedback has been addressed
- **response** (Text): Your response to the feedback (if any)
- **publishResponse** (Checkbox): Whether to display this response publicly on the website

## 2. Update Environment Variables

After creating the database, add the following variables to your `.env.local` file:

```
NOTION_FEEDBACK_DATABASE_ID=your_database_id_here
ADMIN_SECRET_KEY=choose_a_secure_admin_password
```

## 3. Access the Admin Dashboard

To access the admin dashboard for managing feedback:

1. Navigate to: `https://your-domain.com/en/admin/feedback`
2. Enter your admin password (the value you set for `ADMIN_SECRET_KEY` in your environment variables)

## 4. Features

The feedback system includes:

- Public feedback submission form available at `/feedback`
- Admin dashboard with password authentication for managing feedback
- Ability to respond to feedback
- Mark feedback as resolved/unresolved
- Publish/unpublish responses to make them visible on the public feedback page
- Delete feedback entries
- Public display of selected responses on the feedback page

## 5. Publishing Responses

When you respond to feedback or questions in the admin dashboard:
1. Write and submit your response
2. Click the "Publish" button to make it visible on the public page
3. Only published responses from resolved feedback will appear on the public page
4. You can unpublish a response at any time to remove it from public view

## 6. Security Considerations

- Choose a strong, unique password for your `ADMIN_SECRET_KEY`
- Consider implementing additional security measures for production use
- The current implementation is basic and could be enhanced with features like:
  - Email notifications when new feedback is received
  - Rate limiting for feedback submissions
  - CAPTCHA to prevent spam 