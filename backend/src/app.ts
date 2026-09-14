import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import './env';

// Routes:
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';
import eventsRouter from './routes/events';

const app: Express = express();
const PORT: number = process.env.PORT as unknown as number || 3000;

if (process.env.NODE_ENV === "development") {
  console.log("App starting in ${process.env.NODE_ENV} environment")
  app.use(cors({ origin: 'http://localhost:5000' })) // development frontend origin
}

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/events', eventsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

export default app;