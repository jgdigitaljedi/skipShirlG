import express from 'express';
const ctrlProfile = require('../controllers/profile.controller');
const router = express.Router();

router.get('/', ctrlProfile.profileRead);

router.patch('/', ctrlProfile.profileUpdate);

export default router;