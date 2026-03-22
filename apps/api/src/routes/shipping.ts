import { Router } from 'express';
import { shippingService } from '../services/shippingService.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public: GET /api/shipping-zones
router.get('/', async (req, res, next) => {
  try {
    const { search } = req.query;
    const result = await shippingService.getAll(search as string);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Admin: POST /api/shipping-zones
router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const zone = await shippingService.create(req.body);
    res.status(201).json(zone);
  } catch (err) {
    next(err);
  }
});

// Admin: PUT /api/shipping-zones/:id
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const zone = await shippingService.update(req.params.id, req.body);
    if (!zone) {
      res.status(404).json({ error: 'Shipping zone not found' });
      return;
    }
    res.json(zone);
  } catch (err) {
    next(err);
  }
});

// Admin: DELETE /api/shipping-zones/:id
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const zone = await shippingService.delete(req.params.id);
    if (!zone) {
      res.status(404).json({ error: 'Shipping zone not found' });
      return;
    }
    res.json({ message: 'Shipping zone deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
