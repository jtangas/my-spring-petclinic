import express from 'express';

import Appointment from '../../models/appointment';
import uuid from "../../helpers/uuid";

export default () => {
  let router = express.Router();

  router.route("/")
    .post(async (req, res) => {
      const { owner, pet, vet, datetime } = req.body;
      Appointment.find({
        $or: [
          {owner, pet, vet, datetime},
          {vet, datetime},
        ]
      }, async (err, appts) => {
        if (appts !== null && appts.length > 0) {
          res.json({
            success: false,
            message: 'An appointment has already been made for that time',
            requestId: uuid(),
          })
        } else {
          let newAppt = new Appointment();
          newAppt.set({
            owner, pet, vet, datetime
          });

          newAppt.save(err => {
            if (err)
              res.send(err);

            res.json({
              success: true,
              message: 'Appointment Scheduled',
              data: newAppt,
              requestId: uuid(),
            });
          });
        }
      });
    })
    .get((req, res) => {
      Appointment.aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: "owners",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
          }
        },
        {
          $lookup: {
            from: "vets",
            localField: "vet",
            foreignField: "_id",
            as: "vet",
          }
        },
        {
          $lookup: {
            from: "pets",
            localField: "pet",
            foreignField: "_id",
            as: "pet",
          }
        }
      ], (err, appts) => {
        if (err) {
          res.json({
            success: false,
            message: err.toString(),
            requestId: uuid(),
          });
        } else {
          res.json({
            success: true,
            message: 'Appointments found',
            data: appts,
            requestId: uuid(),
          });
        }
      });
    });

  return router;
}