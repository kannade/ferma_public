import { Request, Response, NextFunction } from 'express';

export const ErrorMiddleware = (
    err: string, req: Request, res: Response, next: NextFunction
) => {
    console.log(`[ERR] ${err}`);

    return res.status(500).json({ message: 'Упс! Ошибка!' });
};
