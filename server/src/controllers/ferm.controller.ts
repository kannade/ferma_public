import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import jwt, { JwtPayload } from "jsonwebtoken";
import fermService from "../services/ferm.service";
import fermSettingsService from "../services/fermSettings.service";
import { JSON_OBJECT } from "./constants";
import firmwareService from "../services/firmware.service";
import User from "../models/users.model";
import Ferm from "../models/ferms.model";

type ferma = {
  ferma_id: number;
  user_id: number;
  last_update: Date;
  last_request: Date;
  system: {
    setting_id: number;
    name: string;
    get_temp_timeout: number;
    get_time_timeout: number;
    post_timeout: number;
    get_timeout: number;
    update_levels_timeout: number;
    update_messages_timeout: number;
    update_oled_timeout: number;
    update_sensors_timeout: number;
    save_scenario: boolean;
    tgNotify: boolean;
    tgChatId: string;
    created: Date;
    ferma_id: number;
  };
};

class PostController {
  async getFerm(req: Request, res: Response, next: NextFunction) {
    // console.log("Headers:", req.headers);
    // console.log("Body:", req.body);
    // console.log("Query Params:", req.query);
    // console.log("Params:", req.params);
    try {
      const id = Number(req.params.id);
      const key = req.params.key;
      if (!id || !key) {
        return res.status(400).json({ message: `Данная ферма не найдена.` });
      }
      const ferma = await fermService.getFerm(id, key);
      const version = await firmwareService.getVersion(id);
      if (_.isObject(version) && _.isNumber(version.version)) {
        ferma.s.upd.dS = version.deleteAllScenarios ? 1 : 0;
        ferma.s.upd.f = version.force ? 1 : 0;
        ferma.s.upd.rL = version.resetLoginData ? 1 : 0;
        ferma.s.upd.l = version.path;
        ferma.s.v = version.version;
      }
      // const fermSettings = await fermSettingsService.getFermSettings(id);
      // fermObj.system.name = fermSettings?.name;
      // const obj = JSON_OBJECT;
      // const newObj = { system: { name: ferma.system?.name } };
      res.json(ferma);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }

  // async testPost(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     console.log(req.body);
  //     // const post = await postService.updatePost(req.body);
  //     // res.json(post);
  //     res.status(200);
  //     next();
  //   } catch (e: any) {
  //     res.status(500).json({ message: e.message });
  //   }
  // }

  async getFerms(req: Request, res: Response) {
    try {
      const userId = Number(req.query.userId);
      const ferms = await fermService.getFerms(userId);
      res.json(ferms);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }

  async addFerm(req: Request, res: Response) {
    try {
      const limit = 10;
      const ferms = await fermService.getFerms(req.body.userId);
      if (ferms.length >= limit) {
        return res
          .status(400)
          .json({ message: `Вы не можете создать больше ${limit} ферм!` });
      }
      const newFerm = await fermService.addFerm(req.body);
      if (newFerm?.ferma_id) {
        return res.status(201).json({
          message: "Ферма создана успешно!",
        });
      } else {
        return res.status(500).json({ message: "Ошибка создания фермы!" });
      }
    } catch (e: any) {
      res.status(500).json({ message: "Internal server error: " + e.message });
    }
  }

  async deleteFerm(req: Request, res: Response) {
    try {
      const fermId = Number(req.params.id);
      const accessToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

      if (!accessToken) {
        return res.status(401).send("Access Denied. No token provided.");
      }

      const decoded = jwt.verify(
        accessToken as string,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      const user = await User.findByPk(decoded.userId);
      if (!user?.user_id || !user.user_status) {
        return res.status(404).send("User not found");
      }

      const ferm = await Ferm.findByPk(fermId);

      if (ferm?.user_id !== user?.user_id) {
        return res.status(401).send("Access Denied. No match ferm.");
      }

      try {
        await fermService.deleteFerm(fermId);
        return res.status(204).json({
          message: "Ферма удалена успешно!",
        });
      } catch (e: any) {
        res
          .status(500)
          .json({ message: "Internal server error: " + e.message });
      }
    } catch (e: any) {
      res.status(500).json({ message: "Internal server error: " + e.message });
    }
  }

  async addSensorsData(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const key = req.params.key;
      if (!id || !key) {
        return res.status(400).json({ message: `Данная ферма не найдена.` });
      }
      const ferma = await fermService.getOneFerm(id, key);
      if (!ferma) {
        return res.status(400).json({ message: `Данная ферма не найдена.` });
      }

      const sensorData = await fermService.addSensorData(
        req.body.sensors.map(function (item: Record<string, any>) {
          return { ferma_id: id, ...item };
        })
      );

      if (sensorData) {
        return res.status(201).json({ message: `Ok` });
      } else {
        return res.status(500).json({ message: `error saving sensor data` });
      }
    } catch (e: any) {
      res.status(500).json({ message: "Internal server error: " + e.message });
    }
  }

  async getShortFerm(req: Request, res: Response) {
    try {
      const fermaId = Number(req.query.fermaId);
      const key = String(req.query.key);
      const limit = Number(req.query.limit);
      const fermData = await fermService.getShortFerm(fermaId, key, limit);
      res.json(fermData);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default new PostController();
