import express from 'express';

import uuid from '../../helpers/uuid';

export default () => {
  let router = express.Router();

  router.route("/")
    .get((req, res) => {
      res.json({
        success: true,
        message: 'owner endpoint',
        params: req.query,
      })
    })
    .post((req, res) => {

    })
  ;

  return router;
}