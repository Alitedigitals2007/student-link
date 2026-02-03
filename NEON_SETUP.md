# Neon Database Setup

## Your Neon Connection Details

**Host**: ep-fancy-rain-ah29ngp2-pooler.c-3.us-east-1.aws.neon.tech  
**Database**: neondb  
**User**: neondb_owner  
**Password**: npg_bXRcPHG6Tv0A  
**SSL**: Required

---

## Setup Instructions

### Option 1: Using psql Command

```bash
psql 'postgresql://neondb_owner:npg_bXRcPHG6Tv0A@ep-fancy-rain-ah29ngp2-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' -f config/database.sql
```

### Option 2: Using PowerShell

```powershell
# Copy the entire connection string from your Neon dashboard
$neonUrl = 'postgresql://neondb_owner:npg_bXRcPHG6Tv0A@ep-fancy-rain-ah29ngp2-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

# Connect and run schema
psql $neonUrl -f config/database.sql
```

### Option 3: Manual Setup via Neon Console

1. Go to https://console.neon.tech
2. Select your database
3. Open SQL Editor
4. Copy contents of `config/database.sql`
5. Run the SQL

---

## Verify Database

```bash
psql 'postgresql://neondb_owner:npg_bXRcPHG6Tv0A@ep-fancy-rain-ah29ngp2-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' -c '\dt'
```

This should list all tables:
- users
- school_groups
- study_resources
- competitions
- timeline_posts
- timeline_comments
- marketplace_listings
- chat_messages
- friendships
- bookmarks
- hashtags
- post_hashtags
- transactions

---

## Environment Configuration

The `.env` file is already configured with your Neon credentials and Paystack keys:

```
DB_HOST=ep-fancy-rain-ah29ngp2-pooler.c-3.us-east-1.aws.neon.tech
DB_PORT=5432
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASSWORD=npg_bXRcPHG6Tv0A
DB_SSL=require

PAYSTACK_PUBLIC_KEY=pk_live_b8e817b80692a3846e06ec643bb3f4f4900b5297
PAYSTACK_SECRET_KEY=sk_live_3bb1b663cf65a30d46f2510f65b6112317f2c53f
```

---

## Start Backend

```powershell
cd backend
npm run dev
```

The backend will connect to your Neon database automatically.

---

## Testing

1. Register a user
2. Try to purchase from marketplace
3. Payment flow should work with Paystack

---

## Useful Neon Commands

```bash
# List databases
psql -h ep-fancy-rain-ah29ngp2-pooler.c-3.us-east-1.aws.neon.tech -U neondb_owner -d neondb -c '\l'

# List tables
psql -h ep-fancy-rain-ah29ngp2-pooler.c-3.us-east-1.aws.neon.tech -U neondb_owner -d neondb -c '\dt'

# Count users
psql -h ep-fancy-rain-ah29ngp2-pooler.c-3.us-east-1.aws.neon.tech -U neondb_owner -d neondb -c 'SELECT COUNT(*) FROM users;'
```

---

Done! Your database and payments are ready to go! 🚀
