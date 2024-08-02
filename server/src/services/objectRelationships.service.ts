import ObjectRelationships from '../models/objectRelationships.model';

class ObjectRelationshipsService {
    async getAllRelationshipsObjects() {
        const objects = ObjectRelationships.findAll({
            order: [['postId', 'ASC']],
        });

        return objects;
    }
}

export default new ObjectRelationshipsService();
