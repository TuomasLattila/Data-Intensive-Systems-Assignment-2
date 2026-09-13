import express, { type Request, type Response, type NextFunction, Router } from 'express';
import { users_pool } from '../db/pools';
import { QueryResult } from 'pg';
import { User, UserResponse, UserWeightDevelopment, mapAllUserResponses } from '../models/user';

const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
    try {
        const result_users: QueryResult<User> = await users_pool.query('SELECT * FROM users');
        const result_weights: QueryResult<UserWeightDevelopment> = await users_pool.query('SELECT * FROM user_weight_development');
        const users: UserResponse[] = mapAllUserResponses(result_users.rows, result_weights.rows) // returns list of users which include user info and user's recorded weights as list
        
        res.json({ message: 'Get all users', data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;