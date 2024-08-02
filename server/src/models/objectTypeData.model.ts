import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ObjectTypeDataAttributes {
    objectType: number;
    objectName: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ObjectsInput extends Optional<ObjectTypeDataAttributes, 'objectType'> { }

export interface ObjectsOutput extends Required<ObjectTypeDataAttributes> { }

class object_type_data extends Model<ObjectTypeDataAttributes, ObjectsInput> implements ObjectTypeDataAttributes {
    public objectType!: number;
    public objectName!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            objectType: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            objectName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            paranoid: true,
            timestamps: false,
        });
    }
}

export default object_type_data;
