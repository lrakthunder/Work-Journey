import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { pool } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const authService = {
  async register(firstName: string, lastName: string, username: string, email: string, password: string) {
    const connection = await pool.getConnection();
    try {
      // Check if email or username exists
      const [existing] = await connection.execute(
        'SELECT id FROM users WHERE email = ? OR username = ?',
        [email, username]
      );
      
      if (Array.isArray(existing) && existing.length > 0) {
        throw new Error('Email or username already exists');
      }

      const id = randomUUID();
      const hashedPassword = await bcrypt.hash(password, 10);

      await connection.execute(
        'INSERT INTO users (id, first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?, ?)',
        [id, firstName, lastName, username, email, hashedPassword]
      );

      return { id, firstName, lastName, username, email };
    } finally {
      connection.release();
    }
  },

  async login(email: string, password: string) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT id, first_name, last_name, username, email, password FROM users WHERE email = ?',
        [email]
      );

      const users = Array.isArray(rows) ? rows : [];
      if (users.length === 0) {
        throw new Error('Invalid credentials');
      }

      const user = users[0] as any;
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      return { id: user.id, firstName: user.first_name, lastName: user.last_name, username: user.username, email: user.email };
    } finally {
      connection.release();
    }
  },

  generateToken(userId: string) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
  },

  verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  }
};
