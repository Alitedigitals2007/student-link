# Student Link - Complete Setup Guide

## ⚙️ Prerequisites
- Node.js 16+ installed
- PostgreSQL installed and running
- npm 8+ installed

---

## 📋 Step-by-Step Setup

### **Step 1: Backend Setup**

1. Open PowerShell and navigate to backend:
```powershell
cd "C:\Users\hp\Downloads\Student\student-link\backend"
```

2. Install dependencies:
```powershell
npm install
```

3. Create `.env` file from `.env.example`:
```powershell
Copy-Item .env.example .env
```

4. Edit `.env` with your PostgreSQL credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=student_link
DB_USER=postgres
DB_PASSWORD=your_password

PORT=5000
FRONTEND_URL=http://localhost:3000

JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=7d

FLUTTERWAVE_PUBLIC_KEY=test_key
FLUTTERWAVE_SECRET_KEY=test_secret
PAYSTACK_PUBLIC_KEY=test_key
PAYSTACK_SECRET_KEY=test_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

AWS_ACCESS_KEY=test
AWS_SECRET_KEY=test
AWS_BUCKET=student-link
```

5. Create PostgreSQL database and run schema:
```powershell
# Open PostgreSQL
psql -U postgres

# In psql terminal, create database:
CREATE DATABASE student_link;
\q

# Run schema:
psql -U postgres -d student_link -f config/database.sql
```

6. Start backend server:
```powershell
npm run dev
```
Server runs on: **http://localhost:5000**

---

### **Step 2: Frontend Setup**

1. Open NEW PowerShell window and navigate to frontend:
```powershell
cd "C:\Users\hp\Downloads\Student\student-link\frontend"
```

2. Install dependencies:
```powershell
npm install
```

If you get permission errors, try:
```powershell
npm install --legacy-peer-deps
```

3. Create `.env.local` from `.env.local.example`:
```powershell
Copy-Item .env.local.example .env.local
```

4. Verify `.env.local` contents:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

5. Start frontend development server:
```powershell
npm run dev
```
App runs on: **http://localhost:3000**

---

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] PostgreSQL database `student_link` created
- [ ] Can access http://localhost:3000 in browser
- [ ] Can navigate to Register page
- [ ] Can navigate to Login page

---

## 🔐 Admin Login

**Email**: studentlink@admin.com  
**Password**: studentlinkadmin

---

## 🚀 First Test - Register a User

1. Go to http://localhost:3000
2. Click "Register"
3. Fill in form:
   - Name: Test Student
   - Email: test@gmail.com
   - Password: Test123!
   - WhatsApp: +2349012345678
   - University: University of Lagos
   - Department: Computer Science
   - Level: 100
4. Click Register
5. You should be logged in automatically

---

## 📝 Available API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (with filters)
- `GET /api/users/:id` - Get specific user profile
- `PUT /api/users/:id` - Update user profile

### Timeline
- `GET /api/timeline` - Get timeline posts
- `POST /api/timeline` - Create new post
- `POST /api/timeline/:id/like` - Like a post
- `POST /api/timeline/:id/comment` - Comment on post
- `POST /api/timeline/:id/bookmark` - Bookmark post

### Resources
- `GET /api/resources` - Get study resources
- `POST /api/resources` - Submit resource
- `PUT /api/resources/:id/approve` - Admin approve resource

### Competitions
- `GET /api/competitions` - Get all competitions
- `POST /api/competitions` - Create competition (admin only)

### Marketplace
- `GET /api/marketplace` - Get marketplace listings
- `POST /api/marketplace` - Create listing

### Groups
- `GET /api/groups` - Get all school groups
- `GET /api/groups/:id/members` - Get group members

### Chat
- `GET /api/chat/:roomId` - Get messages from room
- `POST /api/chat` - Send message

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/pending/resources` - Pending resource approvals
- `GET /api/admin/pending/posts` - Pending post approvals
- `GET /api/admin/pending/listings` - Pending marketplace listings

---

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify `.env` file exists with correct credentials
- Check port 5000 is not in use: `netstat -ano | findstr :5000`

### Frontend npm install fails
```powershell
# Try one of these:
npm install --legacy-peer-deps
npm cache clean --force
npm install
```

### Database connection error
```powershell
# Test PostgreSQL connection:
psql -U postgres -d student_link -c "SELECT NOW();"
```

### Port already in use
```powershell
# Kill process on port 5000:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

---

## 📚 Features Ready to Use

✅ User Registration & Login  
✅ Timeline/Feed  
✅ Study Resources  
✅ Competitions  
✅ Marketplace  
✅ School Groups  
✅ Profile Management  
✅ Admin Dashboard  

---

## 🔄 Next Steps

1. Test all pages and features
2. Create test data
3. Test admin approval features
4. Configure payment gateways (Flutterwave/Paystack)
5. Setup email notifications
6. Add file upload functionality
7. Implement real-time chat with Socket.IO

---

Need help? Check the logs in both terminals for errors!
