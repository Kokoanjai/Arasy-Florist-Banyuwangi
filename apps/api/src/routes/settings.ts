import { Router } from 'express';
import { settingsService } from '../services/settingsService.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public: GET /api/settings
router.get('/', async (_req, res, next) => {
  try {
    const settings = await settingsService.getAll();
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

// Admin: PUT /api/settings
router.put('/', requireAdmin, async (req, res, next) => {
  try {
    const updated = await settingsService.updateAll(req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
