import express, { type Request, type Response, type NextFunction, Router } from 'express';
const router: Router = express.Router();

router.get('/all', (req: Request, res: Response) => {
    // Get all users from the users DB and return them as a JSON response
    res.json({ message: 'Get all users' });
});

export default router;