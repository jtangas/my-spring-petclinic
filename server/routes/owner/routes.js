import express from 'express';

import uuid from '../../helpers/uuid';
import Owner from "../../models/owner";
import {hashPassword} from "../../helpers/user";
import User from "../../models/user";

export default () => {
  let router = express.Router();

  router.route("/")
    .get((req, res) => {
      Owner.aggregate([
        {
          $match: {}
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            address: 1,
            city: 1,
            telephone: 1,
            type: 'owners',
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
          message: 'Fetched owners successfully',
          data: result,
          requestId: uuid(),
        });
      });
    })
    .post(async (req, res) => {
      const { firstName, lastName, address, city, telephone } = req.body;

      Owner.find({ firstName, lastName, address, city }, async (err, docs) => {
        if (docs !== null && docs.length > 0) {
          res.json({
            success: false,
            message: 'user already exists',
            requestId: uuid(),
          });
        } else {

          let newOwner = new Owner();
          newOwner.firstName = firstName;
          newOwner.lastName = lastName;
          newOwner.address = address;
          newOwner.city = city;
          newOwner.telephone = telephone;

          newOwner.save(err => {
            if (err)
              res.send(err);

            res.json({
              success: true,
              message: 'owner created',
              requestId: uuid(),
            });
          });
        }
      })
        .catch(err => {
          res.json({
            success: false,
            message: 'database failure',
            error: err,
            requestId: uuid(),
          });
        });
    });
  ;

  return router;
}
