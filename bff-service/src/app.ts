import express from 'express';
import cors from 'cors';

import { groupRouter, loginRouter, userRouter } from './routers';
import { errorLoggerMiddleware, requestLoggerMiddleware } from './middlewares';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLoggerMiddleware);
app.use(errorLoggerMiddleware);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/login', loginRouter);

export { app };
