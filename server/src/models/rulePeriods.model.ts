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

class lb_rule_periods extends Model<
  InferAttributes<lb_rule_periods>,
  InferCreationAttributes<lb_rule_periods>
> {
  declare period_id: CreationOptional<number>;
  declare rule_id: ForeignKey<lb_rules["rule_id"]>;
  declare start?: CreationOptional<number>;
  declare end?: CreationOptional<number>;
  declare every?: CreationOptional<number>;
  declare every_duration?: CreationOptional<number>;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        period_id: {
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
        start: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        end: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        every: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        every_duration: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        tableName: "lb_rule_periods",
      }
    );
  }
}
export default lb_rule_periods;
