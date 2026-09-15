import express, { type Request, type Response, type NextFunction, Router } from 'express';
import { events_pool } from '../db/pools';
import { QueryResult } from 'pg';
import { mapEventToResponse, Event } from '../models/event';

const router: Router = express.Router();

router.get('/all/:id', async (req: Request, res: Response) => {
    try {
        const result: QueryResult<Event> = await events_pool.query('SELECT * FROM events WHERE user_id = $1', [req.params.id]);
        res.json({ message: 'Get all events', data: result.rows.map(mapEventToResponse) }); // returns a list of all events recorded by all users
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;