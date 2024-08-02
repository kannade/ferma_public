import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import lb_rules from "./rules.model";

class lb_rule_references extends Model<
  InferAttributes<lb_rule_references>,
  InferCreationAttributes<lb_rule_references>
> {
  declare reference_id: CreationOptional<number>;
  declare rule_id: ForeignKey<lb_rules["rule_id"]>;
  declare device_id: number;
  declare level_id: number;
  declare from?: number;
  declare to?: number;
  declare type: number;
  declare variable?: CreationOptional<number>;
  declare min_work_time?: number;
  declare block?: number;
  declare max_work_time?: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        reference_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        rule_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        device_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        level_id: {
          type: DataTypes.INTEGER,
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
        type: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        variable: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        min_work_time: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        block: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        max_work_time: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        tableName: "lb_rule_references",
      }
    );
  }
}
export default lb_rule_references;
