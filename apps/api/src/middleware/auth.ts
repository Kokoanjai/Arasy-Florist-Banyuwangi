import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Generate a simple token from password
function generateToken(password: string): string {
  return crypto.createHash('sha256').update(password + '_arasy_florist_secret').digest('hex');
}

export const VALID_TOKEN = generateToken(ADMIN_PASSWORD);

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized — token required' });
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  if (token !== VALID_TOKEN) {
    res.status(403).json({ error: 'Forbidden — invalid token' });
    return;
  }

  next();
}
