import { printHello } from '../controllers/helloController.mjs';
import express from 'express';

const router = express.Router()

router.get('/', printHello)

export default router