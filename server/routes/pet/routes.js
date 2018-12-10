import express from 'express';

import Pet from '../../models/pet';
import uuid from '../../helpers/uuid';


export default () => {
  let router = express.Router();

  router.route("/")
    .post(async (req, res) => {
      const {
        name,
        birthDate,
        type,
        owner,
      } = req.body;

      Pet.find({
        owner,
        name,
        birthDate,
        type,
      }, async(err, pets) => {
        if (pets !== null && pets.length > 0) {
          res.json({
            success: false,
            message: 'Owner has already added that pet',
            requestId: uuid(),
          });
        } else {
          let newPet = new Pet();
          newPet.set({
            owner,
            birthDate,
            name,
            type,
          });

          newPet.save(err => {
            if (err)
              res.send(err);

            res.json({
              success: true,
              message: 'Pet Added Successfully',
              requestId: uuid(),
            });
          });
        }
      });
    })
    .get((req, res) => {
      const pipeline = [];
      pipeline.push({$match: {}});
      pipeline.push({
        $project: {
          _id: 1,
          name: 1,
          birthDate: 1,
          petType: 1,
          owner: 1,
          type: 'pets',
        }
      });
      Pet.aggregate(pipeline, (err, pets) => {
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
          message: 'pets successfully retrieved',
          data: pets,
          requestId: uuid(),
        })
      })
    });

  return router;
}
