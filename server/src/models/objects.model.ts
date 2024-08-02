import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ObjectAttributes {
    objectId: number;
    title: string;
    description: string;
    objectType: number;
    count: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ObjectsInput extends Optional<ObjectAttributes, 'objectId'> { }

export interface ObjectsOutput extends Required<ObjectAttributes> { }

class objects extends Model<ObjectAttributes, ObjectsInput> implements ObjectAttributes {
    public objectId!: number;
    public title!: string;
    public description!: string;
    public objectType!: number;
    public count!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            objectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            objectType: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            count: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
        }, {
            sequelize,
            paranoid: true,
            timestamps: false,
        });
    }
}

export default objects;
