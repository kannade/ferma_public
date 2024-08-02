import { Request, Response, NextFunction } from 'express';
import objectService from '../services/object.service';

class ObjectController {
    async getAllObjects(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await objectService.getAllObjects();
            res.json(users);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }
}

export default new ObjectController();
