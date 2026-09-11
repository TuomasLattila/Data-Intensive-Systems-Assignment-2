import express, { type Express, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import pgPromise, { type IDatabase } from 'pg-promise';

dotenv.config();
const pgp = pgPromise({});

// Routes:
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';
import eventsRouter from './routes/events';

const app: Express = express();
const PORT: number = process.env.PORT as unknown as number || 3000; 


const users_db: IDatabase<{}> = pgp(process.env.USERS_DB_URL as string);
const activities_db: IDatabase<{}> = pgp(process.env.ACTIVITIES_DB_URL as string);
const events_db: IDatabase<{}> = pgp(process.env.EVENTS_DB_URL as string);

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/events', eventsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});