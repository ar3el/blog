import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AuthService } from '../service';
import { ApiError } from '../errors';

class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.ValidationError(errors.array())
            }

            const { name, password } = req.body;
            const newUser = await AuthService.registration(name, password);
            const { refreshToken, ...otherUser } = newUser;
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30*24*60*60*1000 });
            return res.json(otherUser);
        } catch (error) {
            next(error);
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.ValidationError(errors.array())
            }

            const { name, password } = req.body;
            const newUser = await AuthService.signin(name, password);
            const { refreshToken, ...otherUser } = newUser;
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30*24*60*60*1000 });
            return res.json(otherUser);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken: string | undefined = req.cookies.refreshToken;
            const newUser = await AuthService.refresh(refreshToken);
            const { refreshToken: newRefreshToken, ...otherUser } = newUser;
            res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 30*24*60*60*1000 });
            return res.json(otherUser);
        } catch (error) {
            next(error);
        }
    }

    async signout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken: string | undefined = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(200).send({ message: true });
            }

            await AuthService.signout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).send({ message: true });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();