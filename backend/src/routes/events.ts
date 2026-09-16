import express, { type Request, type Response, type NextFunction, Router } from 'express';
import { events_pool } from '../db/pools';
import { QueryResult } from 'pg';
import { mapEventToResponse, Event, EventResponse } from '../models/event';

const router: Router = express.Router();

router.get('/all/:id', async (req: Request, res: Response) => {
    try {
        const result: QueryResult<Event> = await events_pool.query('SELECT * FROM events WHERE user_id = $1', [req.params.id]);
        console.log('Fetched all events for user')
        res.json({ message: 'Get all events', data: result.rows.map(mapEventToResponse) }); // returns a list of all events recorded by all users
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/update', async (req, res) => {
    const event: EventResponse = req.body;

    try {
        const result: QueryResult<Event> = await events_pool.query(
            'UPDATE events SET event_name = $2, description = $3, event_date = $4, finishing_placement = $5 WHERE id = $1 RETURNING *',
             [event.id, event.event_name, event.description, event.event_date, event.finishing_placement]
        );
        console.log('Event updated')
        res.json({ message: 'Updated event', data: result.rows.map(mapEventToResponse) }); // returns a list of all events recorded by all users
    } catch (error) {
        console.error('Error updating events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;