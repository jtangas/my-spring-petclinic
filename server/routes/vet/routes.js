import express from 'express';
import mongoose from 'mongoose';

import Vets from '../../models/vet';
import uuid from '../../helpers/uuid';

export default () => {
  let router = express.Router();

  router.route("/:id")
    .put((req, res) => {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        specialties,
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

      Vets.findOne({_id: id}, (err, vet) => {
        if (err) {
          res.json({
            success: false,
            message: err.toString(),
            requestId: uuid(),
          });
          return;
        }

        vet.set({
          firstName,
          lastName,
          specialties,
        });

        vet.save((err, updatedVet) => {
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
            message: 'Updated vet successfully',
            data: updatedVet,
            requestId: uuid(),
          });
        });
      });
    })
    .get((req, res) => {
      const { id } = req.params;
      const userId = mongoose.Types.ObjectId(id);

      Vets.aggregate([
        {
          $match: {_id: userId},
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            specialties: 1,
            type: 'vets',
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
        })
      })
    });

  router.route("/")
    .post(async (req, res) => {
      const { firstName, lastName, specialties } = req.body;
      Vets.find({ firstName, lastName }, async (err, results) => {
        if (results !== null && results.length > 0) {
          res.json({
            success: false,
            message: 'A vet already exists with that name',
            requestId: uuid(),
          });
        } else {

          const newVet = new Vets();
          newVet.firstName = firstName;
          newVet.lastName = lastName;
          newVet.specialties = specialties;

          newVet.save(err => {
            if (err)
              res.send(err)

            res.json({
              success: true,
              message: 'succesfully saved vet',
              requestId: uuid(),
              data: [newVet],
            });
          });
        }
      });
    })
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
