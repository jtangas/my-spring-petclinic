import express from 'express';

export default () => {
  let router = express.Router();

  router.route("/")
    .get((req, res) => {
      res.json({
        success: true,
        message: 'pet endpoint',
      })
    });

  return router;
}