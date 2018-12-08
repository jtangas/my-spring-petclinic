import express from 'express';

export default () => {
  let router = express.Router();

  router.route("/")
    .post(async (req, res) => {
      res.json({
        success: true,
        message: 'Posted Pet',
      })
    })
    .get((req, res) => {
      res.json({
        success: true,
        message: 'pet endpoint',
      })
    });

  return router;
}