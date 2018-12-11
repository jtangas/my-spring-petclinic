import express from 'express';

import Pet from '../../models/pet';
import PetType from '../../models/pet-type';
import uuid from '../../helpers/uuid';
import Owner from "../../models/owner";
import mongoose from "mongoose";


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

  router.route("/:id")
    .put((req, res) => {
      const { id } = req.params;
      const {
        name,
        birthDate,
        petType,
        owner,
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

      Pet.findOne({_id: id}, (err, pet) => {
        if (err) {
          res.json({
            success: false,
            message: err.toString(),
            requestId: uuid(),
          });
          return;
        }

        pet.set({
          name,
          birthDate,
          petType: mongoose.Types.ObjectId(petType),
          owner: mongoose.Types.ObjectId(owner),
        });

        pet.save((err, updatedPet) => {
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
            message: 'Updated Pet successfully',
            data: updatedPet,
            requestId: uuid(),
          });
        });
      });
    })
    .get((req, res) => {
      const { id } = req.params;
      const petId = mongoose.Types.ObjectId(id);

      Pet.aggregate([
        {
          $match: {_id: petId},
        },
        {
          $project: {
            _id: 1,
            name: 1,
            birthDate: 1,
            petType: 1,
            owner: 1,
            type: 'pets',
          }
        },
        {
          $lookup: {
            from: 'pettypes',
            localField: 'petType',
            foreignField: '_id',
            as: 'mappedPetType'
          }
        },
        {
          $lookup: {
            from: 'owners',
            localField: 'owner',
            foreignField: '_id',
            as: 'mappedOwner'
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
          message: 'Pet fetched successfully',
          data: result[0],
          requestId: uuid(),
        });
      });
    });

  return router;
}
