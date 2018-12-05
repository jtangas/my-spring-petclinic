import express from 'express';

import User from '../../models/user';
import uuid from '../../helpers/uuid';

export default () => {
  let router = express.Router();

  router.route("/")
    .get((req, res) => {
      User.aggregate([
        {
          $match: {}
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            username: 1,
            email: 1,
            type: 'users',
          }
        },
        {
          $skip: parseInt((req.query.page-1) * req.query.perPage)
        },
        {
          $limit: parseInt(req.query.perPage),
        }
      ], (err, result) => {
        if (err) {
          res.json({
            success: false,
            message: err.toString(),
            requestId: uuid(),
          });
        }

        res.json({
          success: true,
          message: 'Fetched users successfully',
          data: result,
          requestId: uuid(),
        });
      });
    });

  return router;
}
