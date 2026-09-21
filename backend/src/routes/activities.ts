import express, { type Request, type Response, type NextFunction, Router } from 'express';
import { activities_pool } from '../db/pools';
import { QueryResult } from 'pg';
import { Activity, ActivityResponse, mapActivityToResponse } from '../models/activity';

const router: Router = express.Router();

router.get('/all/:id', async (req: Request, res: Response) => {
    try {
        const result: QueryResult<Activity> = await activities_pool.query('SELECT * FROM activities WHERE user_id = $1', [req.params.id]);
        res.json({ message: 'Get all activities', data: result.rows.map(mapActivityToResponse) }); // returns a list of all activities recorded by all users
        console.log('Fetched all activities for user')
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/update', async (req: Request, res: Response) => {
    const event: ActivityResponse = req.body;

    try {
        const result: QueryResult<Activity> = await activities_pool.query(
            'UPDATE activities SET activity_type = $2, duration_minutes = $3, activity_date = $4, calories_burned = $5 WHERE id = $1 RETURNING *',
             [event.id, event.activity_type, event.duration_minutes, event.activity_date, event.calories_burned]
        );
        console.log('Activity updated')
        res.json({ message: 'Updated activity', data: result.rows.map(mapActivityToResponse) }); // returns the updated row
    } catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        await activities_pool.query('DELETE FROM activities WHERE id = $1', [req.params.id])
        console.log('Activity deleted')
        res.json({ message: 'Updated activity' }); // send message for succesful deletion
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export default router;