import { Router } from 'express';
import { handle_login, loginWithPassword, whoAreYou } from '../controllers/loginController.js';
const router = Router();

router.post('/handler', handle_login);
router.get('/favicon.ico', whoAreYou);
router.post('/password', loginWithPassword);

export default router;