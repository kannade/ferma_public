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
import lb_rule_periods from "./rulePeriods.model";
import lb_rule_references from "./ruleReferences.model";

class lb_rules extends Model<
  InferAttributes<lb_rules>,
  InferCreationAttributes<lb_rules>
> {
  declare rule_id: CreationOptional<number>;
  declare level_id: ForeignKey<lb_levels["level_id"]>;
  declare device_id: number;
  declare rule_type: number;
  declare power: number;
  declare smoothEnd?: CreationOptional<number>;
  declare smoothStart?: CreationOptional<number>;
  declare runAfter?: CreationOptional<Date>;
  declare runBefore?: CreationOptional<Date>;
  declare tgNotify: boolean;
  declare power_start?: CreationOptional<number>;
  declare power_end?: CreationOptional<number>;
  declare status?: CreationOptional<number>;

  declare periods?: NonAttribute<lb_rule_periods[]>;
  declare references?: NonAttribute<lb_rule_references[]>;

  declare static associations: {
    periods: Association<lb_levels, lb_rule_periods>;
    references: Association<lb_levels, lb_rule_references>;
  };

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        rule_id: {
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
        device_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        rule_type: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        power: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        smoothEnd: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        smoothStart: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        runAfter: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        runBefore: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        tgNotify: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        power_start: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        power_end: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        status: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        tableName: "lb_rules",
      }
    );
  }
}
export default lb_rules;
