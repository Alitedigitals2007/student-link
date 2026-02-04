#!/usr/bin/env node

const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // This uses the single URL Railway gives you
  ssl: {
    rejectUnauthorized: false // This is the secret to making Railway Postgres work!
  }
});

async function initializeDatabase() {
  try {
    console.log('🔄 Connecting to database...');
    const client = await pool.connect();

    console.log('✅ Connected successfully!');

    // Read and execute schema
    const schemaPath = path.join(__dirname, 'config', 'database.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📝 Running database schema...');
    
    // Split by semicolon and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));

    for (const statement of statements) {
      try {
        await client.query(statement + ';');
      } catch (error) {
        // Ignore table already exists errors
        if (!error.message.includes('already exists')) {
          console.error('Error executing statement:', statement.substring(0, 50));
          console.error(error.message);
        }
      }
    }

    console.log('✅ Database schema initialized!');

    // Verify tables
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    console.log('\n📊 Tables created:');
    result.rows.forEach(row => {
      console.log(`  ✓ ${row.table_name}`);
    });

    client.release();
    pool.end();

    console.log('\n✨ Database setup complete!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    pool.end();
    process.exit(1);
  }
}

initializeDatabase();
