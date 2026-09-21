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

router.get('/weights/:user_id', async (req: Request, res: Response) => {
    try {
        const result_weights: QueryResult<UserWeightDevelopment> = await users_pool.query('SELECT * FROM user_weight_development WHERE user_id = $1', [req.params.user_id]);
        const weights: UserWeightDevelopmentResponse[] = result_weights.rows.map((weightRow) => ({
            weight_kg: weightRow.weight_kg,
            created_at: weightRow.created_at
        }))
        console.log("Fetched all user's weights")
        res.json({ message: "Get all user's weights", data: weights });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/add/weight/:user_id', async (req: Request, res: Response) => {
    const body = req.body
    try {
        const result: QueryResult<UserWeightDevelopment> = await users_pool.query(
            `INSERT INTO user_weight_development (user_id, weight_kg, created_at) VALUES ($1, $2, $3) 
            ON CONFLICT (user_id, created_at) DO UPDATE SET weight_kg = EXCLUDED.weight_kg
            RETURNING *`, [req.params.user_id, body.weight_kg, body.created_at]
        );
        if (result.rows[0]?.weight_kg === undefined || result.rows[0]?.created_at === undefined) {throw new Error('Error saving new weight')}
        console.log('Weight saved')
        const resp: UserWeightDevelopmentResponse = { weight_kg: result.rows[0]?.weight_kg, created_at: result.rows[0]?.created_at}
        res.json({ message: 'Get all users', data: resp });
    } catch (error) {
        console.error('Error adding user weight:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;