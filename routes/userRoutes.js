import { Router } from 'express';
import userController from '../controllers/userController.js';
const router = Router();
// const passport =require('passport');
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


//router.get('/login', passport.authenticate('google'));
router.get('/', userController.get_all_users);
router.get('/:id', userController.get_user_by_id);
router.post('/', userController.create_user);
router.delete('/:id', userController.delete_user);
router.post('/login', userController.get_user_by_identifier);
router.get('/:user_identifier/get_friends', userController.getFriends);
router.patch('/:user_identifier/follow', userController.follow);
router.delete('/:user_identifier/unfollow', userController.unfollow);
router.get('/:user_identifier/find_friends', userController.findFriends);

router.patch('/:user_identifier/update_status', userController.updateStatus);


export default router;