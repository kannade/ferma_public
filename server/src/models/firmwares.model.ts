import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

class lb_firmwares extends Model<
  InferAttributes<lb_firmwares>,
  InferCreationAttributes<lb_firmwares>
> {
  declare begda: Date;
  declare endda: Date;
  declare ferma_id: number;
  declare version: number;
  declare path: string;
  declare deleteAllScenarios: boolean;
  declare force: boolean;
  declare resetLoginData: boolean;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        begda: {
          type: DataTypes.DATE,
          allowNull: false,
          primaryKey: true,
        },
        endda: {
          type: DataTypes.DATE,
          allowNull: false,
          primaryKey: true,
        },
        ferma_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        version: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        deleteAllScenarios: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        force: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        resetLoginData: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        tableName: "lb_firmwares",
      }
    );
  }
}
export default lb_firmwares;
