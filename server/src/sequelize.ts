import { Options, Sequelize } from "sequelize";
// import { config } from 'dotenv';
import config from "../config.json";
import {
  lb_devices,
  lb_ferms,
  lb_ferm_settings,
  lb_levels,
  lb_users,
  lb_rule_periods,
  lb_rule_references,
  lb_rules,
  lb_firmwares,
  lb_users_tokens,
  lb_sensors_data,
} from "./models";

const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  <Options>config.database
);

// config();

// const sequelize = new Sequelize(
//   process.env.DBNAME || "1",
//   process.env.DBUSER || "1",
//   process.env.DBPASS || "1",
//   {
//     host: process.env.DBHOST,
//     port: parseInt(process.env.DBPORT || "5432", 10),
//     dialect: "postgres",
//     sync: { force: false },
//   }
// );

const models = [
  lb_devices,
  lb_ferms,
  lb_ferm_settings,
  lb_levels,
  lb_users,
  lb_rule_periods,
  lb_rule_references,
  lb_rules,
  lb_firmwares,
  lb_users_tokens,
  lb_sensors_data,
];
models.forEach((model) => model.initialize(sequelize));

lb_ferms.hasOne(lb_ferm_settings, { as: "system", foreignKey: "ferma_id" });
lb_ferm_settings.belongsTo(lb_ferms, { as: "system", foreignKey: "ferma_id" });

lb_ferms.hasMany(lb_levels, { as: "levels", foreignKey: "ferma_id" });
lb_levels.belongsTo(lb_ferms, { as: "levels", foreignKey: "ferma_id" });

lb_levels.hasMany(lb_devices, { as: "devices", foreignKey: "level_id" });
lb_devices.belongsTo(lb_levels, { as: "devices", foreignKey: "level_id" });

lb_levels.hasMany(lb_rules, { as: "rules", foreignKey: "level_id" });
lb_rules.belongsTo(lb_levels, { as: "rules", foreignKey: "level_id" });

lb_rules.hasMany(lb_rule_periods, { as: "periods", foreignKey: "rule_id" });
lb_rule_periods.belongsTo(lb_rules, { as: "periods", foreignKey: "rule_id" });

lb_devices.hasMany(lb_sensors_data, {
  as: "sensorsData",
  foreignKey: "device_id",
});
lb_sensors_data.belongsTo(lb_devices, {
  as: "sensorsData",
  foreignKey: "device_id",
});

lb_rules.hasMany(lb_rule_references, {
  as: "references",
  foreignKey: "rule_id",
});
lb_rule_references.belongsTo(lb_rules, {
  as: "references",
  foreignKey: "rule_id",
});

export { sequelize };
