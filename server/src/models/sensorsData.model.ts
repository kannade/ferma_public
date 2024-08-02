import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import lb_levels from "./levels.model";
import lb_devices from "./devices.model";

class lb_sensors_data extends Model<
  InferAttributes<lb_sensors_data>,
  InferCreationAttributes<lb_sensors_data>
> {
  declare id: CreationOptional<number>;
  declare ferma_id: ForeignKey<lb_levels["level_id"]>;
  declare device_id: ForeignKey<lb_devices["device_id"]>;
  declare subty: number;
  declare value: number;
  declare created?: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        ferma_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        device_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        subty: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        value: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        created: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: false,
        tableName: "lb_sensors_data",
      }
    );
  }
}
export default lb_sensors_data;
