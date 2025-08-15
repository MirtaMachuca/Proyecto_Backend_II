import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/authorization.middleware.js';
import productController from '../controllers/product.controller.js';

const router = Router();


router.post('/products', authMiddleware, isAdmin, productController.createProduct);


router.put('/products/:id', authMiddleware, isAdmin, productController.updateProduct);


router.delete('/products/:id', authMiddleware, isAdmin, productController.deleteProduct);

// Para ver productos, solo se requiere autenticación 
router.get('/products', authMiddleware, productController.getAllProducts);

export default router;