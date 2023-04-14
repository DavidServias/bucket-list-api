import { Router } from 'express';
import userController from '../controllers/userController.js';
import { addItem, updateItemStatus, removeItem } from '../controllers/bucketlistController.js';
const router = Router();


router.patch('/:user_identifier/add-liked-item', userController.addLikedItem);
router.patch('/:user_identifier/add-item', addItem);
router.patch('/:user_identifier/:item_id/item-status', updateItemStatus);
router.delete('/:user_identifier/:item_id/remove-item', removeItem);


export default router;