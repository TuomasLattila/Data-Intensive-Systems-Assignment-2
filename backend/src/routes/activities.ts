import express, { type Request, type Response, type NextFunction, Router } from 'express';
import { activities_pool } from '../db/pools';
import { QueryResult } from 'pg';
import { Activity, mapActivityToResponse } from '../models/activity';

const router: Router = express.Router();

router.get('/all/:id', async (req: Request, res: Response) => {
    try {
        const result: QueryResult<Activity> = await activities_pool.query('SELECT * FROM activities WHERE user_id = $1', [req.params.id]);
        res.json({ message: 'Get all activities', data: result.rows.map(mapActivityToResponse) }); // returns a list of all activities recorded by all users
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;