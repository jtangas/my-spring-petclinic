import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';
import { hashPassword } from '../helpers/user';
import uuid from '../helpers/uuid';

export default () => {
  let router = express.Router();

  router.route('/login')
    .post(async (req, res) => {
      const { username, password } = req.body;
      try {
        User.findOne({ email: username }, async (err, user) => {
          if (user === undefined || user === null) {
            res.json({
              success: false,
              message: 'Invalid username or password',
              requestId: uuid(),
            });
            return
          }

          bcrypt.compare(password, user.password).then(match => {
            if (match) {
              const responseObj = {
                success: true,
                message: 'user successfully authenticated',
                user: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  username: user.username,
                  email: user.email,
                  id: user._id,
                },
                requestId: uuid(),
              };

              console.log(responseObj);

              res.json(responseObj);
            } else {
              res.json({
                success: false,
                message: 'invalid username or password',
                requestId: uuid(),
              });
            }
          });
        });
      } catch (err) {
        res.json({
          success: false,
          message: 'An error has occurred',
          requestId: uuid(),
        });
      }
    });

  router.route('/register')
    .post(async function(req, res) {
      const { username, firstName, lastName, password, email } = req.body;

      User.find({ username: username }, async function(err, docs) {
        if (docs !== null && docs.length > 0) {
          res.json({
            success: false,
            message: 'user already exists',
            requestId: uuid(),
          });
        } else {
          let pwHash = await hashPassword(password);

          let newUser = new User();
          newUser.firstName = firstName;
          newUser.lastName = lastName;
          newUser.password = pwHash;
          newUser.email = email;
          newUser.username = username;

          newUser.save(err => {
            if (err)
              res.send(err);

            res.json({
              success: true,
              message: 'user created',
              requestId: uuid(),
            });
          });
        }
      });
    });

  return router;
}
