# AnonCampus

**Connect. Chat. Share. Stay Anonymous.**

AnonCampus is a modern, anonymous college social and communication platform. It allows college students to communicate, discover discussions, connect randomly, create anonymous posts, join communities, find teammates, and participate in college activities without revealing their true identities.

## Features
- **Anonymous Identity**: Students are assigned public identities (e.g., Anonymous_472) while keeping real details private.
- **Random Chat**: Server-side matchmaking connects students for one-on-one anonymous real-time conversations.
- **Anonymous Posts & Confessions**: Share thoughts, ask questions, and confess securely on a global feed.
- **College Communities**: Join discussions based on department, year, or interest.
- **Groups & Study Groups**: Create and collaborate on specific topics or coursework.
- **Team Finder**: Discover teammates for hackathons and projects.
- **Polls**: Create and vote on polls anonymously.
- **Resources**: Share and discover notes, PDFs, links, and study materials.
- **Real-Time Communication**: Uses Socket.IO for seamless messaging and notifications.
- **Safety First**: Report, block, and moderation tools included to maintain a healthy community.

## Technology Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS, Lucide React
- **Backend**: Next.js API Routes / Node.js
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Real-time**: Socket.IO
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Storage**: Supabase Storage

## Architecture

AnonCampus is built with a modular Next.js architecture. The core application logic is separated into different routes, utilizing the App router for the main UI and API routes for Socket.IO integration and backend logic.

- **Frontend**: Utilizes Tailwind CSS for responsive, accessible design.
- **Backend APIs**: RESTful API structure built on Next.js Route Handlers.
- **Database Schema**: A comprehensive relational schema managed by Prisma, handling users, posts, chats, communities, and reports.
- **Privacy Model**: Strict separation of user's real identifying information (PII) from their public `AnonymousIdentity`. APIs only expose the anonymous identifiers to clients.

## Setup Instructions

### 1. Supabase Setup
1. Create a new project on [Supabase](https://supabase.com/).
2. Create a Storage Bucket named `resources` for file uploads.
3. Retrieve your PostgreSQL connection string (`DATABASE_URL` and `DIRECT_URL`).

### 2. Environment Variables
Create a `.env` file in the root directory and populate it with the following:

```env
DATABASE_URL="postgres://postgres.xxx:password@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgres://postgres.xxx:password@aws-0-region.pooler.supabase.com:5432/postgres"
AUTH_SECRET="generate-a-secure-secret-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
SOCKET_URL="http://localhost:3000"
SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_ANON_KEY="your-anon-key"
```

### 3. Prisma Setup
Initialize your database schema:
```bash
npx prisma generate
npx prisma db push
```

### 4. Local Development
Install dependencies and run the development server:
```bash
npm install
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

### 5. Development Seed Data
Currently, AnonCampus is in the initial development phase. Mock users (e.g., Anonymous_472, Anonymous_821) and mock data can be generated using Prisma seed scripts (to be added in future iterations).

## Testing
To test the Random Chat end-to-end:
1. Open three separate browser sessions (incognito windows).
2. Create three accounts.
3. Have User A and User B enter the random chat queue. They should match and communicate.
4. Have User C enter the queue. User C will wait until A or B becomes available.

## Known Limitations
- The current Socket.IO integration relies on the Next.js API router which might behave differently on serverless deployments (Vercel) without a dedicated WebSocket server. For production, consider a standalone Node/Express server for Socket.IO or use a WebSocket service.
- Real-time functionality is partially mocked in UI placeholders until the backend DB is fully seeded.

## Recommended Next Steps
- Implement full Prisma Seed for automated test users.
- Deploy the Socket.IO server as a separate microservice for better scalability on edge networks.
- Connect Supabase Storage for the Resources module.
