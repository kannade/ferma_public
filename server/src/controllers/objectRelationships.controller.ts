import { Request, Response, NextFunction } from 'express';
import objectRelationshipsService from '../services/objectRelationships.service';

class ObjectRelationshipsController {
    async getAllObjects(req: Request, res: Response, next: NextFunction) {
        const rels = await objectRelationshipsService.getAllRelationshipsObjects();

        res.json(rels);
    }
}

export default new ObjectRelationshipsController();
