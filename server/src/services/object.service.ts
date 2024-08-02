import Object from '../models/objects.model';

class ObjectService {
    async getAllObjects() {
        const objects = Object.findAll({
            order: [['objectId', 'ASC']],
            attributes: ['objectId', 'title', 'description', 'objectType', 'count'],
        });

        return objects;
    }
}

export default new ObjectService();
