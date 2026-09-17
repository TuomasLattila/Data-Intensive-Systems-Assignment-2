import express, { type Request, type Response, type NextFunction, Router } from 'express';
import { users_pool } from '../db/pools';
import { QueryResult } from 'pg';
import { User, UserResponse, UserWeightDevelopment, UserWeightDevelopmentResponse, mapAllUserResponses } from '../models/user';

const router: Router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
    try {
        const result_users: QueryResult<User> = await users_pool.query('SELECT * FROM users');
        const result_weights: QueryResult<UserWeightDevelopment> = await users_pool.query('SELECT * FROM user_weight_development');
        const users: UserResponse[] = mapAllUserResponses(result_users.rows, result_weights.rows) // returns list of users which include user info and user's recorded weights as list
        console.log("Fetched all users' data")
        res.json({ message: 'Get all users', data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add/weight/:user_id', async (req: Request, res: Response) => {
    const body = req.body
    try {
        const result: QueryResult<UserWeightDevelopment> = await users_pool.query('INSERT INTO user_weight_development (user_id, weight_kg) VALUES ($1, $2) RETURNING *', [req.params.user_id, body.weight_kg])
        if (!result.rows[0]) {throw new Error('No row returned from sql query')}
        console.log('Weight added')
        const resp: UserWeightDevelopmentResponse = { weight_kg: result.rows[0]?.weight_kg, created_at: result.rows[0]?.created_at}
        res.json({ message: 'Get all users', data: resp });
    } catch (error) {
        console.error('Error adding user weight:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;