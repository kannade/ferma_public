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
import lb_ferms from "./ferms.model";
import lb_rules from "./rules.model";
import lb_devices from "./devices.model";

class lb_levels extends Model<
  InferAttributes<lb_levels, { omit: "devices" }>,
  InferCreationAttributes<lb_levels, { omit: "devices" }>
> {
  declare level_id: CreationOptional<number>;
  declare ferma_id: ForeignKey<lb_ferms["ferma_id"]>;
  declare tgNotify: boolean;
  declare level_num: number;
  declare level_name?: CreationOptional<string>;

  declare rules?: NonAttribute<lb_rules[]>;
  declare devices?: NonAttribute<lb_devices[]>;

  declare static associations: {
    rules: Association<lb_levels, lb_rules>;
    devices: Association<lb_levels, lb_devices>;
  };

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        level_id: {
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
        tgNotify: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        level_num: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        level_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        modelName: "lb_levels",
      }
    );
  }
}
export default lb_levels;
