import express, { type Request, type Response, type NextFunction, Router } from 'express';
import { activities_pool } from '../db/pools';
import { QueryResult } from 'pg';

const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
    // Get all activities from the activities DB and return them as a JSON response

    try {
        const result: QueryResult<any> = await activities_pool.query('SELECT * FROM activities');
        res.json({ message: 'Get all activities', data: result.rows });
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;