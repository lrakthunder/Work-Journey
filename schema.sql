-- WorkJourney Database Schema
-- Create database and tables for work_journey

CREATE DATABASE IF NOT EXISTS work_journey;
USE work_journey;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Jobs table
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_applied_date (applied_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: Create demo user (password is hashed 'demo123')
-- Run this if you want a pre-created demo account
INSERT IGNORE INTO users (id, first_name, last_name, username, email, password) 
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'Demo',
  'User',
  'demouser',
  'demo@careerpulse.com',
  '$2a$10$6YPZm8ZN5DfJxXY7rF5VQep2EqJ8dC8J5Wqo5vXZ1x.E5HYqr.Y7u'
);
