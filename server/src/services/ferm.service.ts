import _ from "lodash";
import { Op } from "sequelize";
import crypto from "crypto";
import Ferm from "../models/ferms.model";
import FermSettings from "../models/fermSettings.model";
import Levels from "../models/levels.model";
import Devices from "../models/devices.model";
import Rules from "../models/rules.model";
import Periods from "../models/rulePeriods.model";
import References from "../models/ruleReferences.model";
import { NewFermRequest, newSensorDataRequest } from "../dtos/ferm.dto";
import { sequelize } from "../sequelize";
import SensorsData from "../models/sensorsData.model";

class FermService {
  async getFerm(id: number, key: string) {
    const ferm = await Ferm.findOne({
      where: {
        ferma_id: id,
        key,
      },
      plain: true,
      order: [["levels", "level_id", "asc"]],
      include: [
        {
          model: FermSettings,
          as: "system",
          where: {
            ferma_id: id,
          },
        },
        {
          model: Levels,
          as: "levels",
          where: {
            ferma_id: id,
          },
          order: [
            ["rules", "rule_id", "asc"],
            ["devices", "device_id", "asc"],
          ],
          include: [
            {
              model: Devices,
              as: "devices",
            },
            {
              model: Rules,
              as: "rules",
              include: [
                {
                  model: Periods,
                  as: "periods",
                },
                {
                  model: References,
                  as: "references",
                },
              ],
            },
          ],
        },
      ],
    });

    const mapL: number[] = [];
    const mapD: number[][] = [];
    ferm?.levels?.map(function (item, indexL) {
      mapL[item.level_id] = indexL;
      mapD[item.level_id] = [];
      if (_.isArray(item.devices) && item.devices.length) {
        item.devices.map(function (itemD, indexD) {
          mapD[item.level_id][itemD.device_id] = indexD;
        });
      }
      item.rules?.sort((a, b) => {
        if (a.rule_id > b.rule_id) return 1;
        if (a.rule_id < b.rule_id) return -1;
        return 0;
      });
    });

    const newObj = {
      l: ferm?.levels?.map(function (item, indexL) {
        const levelsObj: Record<string, any> = {
          uid: item.level_id,
          l: indexL,
          tg: item.tgNotify ? 1 : 0,
          n: item.level_name,
          r: [],
        };

        if (_.isArray(item.devices) && item.devices.length) {
          levelsObj.d = item.devices.map(function (itemD, indexD) {
            const deviceObj: Record<string, any> = {
              uid: itemD.device_id,
              id: indexD,
              n: itemD.name,
              p: itemD.pin,
              t: itemD.type,
              tg: item.tgNotify ? 1 : 0,
            };

            if (_.isNumber(itemD.from)) deviceObj.fr = itemD.from;
            if (_.isNumber(itemD.to)) deviceObj.to = itemD.to;
            if (_.isString(itemD.addr)) deviceObj.addr = itemD.addr;

            return deviceObj;
          });
        }

        if (_.isArray(item.rules) && item.rules.length) {
          levelsObj.r = item.rules
            .filter((itemR) => !!itemR.status)
            .map(function (itemR, indexR) {
              const obj: Record<string, any> = {
                uid: itemR.rule_id,
                d: mapD[item.level_id][itemR.device_id],
                i: indexR,
                rT: itemR.rule_type,
                sE: itemR.smoothEnd,
                sS: itemR.smoothStart,
                tg: item.tgNotify ? 1 : 0,
                pwr: {
                  v: itemR.power,
                },
              };

              if (
                _.isNumber(itemR.power_end) &&
                _.isNumber(itemR.power_start)
              ) {
                obj.pwr.e = itemR.power_end;
                obj.pwr.s = itemR.power_start;
              }

              if (_.isDate(itemR.runAfter) && itemR.runAfter)
                obj.rA = Math.floor(
                  new Date(
                    itemR.runAfter.getTime() -
                      new Date().getTimezoneOffset() * 60 * 1000
                  ).getTime() / 1000
                );

              if (_.isDate(itemR.runBefore) && itemR.runBefore)
                obj.rB = Math.floor(
                  new Date(
                    itemR.runBefore.getTime() -
                      new Date().getTimezoneOffset() * 60 * 1000
                  ).getTime() / 1000
                );

              if (_.isArray(itemR.references) && itemR.references.length) {
                obj.ref = itemR.references.map(function (itemRef) {
                  const refObj: Record<string, any> = {
                    uid: itemRef.reference_id,
                    d: mapD[itemRef.level_id][itemRef.device_id],
                    l: mapL[itemRef.level_id],
                    t: itemRef.type,
                  };

                  if (_.isNumber(itemRef.from)) refObj.fr = itemRef.from;

                  if (_.isNumber(itemRef.to)) refObj.to = itemRef.to;

                  if (_.isNumber(itemRef.variable)) refObj.v = itemRef.variable;

                  if (_.isNumber(itemRef.min_work_time))
                    refObj.minWT = itemRef.min_work_time;

                  if (_.isNumber(itemRef.max_work_time))
                    refObj.maxWT = itemRef.min_work_time;

                  if (_.isNumber(itemRef.block)) refObj.blk = itemRef.block;

                  return refObj;
                });
              }

              if (_.isArray(itemR.periods) && itemR.periods.length) {
                if (itemR.periods[0].every && itemR.periods[0].every_duration) {
                  obj.evr = {
                    d: itemR.periods[0].every_duration,
                    v: itemR.periods[0].every,
                  };
                } else {
                  obj.str = itemR.periods.map(function (itemP) {
                    return itemP.start;
                  });

                  obj.end = itemR.periods.map(function (itemP) {
                    return itemP.end;
                  });
                }
              }

              return obj;
            });
        }

        return levelsObj;
      }),
      s: {
        et:
          ferm?.last_update &&
          Math.floor(
            new Date(
              ferm.last_update.getTime() -
                new Date().getTimezoneOffset() * 60 * 1000
            ).getTime() / 1000
          ),
        // datetime: {
        //   date: parseInt(
        //     ferm?.last_update.toISOString().split("T")[0].replace(/-/g, "") ||
        //       "0",
        //     10
        //   ),
        //   time: parseInt(
        //     ferm?.last_update.toTimeString().split(" ")[0].replace(/:/g, "") ||
        //       "0",
        //     10
        //   ),
        // },
        n: ferm?.system?.name,
        sS: ferm?.system?.save_scenario ? 1 : 0,
        tg: ferm?.system?.tgNotify ? 1 : 0,
        tgCh: ferm?.system?.tgChatId,
        rsO: ferm?.system?.restart_if_offline,
        rcO: ferm?.system?.reconnect_if_offline,
        pE: "https://luckberry.ru/api/public/ferm/post",
        tms: {
          gTm: ferm?.system?.get_time_timeout,
          gT: ferm?.system?.get_timeout,
          pT: ferm?.system?.post_timeout,
          uL: ferm?.system?.update_levels_timeout,
          uM: ferm?.system?.update_messages_timeout,
          uO: ferm?.system?.update_oled_timeout,
          uS: ferm?.system?.update_sensors_timeout,
        },
        upd: {
          dS: +false,
          f: +false,
          l: "",
          rL: +false,
        },
        v: 0,
      },
    };

    if (newObj.s.n) {
      const update = await Ferm.update(
        { last_request: new Date() },
        {
          where: {
            ferma_id: id,
          },
        }
      );
    }

    return newObj; //ferm?.toJSON();
  }

