import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors';
import { TokenService } from '../service';

export default function(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return next(ApiError.UnauthorizedError());
        }

        const [, accessToken] = /Bearer (.*)/.exec(authorization) || [null, null];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userPayload = TokenService.validateAccessToken(accessToken);
        if (!userPayload) {
            return next(ApiError.UnauthorizedError());
        }

        (req as any).user = { name: userPayload.name, id: userPayload.name };
        next();
    } catch (error) {
        next(ApiError.UnauthorizedError())
    }
}