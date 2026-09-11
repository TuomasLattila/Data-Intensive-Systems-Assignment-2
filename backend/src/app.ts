import express, { type Express, type Request, type Response } from 'express';
import dotenv from 'dotenv';


dotenv.config();


// Routes:
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';
import eventsRouter from './routes/events';

const app: Express = express();

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/events', eventsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});