  async getFerms(userId: number) {
    const ferm = await Ferm.findAll({
      where: {
        user_id: userId,
      },
      order: [["ferma_id", "asc"]],
      include: [
        {
          model: FermSettings,
          as: "system",
        },
      ],
    });

    return ferm;
  }

  async addFerm(newFermDTO: NewFermRequest) {
    const t = await sequelize.transaction();

    try {
      const newFerm = await Ferm.create(
        {
          user_id: newFermDTO.userId,
          last_update: new Date(),
          last_request: null,
          key: crypto.randomBytes(8).toString("hex"),
        },
        { transaction: t }
      );

      const newFermSetting = await FermSettings.create(
        {
          name: newFermDTO.name,
          get_temp_timeout: 2000,
          get_time_timeout: 1000,
          post_timeout: 0,
          get_timeout: 5000,
          update_levels_timeout: 1000,
          update_messages_timeout: 0,
          update_oled_timeout: 500,
          update_sensors_timeout: 2000,
          save_scenario: newFermDTO.saveScenario,
          tgNotify: newFermDTO.sendTgNotify,
          tgChatId: newFermDTO.tgChatId,
          ferma_id: newFerm.ferma_id,
          restart_if_offline: 172800,
          reconnect_if_offline: 10800,
        },
        { transaction: t }
      );

      await t.commit();
      return newFerm;
    } catch (error) {
      await t.rollback();
      console.error("Failed to create user and profile:", error);
    }
  }

  async deleteFerm(fermId: number) {
    await sequelize.transaction(async (t) => {
      await Ferm.destroy({
        where: { ferma_id: fermId },
        transaction: t,
      });

      await FermSettings.destroy({
        where: { ferma_id: fermId },
        transaction: t,
      });
    });
  }

  async getOneFerm(id: number, key: string) {
    const ferm = await Ferm.findOne({
      where: {
        ferma_id: id,
        key,
      },
      plain: true,
    });

    return ferm;
  }

  async addSensorData(newSensorDataDTO: newSensorDataRequest[]) {
    return await SensorsData.bulkCreate(newSensorDataDTO);
  }

  async getShortFerm(ferma_id: number, key: string, limit: number) {
    const ferm = await Ferm.findOne({
      where: {
        ferma_id,
        key,
      },
      plain: true,
      order: [["levels", "level_id", "asc"]],
      attributes: ["ferma_id", "last_request"],
      include: [
        {
          model: Levels,
          as: "levels",
          where: {
            ferma_id,
          },
          order: [["devices", "device_id", "asc"]],
          attributes: ["level_id", "level_name"],
          include: [
            {
              model: Devices,
              as: "devices",
              attributes: ["device_id", "name", "type"],
              include: [
                {
                  model: SensorsData,
                  as: "sensorsData",
                  attributes: ["subty", "value", "created"],
                  limit: limit ? limit : 50,
                  order: [["created", "DESC"]],
                },
              ],
            },
          ],
        },
      ],
    });

    if (ferm && _.isArray(ferm.levels)) {
      return {
        ferma_id: ferm?.ferma_id,
        last_request: ferm?.last_request,
        levels: ferm.levels
          .map((level) => {
            return {
              level_id: level.level_id,
              level_name: level.level_name,
              devices: level.devices?.filter(
                (device) => device.sensorsData?.length
              ),
            };
          })
          .filter((level) => level.devices?.length),
      };
    }

    return ferm;
  }
}

export default new FermService();
