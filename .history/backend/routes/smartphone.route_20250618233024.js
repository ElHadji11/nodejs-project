import express from 'express';
import { createSmartphone, deleteSmartphone, getAllSmartphones, getSmartphoneInfo, updateSmartphone } from '../controllers/smartphone.controller';

const router = express.Router();

router.post('/', createSmartphone);
router.get('/', getAllSmartphones);
router.get('/:id', getSmartphoneInfo);
router.put('/:id', updateSmartphone);
router.delete('/:id', deleteSmartphone);


export default router;