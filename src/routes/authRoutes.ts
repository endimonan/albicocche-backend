import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthController } from '../controllers/AuthController';

const router = Router();

router.post('/register', UserController.register);
router.post('/verify-email', UserController.verifyEmail);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

export default router;
