import { Router } from 'express';
import { contactService } from '../services/contactService.js';
import { validate } from '../middleware/validate.js';
import { requireAdmin } from '../middleware/auth.js';
import { z } from 'zod';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
});

// Public: POST /api/contact
router.post('/', validate(contactSchema), async (req, res, next) => {
  try {
    const result = await contactService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// Admin: GET /api/contact
router.get('/', requireAdmin, async (_req, res, next) => {
  try {
    const messages = await contactService.getAll();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// Admin: PUT /api/contact/:id/read
router.put('/:id/read', requireAdmin, async (req, res, next) => {
  try {
    const message = await contactService.markAsRead(req.params.id);
    res.json(message);
  } catch (err) {
    next(err);
  }
});

// Admin: DELETE /api/contact/:id
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const message = await contactService.delete(req.params.id);
    if (!message) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }
    res.json({ message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
