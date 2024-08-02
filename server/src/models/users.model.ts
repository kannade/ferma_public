import {
  DataTypes,
  Model,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export enum UserRoles {
  USER = "USER",
  ADMIN = "ADMIN",
}

class lb_users extends Model<
  InferAttributes<lb_users>,
  InferCreationAttributes<lb_users>
> {
  declare user_id?: number;
  declare user_login: string;
  declare user_pass: string;
  declare user_email: string;
  declare user_role: string;
  declare user_lastlogin: Date;
  declare user_phone: string;
  declare user_status?: CreationOptional<number>;
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        user_id: {
          type: DataTypes.NUMBER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        user_login: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_pass: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_lastlogin: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        user_phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_status: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        tableName: "lb_users",
      }
    );
  }
}
export default lb_users;

// interface ObjectAttributes {
//   user_id: number;
//   user_login: string;
//   user_pass: string;
//   user_email: string;
//   user_registered: Date;
//   user_status: string;
//   user_lastlogin: Date;
//   user_phone?: string;
// }

// interface ObjectsInput extends Optional<ObjectAttributes, "user_id"> {}

// class lb_users
//   extends Model<ObjectAttributes, ObjectsInput>
//   implements ObjectAttributes
// {
//   public user_id!: number;
//   public user_login!: string;
//   public user_pass!: string;
//   public user_email!: string;
//   public user_registered!: Date;
//   public user_status!: string;
//   public user_lastlogin!: Date;
//   public user_phone?: string;

//   public static initialize(sequelize: Sequelize) {
//     this.init(
//       {
//         user_id: {
//           type: DataTypes.INTEGER,
//           autoIncrement: true,
//           allowNull: false,
//           primaryKey: true,
//           unique: true,
//         },
//         user_login: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         user_pass: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         user_email: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         user_registered: {
//           type: DataTypes.DATE,
//           allowNull: false,
//           defaultValue: DataTypes.NOW,
//         },
//         user_status: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           defaultValue: DataTypes.NOW,
//         },
//         user_lastlogin: {
//           type: DataTypes.DATE,
//           allowNull: false,
//           defaultValue: DataTypes.NOW,
//         },
//         user_phone: {
//           type: DataTypes.STRING,
//           allowNull: true,
//         },
//       },
//       {
//         sequelize,
//         paranoid: true,
//         timestamps: false,
//       }
//     );
//   }
// }
// export default lb_users;
