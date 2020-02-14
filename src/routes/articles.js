import express from 'express';
import { articleController } from '../controllers';

const router = express.Router();

router.get('/', articleController.list);

export default router;
