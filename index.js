import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import ip from 'ip';
import compression from 'compression';

import routes from './server/routes';
import authRoutes from './server/routes/auth/routes';
import userRoutes from './server/routes/user/routes';
import vetRoutes from './server/routes/vet/routes';
import petRoutes from './server/routes/pet/routes';
import ownerRoutes from './server/routes/owner/routes';
import visitRoutes from './server/routes/visit/routes';
import systemRoutes from './server/routes/system/routes';
import appointmentRoutes from './server/routes/appointment/routes';
import devServer from './server/middleware/devServer';
import renderTemplate from './templates/index-page';

dotenv.config();

const {NODE_ENV, PORT, MONGODB_HOST, MONGODB_PASS, MONGODB_USER} = process.env;
let app = express();
let port = PORT || 5000;
let router = routes();
let authRouter = authRoutes();
let userRouter = userRoutes();
let vetRouter = vetRoutes();
let ownerRouter = ownerRoutes();
let visitRouter = visitRoutes();
let appointmentRouter = appointmentRoutes();
let petRouter = petRoutes();
let systemRouter = systemRoutes();

mongoose.connect(MONGODB_HOST, {
  useNewUrlParser: true,
  user: MONGODB_USER,
  pass: MONGODB_PASS,
}).then(() => {
  app.use(compression());
  app.use('/static', express.static('public/assets'));

  if (NODE_ENV === 'development') {
    devServer(app);
  }

  router.use((req, res, next) => {
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/api', router);
  app.use('/api/system', systemRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/vets', vetRouter);
  app.use('/api/pets', petRouter);
  app.use('/api/owners', ownerRouter);
  app.use('/api/visits', visitRouter);
  app.use('/api/appointments', appointmentRouter);

  app.get('*', (req, res) => {
    if (NODE_ENV === 'development') {
      renderTemplate('main.js');
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
  });

  app.listen(port, '0.0.0.0', err => {
    if (err) console.log(err);

    console.log('LAN: ' + ip.address());
    console.log('PORT: ' + port);
  });
}).catch(err => console.warn('Error: Unable to connect'));
