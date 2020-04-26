import express from 'express';
import jwt from 'express-jwt';
import userRoutes from './user.routes';

const auth = jwt({
  secret: process.env.SKIPGSECRET,
  userProperty: 'payload'
});
const router = express.Router();

// authentication
router.use('/user', userRoutes);

export default router;
