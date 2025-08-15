const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.post('/forgot-password', userController.handleForgotPassword);
router.post('/reset-password/:token', userController.handleResetPassword);

module.exports = router;