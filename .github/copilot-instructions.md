# Student Link Copilot Instructions

This is a full-stack student platform connecting Nigerian students across universities.

## Project Overview
- **Frontend**: Next.js with React, Tailwind CSS
- **Backend**: Node.js/Express, PostgreSQL
- **Real-time**: Socket.IO for chat
- **Authentication**: JWT-based email/password login
- **Payments**: Flutterwave/Paystack for Nigerian Naira (NGN)

## Key Features
1. User authentication & profiles
2. Study resources marketplace
3. Competitions & events
4. Timeline/news feed with posts
5. Marketplace for buying/selling
6. School groups
7. Chat system
8. Admin dashboard

## Quick Start
1. Configure PostgreSQL in `backend/.env`
2. Run `npm install` in both `frontend/` and `backend/`
3. Initialize database: `psql -f backend/config/database.sql`
4. Start backend: `cd backend && npm run dev`
5. Start frontend: `cd frontend && npm run dev`

## Admin Access
Email: studentlink@admin.com
Password: studentlinkadmin

## Development Focus Areas
- Core authentication working
- Database schema complete
- API endpoints structured
- Frontend pages responsive
- Ready for feature expansion
