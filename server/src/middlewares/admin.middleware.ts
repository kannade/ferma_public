import { Request, Response, NextFunction } from 'express';
import User, { UserRoles } from '../models/users.model';

interface IUser {
    userId: number;
}

export const AdminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const user = req.user as IUser;
    // const userFromDb = await User.findAll({
    //     where: {
    //         id: user.userId,
    //     },
    // });
    // if (userFromDb[0].userStatus === UserRoles.ADMIN) {
    //     next();
    // } else {
    //     res.status(400).json({ message: 'Вы не обладаете достаточными правами!' });
    // }
};
