import express from 'express';

import User from '../models/user';
import uuid from '../helpers/uuid';

export default () => {
  let router = express.Router();

  router.route("/")
    .get((req, res) => {
      res.json({
        success: false,
        message: 'nothing to load',
        requestId: uuid(),
      })
    });

  return router;
}
