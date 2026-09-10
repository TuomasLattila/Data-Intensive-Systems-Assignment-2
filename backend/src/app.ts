import express, { type Express, type Request, type Response } from 'express';


// Routes:
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';
import eventsRouter from './routes/events';

const app: Express = express();
const port = 3000;

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/events', eventsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});