import express from 'express';
import jwt from 'express-jwt';
import userRoutes from './user.routes';
import profileRoutes from './profile.routes';
import adminRoutes from './admin.routes';

const auth = jwt({
  secret: process.env.SKIPGSECRET,
  userProperty: 'payload'
});
const router = express.Router();

// authentication
router.use('/user', userRoutes);

// profile
router.use('/profile', auth, profileRoutes);

// admin
router.use('/admin', auth, adminRoutes);

export default router;
