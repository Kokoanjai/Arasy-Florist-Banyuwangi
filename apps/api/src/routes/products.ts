import { Router } from 'express';
import { productService } from '../services/productService.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public: GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const { category, tag } = req.query;
    const result = await productService.getAll({
      category: category as string,
      tag: tag as string,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Public: GET /api/products/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const product = await productService.getBySlug(req.params.slug);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// Admin: GET /api/products/admin/all
router.get('/admin/all', requireAdmin, async (_req, res, next) => {
  try {
    const result = await productService.getAllAdmin();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Admin: POST /api/products
router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// Admin: PUT /api/products/:id
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// Admin: DELETE /api/products/:id
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const product = await productService.delete(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
