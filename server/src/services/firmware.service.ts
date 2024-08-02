import _ from "lodash";
import { Op } from "sequelize";
import FermVersion from "../models/firmwares.model";

class FirmwareService {
  async getVersion(id: number) {
    const version = await FermVersion.findAll({
      where: {
        [Op.or]: [{ ferma_id: id }, { ferma_id: 0 }],
        begda: {
          [Op.lte]: new Date(),
        },
        endda: {
          [Op.gte]: new Date(),
        },
      },
    });

    // console.log(version.length);

    for (let i = 0; i < version.length; i++) {
      if (version[i].ferma_id === id) return version[i];
    }

    return version[0];
  }
}

export default new FirmwareService();
