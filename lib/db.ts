import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function initializeDatabase() {
  const connection = await pool.getConnection();
  try {
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create jobs table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS jobs (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        status ENUM('applied', 'interview', 'offer', 'rejected') DEFAULT 'applied',
        applied_date DATE NOT NULL,
        follow_up_date DATE,
        notes LONGTEXT,
        location VARCHAR(255),
        salary VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX (user_id)
      )
    `);

    // Create demo user if it doesn't exist
    const [existingUser] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      ['demo@careerpulse.com']
    );
    
    if (!Array.isArray(existingUser) || existingUser.length === 0) {
      const demoPassword = await bcrypt.hash('demo123', 10);
      await connection.execute(
        'INSERT INTO users (id, first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?, ?)',
        ['550e8400-e29b-41d4-a716-446655440000', 'Demo', 'User', 'demouser', 'demo@careerpulse.com', demoPassword]
      );
      console.log('✓ Demo user created (demo@careerpulse.com / demo123)');
    }

    console.log('✓ Database tables initialized');
  } finally {
    connection.release();
  }
}
