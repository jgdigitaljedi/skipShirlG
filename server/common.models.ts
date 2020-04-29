import express from 'express';

export interface IExpError extends Error {
  status?: number;
}

export interface IUserMethods {
  generateResetToken: () => void;
  setPassword: (arg0: string) => void;
  validPassword: (arg0: string) => boolean;
  joinDateAdd: () => void;
  profileUpdated: () => void;
  generateJwt: () => any;
}

export interface IUser {
  Document?: any;
  _id?: string;
  name?: string;
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
  setPassword: (arg0: string) => void;
  validPassword: (arg0: string) => boolean;
  joinDateAdd: () => void;
  profileUpdated: () => void;
  generateJwt: () => any;
  save?: (arg0: any) => void;
  remove?: (arg0: any) => void;
}

export interface IUserRequest extends express.Request {
  payload?: {
    admin: boolean;
    _id?: string;
  };
  body: {
    _id?: number;
    active?: boolean;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    newpass?: string;
  };
  method: string;
  ip: string;
  originalUrl: string;
}
