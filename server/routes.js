import express from 'express';
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import moment from 'moment';
import User from "./models/user";
import {hashPassword} from "./helpers/user";

export default () => {
  let router = express.Router();

  router.use((req, res, next) => {
    console.log({
      message: "API_REQUESTED",
      path: req.originalUrl,
    });
    next();
  });

  return router;
};
