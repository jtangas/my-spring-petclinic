import express from 'express';

import Vets from '../../models/vet';
import VetSpecialties from '../../models/vet-specialty';
import uuid from '../../helpers/uuid';

export default () => {
  let router = express.Router();

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

  router.route("/specialties")
    .post(async (req, res) => {
      const { name } = req.body;

      VetSpecialties.find({ name }, async(err, docs) => {
        if (docs !== null && docs.length > 0) {
          res.json({
            success: false,
            message: 'Specialty already exists',
            requestId: uuid(),
          });
        } else {
          let newVetSpecialty = new VetSpecialties();
          newVetSpecialty.name = name;

          newVetSpecialty.save(err => {
            if (err)
              res.send(err);

            res.json({
              success: true,
              message: 'specialty created',
              requestId: uuid(),
            })
          })
        }
      })
        .catch(err => {
          res.json({
            success: false,
            message: 'Database failure',
            error: err.toString(),
            requestId: uuid(),
          });
        });
    })
    .get((req, res) => {
      VetSpecialties.aggregate([
        {
          $match: {},
        },
        {
          $project: {
            _id: 0,
            id: "$$ROOT._id",
            name: 1,
          }
        }
      ], (err, result) => {
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
          message: 'Fetched specialties successfully',
          data: result,
          requestId: uuid(),
        });
      });
    });

  return router;
}
