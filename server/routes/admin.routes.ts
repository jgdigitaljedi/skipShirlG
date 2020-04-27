import express from 'express';
import { ApiLogger } from '../util/logger';
import { listUsers, changeUserActive, deleteUser }from '../controllers/admin.controller';

const router = express.Router();

router.get('/listusers', listUsers);

router.delete('/deleteuser', deleteUser);

router.post('/useractive', changeUserActive);

export default router;