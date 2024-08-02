import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ObjectRelationshipsAttributes {
    postId: number;
    objectId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ObjectsInput extends Optional<ObjectRelationshipsAttributes, 'postId'> { }

export interface ObjectsOutput extends Required<ObjectRelationshipsAttributes> { }

class object_relationships extends Model<ObjectRelationshipsAttributes, ObjectsInput> implements ObjectRelationshipsAttributes {
    public postId!: number;
    public objectId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            postId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            objectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        }, {
            sequelize,
            paranoid: true,
            timestamps: false,
        });
    }
}

export default object_relationships;
