import express, { type Request, type Response, type NextFunction } from 'express';
const router = express.Router();

router.get('/all', (req: Request, res: Response) => {
    // Get all activities from the activities DB and return them as a JSON response
    res.json({ message: 'Get all activities' });
});

export default router;