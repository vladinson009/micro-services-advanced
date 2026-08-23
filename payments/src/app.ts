import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@tickets-vg/common';
import { createChargeRouter } from './routes/new';

export const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false, // Disable encryption
    secure: process.env.NODE_ENV !== 'test',
  }),
);
app.use(currentUser);
app.use(createChargeRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError(); // Works because of express-async-errors package
  // next(new NotFoundError());
});
app.use(errorHandler);
//! --omit=dev instead of --only=prod
