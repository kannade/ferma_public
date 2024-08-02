import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

class lb_users_tokens extends Model<
  InferAttributes<lb_users_tokens>,
  InferCreationAttributes<lb_users_tokens>
> {
  declare user_id: number;
  declare token: string;
  declare token_type: number;
  declare created: Date;
  declare expires: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        token_type: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          primaryKey: true,
        },
        created: {
          type: DataTypes.DATE,
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.NOW,
        },
        expires: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: false,
        tableName: "lb_users_tokens",
      }
    );
  }
}
export default lb_users_tokens;
