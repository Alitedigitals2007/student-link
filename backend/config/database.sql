-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  whatsapp_number VARCHAR(20),
  university VARCHAR(255),
  department VARCHAR(255),
  level VARCHAR(10),
  avatar_url VARCHAR(500),
  bio TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  school_group_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- School Groups Table
CREATE TABLE school_groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  university VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Study Resources Table
CREATE TABLE study_resources (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  resource_type VARCHAR(50), -- link, file, app
  url VARCHAR(500),
  file_url VARCHAR(500),
  department VARCHAR(255),
  level VARCHAR(10),
  university VARCHAR(255),
  submitted_by INTEGER REFERENCES users(id),
  is_approved BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Competitions Table
CREATE TABLE competitions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  rules TEXT,
  deadline TIMESTAMP,
  prize VARCHAR(255),
  link VARCHAR(500),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Timeline Posts Table
CREATE TABLE timeline_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  post_type VARCHAR(50), -- text, link, file
  file_url VARCHAR(500),
  is_approved BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Timeline Comments Table
CREATE TABLE timeline_comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES timeline_posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Marketplace Listings Table
CREATE TABLE marketplace_listings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  currency VARCHAR(5) DEFAULT 'NGN',
  category VARCHAR(50), -- notes, apps, tutoring, equipment
  seller_id INTEGER REFERENCES users(id),
  is_approved BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat Messages Table
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id),
  receiver_id INTEGER REFERENCES users(id),
  room_id VARCHAR(255), -- for group chats
  message TEXT NOT NULL,
  file_url VARCHAR(500),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Friends/Connections Table
CREATE TABLE friendships (
  id SERIAL PRIMARY KEY,
  user_id1 INTEGER REFERENCES users(id),
  user_id2 INTEGER REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, blocked
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookmarks Table
CREATE TABLE bookmarks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES timeline_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, post_id)
);

-- Hashtags Table
CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  tag_name VARCHAR(100) UNIQUE NOT NULL,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post Hashtags Junction Table
CREATE TABLE post_hashtags (
  post_id INTEGER REFERENCES timeline_posts(id) ON DELETE CASCADE,
  hashtag_id INTEGER REFERENCES hashtags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, hashtag_id)
);

-- Transactions/Payments Table
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  listing_id INTEGER REFERENCES marketplace_listings(id),
  amount DECIMAL(10, 2),
  currency VARCHAR(5) DEFAULT 'NGN',
  payment_method VARCHAR(50), -- flutterwave, paystack
  payment_ref VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_university ON users(university);
CREATE INDEX idx_resources_department ON study_resources(department);
CREATE INDEX idx_timeline_user ON timeline_posts(user_id);
CREATE INDEX idx_marketplace_category ON marketplace_listings(category);
CREATE INDEX idx_messages_room ON chat_messages(room_id);
