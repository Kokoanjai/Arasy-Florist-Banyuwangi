import { Router } from 'express';
import { categoryService } from '../services/categoryService.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public: GET /api/categories
router.get('/', async (_req, res, next) => {
  try {
    const result = await categoryService.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Public: GET /api/categories/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const category = await categoryService.getBySlug(req.params.slug);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    next(err);
  }
});

// Admin: POST /api/categories
router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const category = await categoryService.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
});

// Admin: PUT /api/categories/:id
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const category = await categoryService.update(req.params.id, req.body);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    next(err);
  }
});

// Admin: DELETE /api/categories/:id
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const category = await categoryService.delete(req.params.id);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
