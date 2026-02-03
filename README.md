# Student Link - Full Stack Application

## Project Structure

```
student-link/
├── frontend/              # Next.js Frontend
│   ├── pages/            # Next.js pages
│   ├── components/       # React components
│   ├── context/          # Context API
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   └── public/           # Static files
│
└── backend/              # Node.js/Express Backend
    ├── routes/           # API routes
    ├── controllers/      # Route handlers
    ├── models/           # Database models
    ├── middleware/       # Custom middleware
    ├── config/           # Configuration files
    └── utils/            # Utility functions
```

## Quick Start

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example` and update with your database credentials

4. Create PostgreSQL database and run SQL schema:
   ```bash
   psql -U postgres -d student_link -f config/database.sql
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file from `.env.local.example`

4. Start development server:
   ```bash
   npm run dev
   ```

   App will run on `http://localhost:3000`

## Admin Credentials

- **Email**: studentlink@admin.com
- **Password**: studentlinkadmin

## Features Implemented

✅ User authentication (Register/Login)
✅ Study resources management
✅ Competitions & events
✅ Timeline/News feed
✅ Marketplace
✅ School groups
✅ Chat infrastructure (Socket.IO ready)
✅ Admin dashboard structure
✅ Mobile-responsive design
✅ Teal & Orange color scheme

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile

### Resources
- `GET /api/resources` - Get approved resources
- `POST /api/resources` - Submit resource
- `PUT /api/resources/:id/approve` - Admin approve

### Timeline
- `GET /api/timeline` - Get feed
- `POST /api/timeline` - Create post
- `POST /api/timeline/:id/like` - Like post
- `POST /api/timeline/:id/comment` - Comment on post
- `POST /api/timeline/:id/bookmark` - Bookmark post

### Marketplace
- `GET /api/marketplace` - Get listings
- `POST /api/marketplace` - Create listing

### Competitions
- `GET /api/competitions` - Get competitions
- `POST /api/competitions` - Create competition (admin)

### Groups
- `GET /api/groups` - Get all groups
- `GET /api/groups/:id/members` - Get group members

### Chat
- `GET /api/chat/:roomId` - Get messages
- `POST /api/chat` - Send message

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/pending/resources` - Pending approvals

## Technologies Used

**Frontend:**
- React.js / Next.js
- Tailwind CSS
- Socket.IO (for real-time chat)
- Axios (API client)

**Backend:**
- Node.js / Express.js
- PostgreSQL
- JWT (authentication)
- BCrypt (password hashing)
- Socket.IO (real-time chat)

**Payments:** 
- Flutterwave / Paystack integration (to be configured)

## Next Steps

1. Setup PostgreSQL database
2. Configure environment variables
3. Install dependencies for both frontend and backend
4. Run database migrations
5. Start both servers
6. Create admin account
7. Implement remaining features (payments, notifications, etc.)

## Notes

- All features are basic structure - UI is responsive and functional
- Database schema includes all necessary tables
- Authentication system using JWT is in place
- Socket.IO is configured for real-time features
- Environment examples are provided for easy setup
