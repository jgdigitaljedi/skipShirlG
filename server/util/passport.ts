import passport from 'passport';
import * as passportLocal from 'passport-local';
import mongoose from 'mongoose';
import '../models/user.model';
import { IUserMethods } from '../common.models';

// @ts-ignore
const LocalStrategy = passportLocal.Strategy;
const User = mongoose.model('User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    (username: string, password: string, done) => {
      User.findOne({ email: username }, (err, user: IUserMethods) => {
        if (err) {
          return done(err);
        }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Password is wrong'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  )
);
