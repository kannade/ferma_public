import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import lb_levels from "./levels.model";
import lb_sensors_data from "./sensorsData.model";

class lb_devices extends Model<
  InferAttributes<lb_devices>,
  InferCreationAttributes<lb_devices>
> {
  declare device_id: CreationOptional<number>;
  declare level_id: ForeignKey<lb_levels["level_id"]>;
  declare pin: number;
  declare type: number;
  declare name: string;
  declare from?: CreationOptional<number>;
  declare to?: CreationOptional<number>;
  declare addr?: CreationOptional<string>;
  declare tgNotify: boolean;

  declare sensorsData?: NonAttribute<lb_sensors_data[]>;

  declare static associations: {
    sensorsData: Association<lb_devices, lb_sensors_data>;
  };

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        device_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        level_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        pin: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        type: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        from: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        to: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        addr: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        tgNotify: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        tableName: "lb_devices",
      }
    );
  }
}
export default lb_devices;
