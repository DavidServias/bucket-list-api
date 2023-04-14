// const express = require('express');
// const userController = require('../controllers/userController').default;
// const router = express.Router();
import ThoughtController from '../controllers/thoughtController.js';



import { Router } from 'express';
//import { addThought, removeThought } from '../controllers/thoughtController';
const router = Router();


router.patch('/:user_identifier/add_thought', ThoughtController.addThought);
router.delete('/:user_identifier/:thought_id/remove_thought', ThoughtController.removeThought);

export default router;