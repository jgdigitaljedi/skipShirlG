import mongoose from 'mongoose';
import { IUser } from '../common.models';
import logger from '../util/logger';
const User = mongoose.model('User');

function unarthorizedResponse(res) {
  res.status(401).json({
    error: true,
    message: 'UnauthorizedError: private profile'
  });
}

/**
 * GET /profile
 * Gets user profile
 * @param {*} req
 * @param {*} res
 */
export const profileRead = function (req, res): void {
  if (!req.payload._id) {
    unarthorizedResponse(res);
  } else {
    User.findById(req.payload._id).exec((err: string, user: IUser) => {
      if (err) {
        logger.logThis(err, req);
        res.status(500).json({ error: err, message: 'ERROR: Error fetching user profile.' });
      } else {
        res.status(200).json({
          error: false,
          firstName: user.firstName,
          lastName: user.lastName,
          joinDate: user.joinDate,
          lastUpdated: user.lastUpdated,
          email: user.email,
          admin: user.admin
        });
      }
    });
  }
};

/**
 * PATCH /profile
 * Edits user profile
 * req.body.name?, req.body.email?
 * @param {*} req
 * @param {*} res
 */
export const profileUpdate = function (req, res) {
  // res.status(200).json({ request: req.body, payload: req.payload });
  if (!req.payload._id) {
    unarthorizedResponse(res);
  } else {
    User.findOneAndUpdate(
      { _id: req.payload._id },
      { $set: req.body },
      { runValidators: true, new: true },
      // @ts-ignore
      (err, result: IUser): void => {
        if (err) {
          logger.logThis(err, req);
          res.status(500).json({ error: err, message: 'ERROR: Error updating user data.' });
        } else {
          result.profileUpdated();
          res.status(200).json({
            error: false,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            admin: result.admin,
            joinDate: result.joinDate,
            lastUpdated: result.lastUpdated
          });
        }
      }
    );
  }
};
