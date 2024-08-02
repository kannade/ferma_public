import {
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

class lb_ferm_settings extends Model<
  InferAttributes<lb_ferm_settings>,
  InferCreationAttributes<lb_ferm_settings>
> {
  declare setting_id?: CreationOptional<number>;
  declare name: string;
  declare get_temp_timeout: number;
  declare get_time_timeout: number;
  declare post_timeout: number;
  declare get_timeout: number;
  declare update_levels_timeout: number;
  declare update_messages_timeout: number;
  declare update_oled_timeout: number;
  declare update_sensors_timeout: number;
  declare save_scenario: boolean;
  declare tgNotify: boolean;
  declare tgChatId?: CreationOptional<string>;
  declare ferma_id: ForeignKey<lb_ferms["ferma_id"]>;
  declare restart_if_offline: number;
  declare reconnect_if_offline: number;

  declare owner?: NonAttribute<lb_ferms>;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        setting_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        get_temp_timeout: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        get_time_timeout: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        post_timeout: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        get_timeout: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        update_levels_timeout: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        update_messages_timeout: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        update_oled_timeout: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        update_sensors_timeout: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        save_scenario: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        tgNotify: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        tgChatId: {
          type: DataTypes.STRING(9),
          allowNull: true,
        },
        ferma_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        restart_if_offline: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        reconnect_if_offline: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        modelName: "lb_ferm_settings",
      }
    );
  }
}

export default lb_ferm_settings;
