import express from 'express';
import mongoose from 'mongoose';

import uuid from '../../helpers/uuid';
import Owner from "../../models/owner";

export default () => {
  let router = express.Router();

  router.route("/:id")
    .put((req, res) => {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        address,
        city,
        telephone,
      } = req.body;

      const {
        _id,
      } = req.body;

      if (id !== _id) {
        res.json({
          success: false,
          message: 'Malformed Request',
          requestId: uuid(),
        });
        return;
      }

      Owner.findOne({_id: id}, (err, owner) => {
        if (err) {
          res.json({
            success: false,
            message: err.toString(),
            requestId: uuid(),
          });
          return;
        }

        owner.set({
          firstName,
          lastName,
          address,
          city,
          telephone,
        });

        owner.save((err, updatedOwner) => {
          if (err) {
            res.json({
              success: false,
              message: err.toString(),
              requestId: uuid(),
            });
            return;
          }

          res.json({
            success: true,
            message: 'Updated Owner successfully',
            data: updatedOwner,
            requestId: uuid(),
          });
        });
      });
    })
    .get((req, res) => {
      const { id } = req.params;
      const userId = mongoose.Types.ObjectId(id);

      Owner.aggregate([
        {
          $match: {_id: userId},
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
        }], (err, result) => {

        if (err) {
          res.json({
            success: false,
            message: err.toString(),
            requestId: uuid(),
          });
          return;
        }

        res.json({
          success: true,
          message: 'user fetched successfully',
          data: result[0],
          requestId: uuid(),
        });
      });
    });

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
