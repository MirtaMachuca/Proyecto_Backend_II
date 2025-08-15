import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import cartController from '../controllers/cart.controller.js';

const router = Router();


router.post('/carts/:cartId/checkout', authMiddleware, cartController.handleCheckout);

export default router;