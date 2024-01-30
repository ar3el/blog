import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service';

class UserController {
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getAllUsers();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();