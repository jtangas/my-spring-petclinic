import express from 'express';

import Vets from '../../models/vet';
import uuid from '../../helpers/uuid';

export default () => {
  let router = express.Router();

  router.route("/")
    .get((req, res) => {
      Vets.aggregate([
        {
          $match: {}
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            specialties: 1,
            type: 'vets',
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
          message: 'Fetched vets successfully',
          data: result,
          requestId: uuid(),
        });
      });
    });

  return router;
}