import { Router } from 'express';
import { VALID_TOKEN } from '../middleware/auth.js';

const router = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { password } = req.body;

  if (!password || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Password salah' });
    return;
  }

  res.json({ token: VALID_TOKEN });
});

export default router;
