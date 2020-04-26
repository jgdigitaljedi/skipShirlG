import express from 'express';
import {
  register,
  login,
  deleteMe,
  changePassword,
  resetPasswordLink,
  devUser
} from '../util/user';
import jwt from 'express-jwt';

const auth = jwt({
  secret: process.env.SKIPGSECRET,
  userProperty: 'payload'
});
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.delete('/', auth, deleteMe);

router.post('/changepw', auth, changePassword);

router.post('/reset', resetPasswordLink);

router.post('/devuser', devUser);

export default router;
