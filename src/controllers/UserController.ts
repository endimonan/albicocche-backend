import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await userService.register(email, password);
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    static async verifyEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email, code } = req.body;
            await userService.verifyEmail(email, code);
            res.status(200).json({ message: 'Email verified successfully' });
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
}
