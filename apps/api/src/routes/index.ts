import { Router } from 'express';
import categoriesRouter from './categories.js';
import productsRouter from './products.js';
import shippingRouter from './shipping.js';
import contactRouter from './contact.js';
import settingsRouter from './settings.js';
import authRouter from './auth.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.use('/shipping-zones', shippingRouter);
router.use('/contact', contactRouter);
router.use('/settings', settingsRouter);

export default router;
