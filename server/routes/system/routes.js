import express from 'express';
import VetSpecialties from '../../models/vet-specialty';
import uuid from '../../helpers/uuid';

export default () => {
  let router = express.Router();

  router.route("/vet-specialties")
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
