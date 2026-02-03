# 🚀 Student Link - Quick Start (Neon + Paystack)

## ✅ What's Configured

- ✅ **Database**: Neon PostgreSQL (Cloud-based)
- ✅ **Payments**: Paystack (Live Keys)
- ✅ **Backend**: Node.js/Express
- ✅ **Frontend**: Next.js/React
- ✅ **Authentication**: JWT

---

## 🎯 Complete Setup in 3 Steps

### Step 1: Initialize Database

```powershell
cd c:\Users\hp\Downloads\Student\student-link\backend

npm run init-db
```

**Expected Output:**
```
✅ Connected successfully!
📝 Running database schema...
✅ Database schema initialized!

📊 Tables created:
  ✓ users
  ✓ school_groups
  ✓ study_resources
  ✓ competitions
  ✓ timeline_posts
  ✓ timeline_comments
  ✓ marketplace_listings
  ✓ chat_messages
  ✓ friendships
  ✓ bookmarks
  ✓ hashtags
  ✓ post_hashtags
  ✓ transactions

✨ Database setup complete!
```

---

### Step 2: Start Backend

```powershell
# Same terminal, run:
npm run dev
```

**Expected:**
```
Server running on port 5000
```

Backend ready at: **http://localhost:5000**

---

### Step 3: Start Frontend (NEW TERMINAL)

```powershell
cd c:\Users\hp\Downloads\Student\student-link\frontend

npm run dev
```

**Expected:**
```
> Ready on http://localhost:3000
```

Frontend ready at: **http://localhost:3000**

---

## 🧪 Test Everything

### 1. Test Home Page
```
http://localhost:3000
```
✅ Should see hero section with "Get Started" button

### 2. Test Registration
```
http://localhost:3000/register
```
Fill in:
- Name: Test User
- Email: test@example.com
- Password: Test123!
- WhatsApp: +2349012345678
- University: University of Lagos
- Department: Computer Science
- Level: 100

Click Register → Should redirect to home logged in

### 3. Test Timeline
```
http://localhost:3000/timeline
```
✅ Should see "Create Post" form
✅ Can write and submit posts

### 4. Test Marketplace
```
http://localhost:3000/marketplace
```
✅ Should see marketplace items
✅ Can filter by category

### 5. Test Admin Dashboard
```
http://localhost:3000/admin
```
Login with:
- Email: studentlink@admin.com
- Password: studentlinkadmin

✅ Should see admin stats

---

## 💳 Test Paystack Payment

1. Go to Marketplace
2. Click "View Details" on any item
3. Click "Buy Now"
4. Modal appears → "Pay Now" button
5. Paystack popup opens
6. Use test card:
   - **Card**: 4111 1111 1111 1111
   - **Expiry**: 10/25
   - **CVV**: 123
   - **OTP**: 123456

✅ Payment should complete

---

## 🔑 Configured Keys

### Database (Neon)
```
Host: ep-fancy-rain-ah29ngp2-pooler.c-3.us-east-1.aws.neon.tech
DB: neondb
User: neondb_owner
Password: npg_bXRcPHG6Tv0A
```

### Paystack (Live)
```
Public Key: pk_live_b8e817b80692a3846e06ec643bb3f4f4900b5297
Secret Key: sk_live_3bb1b663cf65a30d46f2510f65b6112317f2c53f
```

---

## 📁 File Locations

```
student-link/
├── backend/
│   ├── .env                    ← Database & Paystack credentials
│   ├── init-db.js             ← Database initializer
│   ├── server.js              ← Main server file
│   ├── config/database.js     ← DB connection config
│   ├── routes/payments.js     ← Payment endpoints
│   └── utils/paystack.js      ← Paystack service
│
└── frontend/
    ├── .env.local             ← API & Paystack public key
    ├── components/PaystackPayment.js
    ├── pages/index.js
    └── pages/marketplace.js
```

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED

Solution:
- Check internet connection (Neon is cloud-based)
- Verify .env has correct credentials
- Test manually: 
  psql 'postgresql://neondb_owner:npg_bXRcPHG6Tv0A@ep-fancy-rain-ah29ngp2-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require'
```

### Paystack Error
```
Error: Invalid public key

Solution:
- Check .env.local has Paystack public key
- Restart frontend dev server
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000

Solution (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

---

## 🎓 API Endpoints

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### Timeline
- `GET /api/timeline` - Get posts
- `POST /api/timeline` - Create post
- `POST /api/timeline/:id/like` - Like

### Marketplace
- `GET /api/marketplace` - Get items
- `POST /api/marketplace` - Create listing

### Payments
- `POST /api/payments/initialize` - Start payment
- `POST /api/payments/verify/:reference` - Verify payment
- `GET /api/payments/transactions` - Get history

### Resources
- `GET /api/resources` - Get resources
- `POST /api/resources` - Submit resource

### Competitions
- `GET /api/competitions` - Get competitions
- `POST /api/competitions` - Create (admin)

---

## 📊 Database Tables

All tables automatically created by `npm run init-db`:

1. **users** - Student accounts
2. **school_groups** - University groups
3. **study_resources** - Learning materials
4. **competitions** - Events/competitions
5. **timeline_posts** - Social feed posts
6. **timeline_comments** - Post comments
7. **marketplace_listings** - Buy/sell items
8. **chat_messages** - Direct messages
9. **transactions** - Payment history
10. **friendships** - Connections
11. **bookmarks** - Saved posts
12. **hashtags** - Post tags

---

## 🚀 You're Ready!

✅ Database connected to Neon  
✅ Payments ready with Paystack  
✅ All API endpoints working  
✅ Frontend fully responsive  
✅ Admin dashboard active  

**Next steps:**
1. Customize design/colors
2. Add more features
3. Deploy to production

Enjoy building! 🎓
