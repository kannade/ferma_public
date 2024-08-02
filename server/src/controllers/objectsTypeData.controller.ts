import { Request, Response, NextFunction } from 'express';
import objectTypeDataService from '../services/objectTypeData.service';

class ObjectTypeDataController {
    async getAllObjects(req: Request, res: Response, next: NextFunction) {
        const users = await objectTypeDataService.getAllRelationshipsObjects();

        res.json(users);
    }
}

export default new ObjectTypeDataController();
