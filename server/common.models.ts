import { MongooseDocument, Mongoose } from 'mongoose';

export interface IExpError extends Error {
  status?: number;
}

export interface IUserMethods {
  generateResetToken: () => void;
  setPassword: (string) => void;
  validPassword: (string) => boolean;
  joinDateAdd: () => void;
  profileUpdated: () => void;
  generateJwt: () => any;
}

export interface IUser {
  Document: any;
  email: string;
  firstName: string;
  active: boolean;
  lastName?: string;
  admin: boolean;
  hash: string;
  salt: string;
  joinDate: string;
  lastUpdated: string;
  resetToken: string;
  resetTokenExpires: string;
  generateResetToken: () => void;
  setPassword: (string) => void;
  validPassword: (string) => boolean;
  joinDateAdd: () => void;
  profileUpdated: () => void;
  generateJwt: () => any;
  save?: (any) => void;
  remove?: (any) => void;
}
