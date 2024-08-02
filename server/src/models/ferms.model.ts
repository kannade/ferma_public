import {
  DataTypes,
  Model,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  Association,
  HasManyGetAssociationsMixin,
} from "sequelize";
import lb_ferm_settings from "./fermSettings.model";
import lb_levels from "./levels.model";

class lb_ferms extends Model<
  InferAttributes<lb_ferms, { omit: "system" }>,
  InferCreationAttributes<lb_ferms, { omit: "system" }>
> {
  declare ferma_id?: CreationOptional<number>;
  declare user_id: number;
  declare last_update: Date;
  declare last_request: Date | null;
  declare key: string;

  declare getSystem: HasManyGetAssociationsMixin<lb_ferm_settings>;

  declare system?: NonAttribute<lb_ferm_settings>;
  declare levels?: NonAttribute<lb_levels[]>;

  declare static associations: {
    system: Association<lb_ferms, lb_ferm_settings>;
    levels: Association<lb_ferms, lb_levels>;
  };

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        ferma_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        last_update: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        last_request: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        key: {
          type: DataTypes.CHAR(16),
          allowNull: false,
        },
      },
      {
        sequelize,
        paranoid: true,
        timestamps: false,
        tableName: "lb_ferms",
      }
    );
  }
}

export default lb_ferms;
