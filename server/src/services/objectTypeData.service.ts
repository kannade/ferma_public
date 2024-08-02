import ObjectTypeData from '../models/objectTypeData.model';

class ObjectTypeDataService {
    async getAllRelationshipsObjects() {
        const objects = ObjectTypeData.findAll({
            order: [['objectType', 'ASC']],
        });

        return objects;
    }
}

export default new ObjectTypeDataService();
