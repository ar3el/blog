import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors';

export default function(error: ApiError | Error, req: Request, res: Response, next: NextFunction) {
    console.log(error);

    if (error instanceof ApiError) {
        return res.status(error.status).json({message: error.message, errors: error.errors});
    }

    return res.status(500).json({ message: 'Internal Server Error' });
}