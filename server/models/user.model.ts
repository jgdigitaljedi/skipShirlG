import { Schema, model, SchemaType } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import constants from '../util/constants';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  lastName: String,
  admin: {
    type: Boolean,
    required: true
  },
  hash: String,
  salt: String,
  joinDate: String,
  lastUpdated: String,
  resetToken: String,
  resetTokenExpires: String
});

userSchema.methods.generateResetToken = function (): void {
  this.resetToken = crypto.randomBytes(20).toString('hex');
  this.resetTokenExpires = moment().add(2, 'hours');
};

userSchema.methods.setPassword = function (password: string): void {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.joinDateAdd = function (): void {
  this.joinDate = moment().format(constants.dateFormat);
};

userSchema.methods.profileUpdated = function (): void {
  this.lastUpdated = moment().format(constants.dateFormat);
};

userSchema.methods.generateJwt = function () {
  const expiry: Date = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      admin: this.admin,
      exp: expiry.getTime() / 1000
    },
    process.env.SKIPGSECRET
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

model('User', userSchema);
